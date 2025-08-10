import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, auth, storage } from '../firebase';
import { 
  FaChartBar, 
  FaUsers, 
  FaBoxes, 
  FaUserTie, 
  FaShoppingCart,
  FaSignOutAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaPrint,
  FaBars,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaCheckCircle,
  FaCalendarAlt,
  FaRupeeSign,
  FaWeightHanging,
  FaExclamationTriangle
} from 'react-icons/fa';

const Admin = () => {
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [stock, setStock] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [bulkOrders, setBulkOrders] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [firebaseError, setFirebaseError] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Dashboard stats
  const [dashboardStats, setDashboardStats] = useState({
    totalCustomers: 0,
    totalStock: 0,
    totalEmployees: 0
  });

  // CRUD Functions with retry logic
  const fetchCustomers = async (retryCount = 0) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'customers'));
      const customersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCustomers(customersData);
    } catch (error) {
      console.error('Error fetching customers:', error);
      if (retryCount < 3 && error.code === 'unavailable') {
        console.log(`Retrying fetchCustomers (${retryCount + 1}/3)...`);
        setTimeout(() => fetchCustomers(retryCount + 1), 2000);
      }
    }
  };

  const fetchStock = async (retryCount = 0) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'stock'));
      const stockData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setStock(stockData);
    } catch (error) {
      console.error('Error fetching stock:', error);
      if (retryCount < 3 && error.code === 'unavailable') {
        console.log(`Retrying fetchStock (${retryCount + 1}/3)...`);
        setTimeout(() => fetchStock(retryCount + 1), 2000);
      }
    }
  };

  const fetchEmployees = async (retryCount = 0) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'employees'));
      const employeesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEmployees(employeesData);
    } catch (error) {
      console.error('Error fetching employees:', error);
      if (retryCount < 3 && error.code === 'unavailable') {
        console.log(`Retrying fetchEmployees (${retryCount + 1}/3)...`);
        setTimeout(() => fetchEmployees(retryCount + 1), 2000);
      }
    }
  };

  const fetchBulkOrders = async (retryCount = 0) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'bulkOrders'));
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBulkOrders(ordersData);
    } catch (error) {
      console.error('Error fetching bulk orders:', error);
      if (retryCount < 3 && error.code === 'unavailable') {
        console.log(`Retrying fetchBulkOrders (${retryCount + 1}/3)...`);
        setTimeout(() => fetchBulkOrders(retryCount + 1), 2000);
      }
    }
  };

  const handleSave = async (data, operation) => {
    try {
      // For bulk orders, calculate total amount from items
      if (modalType === 'bulkOrder' && data.items && data.items.length > 0) {
        data.totalAmount = data.items.reduce((sum, item) => sum + (item.quantity * item.pricePerKg), 0);
      }
      
      if (operation === 'create') {
        switch (modalType) {
          case 'customer':
            await addDoc(collection(db, 'customers'), data);
            await fetchCustomers();
            break;
          case 'stock':
            await addDoc(collection(db, 'stock'), data);
            await fetchStock();
            break;
          case 'employee':
            await addDoc(collection(db, 'employees'), data);
            await fetchEmployees();
            break;
          case 'bulkOrder':
            await addDoc(collection(db, 'bulkOrders'), data);
            await fetchBulkOrders();
            break;
        }
      } else {
        const docRef = doc(db, getCollectionName(modalType), data.id);
        const { id, ...updateData } = data;
        await updateDoc(docRef, updateData);
        
        switch (modalType) {
          case 'customer':
            await fetchCustomers();
            break;
          case 'stock':
            await fetchStock();
            break;
          case 'employee':
            await fetchEmployees();
            break;
          case 'bulkOrder':
            await fetchBulkOrders();
            break;
        }
      }
      updateDashboardStats();
    } catch (error) {
      console.error('Error saving data:', error);
      throw error;
    }
  };

  const getCollectionName = (type) => {
    switch (type) {
      case 'customer': return 'customers';
      case 'stock': return 'stock';
      case 'employee': return 'employees';
      case 'bulkOrder': return 'bulkOrders';
      default: return '';
    }
  };

  const deleteCustomer = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await deleteDoc(doc(db, 'customers', id));
        await fetchCustomers();
        updateDashboardStats();
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    }
  };

  const deleteStockItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this stock item?')) {
      try {
        await deleteDoc(doc(db, 'stock', id));
        await fetchStock();
        updateDashboardStats();
      } catch (error) {
        console.error('Error deleting stock item:', error);
      }
    }
  };

  const deleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteDoc(doc(db, 'employees', id));
        await fetchEmployees();
        updateDashboardStats();
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const deleteBulkOrder = async (id) => {
    if (window.confirm('Are you sure you want to delete this bulk order?')) {
      try {
        await deleteDoc(doc(db, 'bulkOrders', id));
        await fetchBulkOrders();
        updateDashboardStats();
      } catch (error) {
        console.error('Error deleting bulk order:', error);
      }
    }
  };

  const updateDashboardStats = () => {
    setDashboardStats({
      totalCustomers: customers.length,
      totalStock: stock.reduce((sum, item) => sum + (item.quantity || 0), 0),
      totalEmployees: employees.length
    });
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = async () => {
    try {
      await signOut(auth);
      setShowLogoutConfirm(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        fetchAllData();
      }
    });

    // Test Firebase connection
    const testConnection = async () => {
      try {
        setConnectionStatus('connecting');
        setFirebaseError(null);
        
        // First check if user is authenticated
        if (!auth.currentUser) {
          console.log('No authenticated user, connection test will be limited');
        }
        
        // Try to fetch a small amount of data to test connection
        const testQuery = await getDocs(collection(db, 'customers'));
        setConnectionStatus('connected');
        setFirebaseError(null);
        console.log('Firebase connection successful');
      } catch (error) {
        console.error('Firebase connection error:', error);
        setConnectionStatus('error');
        
        // Provide more detailed error information
        if (error.code === 'permission-denied') {
          setFirebaseError('Access denied. Please check Firebase security rules. This usually means the security rules need to be deployed to Firebase.');
        } else if (error.code === 'unavailable') {
          setFirebaseError('Firebase service unavailable. Please check your internet connection and Firebase service status.');
        } else if (error.code === 'not-found') {
          setFirebaseError('Collection not found. Please ensure your Firestore database is properly set up.');
        } else if (error.code === 'unauthenticated') {
          setFirebaseError('Authentication required. Please log in to access the admin panel.');
        } else {
          setFirebaseError(`Connection error: ${error.message} (Code: ${error.code})`);
        }
        
        // Log additional debugging info
        console.log('Error details:', {
          code: error.code,
          message: error.message,
          stack: error.stack,
          authState: auth.currentUser ? 'authenticated' : 'not authenticated'
        });
      }
    };

    testConnection();
    return () => unsubscribe();
  }, []);

  const fetchAllData = async () => {
    await Promise.all([
      fetchCustomers(),
      fetchStock(),
      fetchEmployees(),
      fetchBulkOrders()
    ]);
    updateDashboardStats();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">🍎 Fruit Delight Admin</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Connection Status */}
              <div className="flex items-center space-x-2 bg-white/20 px-3 py-2 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  connectionStatus === 'connected' ? 'bg-green-400' :
                  connectionStatus === 'connecting' ? 'bg-yellow-400' :
                  'bg-red-400'
                }`}></div>
                <span className="text-sm text-white font-medium">
                  {connectionStatus === 'connected' ? 'Connected' :
                   connectionStatus === 'connecting' ? 'Connecting...' :
                   'Connection Error'}
                </span>
              </div>
              
              <span className="text-white font-medium">Welcome, Anjaneylu</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors shadow-md"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Firebase Error Display */}
      {firebaseError && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mx-4 mt-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                <strong>Firebase Connection Error:</strong> {firebaseError}
              </p>
              <p className="text-sm text-red-600 mt-1">
                Please check your internet connection and Firebase configuration. If the problem persists, contact your administrator.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-gradient-to-b from-white to-gray-50 shadow-xl min-h-screen transition-all duration-300 ease-in-out border-r border-gray-200`}>
          {/* Sidebar Toggle Button */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
              title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {sidebarCollapsed ? <FaBars className="w-4 h-4" /> : <FaChevronLeft className="w-4 h-4" />}
            </button>
          </div>
          
          <nav className="mt-4">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: FaChartBar },
              { id: 'customers', label: 'Customers', icon: FaUsers },
              { id: 'stock', label: 'Stock', icon: FaBoxes },
              { id: 'employees', label: 'Employee Management', icon: FaUserTie },
              { id: 'bulkOrders', label: 'Bulk Orders', icon: FaShoppingCart }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentSection(item.id)}
                  className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'space-x-3 px-6'} py-4 text-left transition-all duration-200 hover:bg-green-50 group relative ${
                    currentSection === item.id
                      ? 'bg-green-100 text-green-700 border-r-2 border-green-600 shadow-sm'
                      : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                  }`}
                  title={sidebarCollapsed ? item.label : ''}
                >
                  {currentSection === item.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-600 rounded-r-full"></div>
                  )}
                  <Icon className={`w-5 h-5 ${currentSection === item.id ? 'text-green-600' : 'text-gray-600 group-hover:text-green-600'}`} />
                  {!sidebarCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </button>
              );
            })}
          </nav>
          

        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Content Area */}
          <div className="p-8">
            {currentSection === 'dashboard' && <DashboardSection stats={dashboardStats} />}
            {currentSection === 'customers' && (
              <CustomersSection 
                customers={customers} 
                onAdd={() => { setModalType('customer'); setShowAddModal(true); }}
                onEdit={(customer) => { setModalType('customer'); setEditingItem(customer); setShowAddModal(true); }}
                onDelete={deleteCustomer}
              />
            )}
            {currentSection === 'stock' && (
              <StockSection 
                stock={stock} 
                onAdd={() => { setModalType('stock'); setShowAddModal(true); }}
                onEdit={(item) => { setModalType('stock'); setEditingItem(item); setShowAddModal(true); }}
                onDelete={deleteStockItem}
              />
            )}
            {currentSection === 'employees' && (
              <EmployeesSection 
                employees={employees} 
                onAdd={() => { setModalType('employee'); setShowAddModal(true); }}
                onEdit={(employee) => { setModalType('employee'); setEditingItem(employee); setShowAddModal(true); }}
                onDelete={deleteEmployee}
              />
            )}
            {currentSection === 'bulkOrders' && (
              <BulkOrdersSection 
                orders={bulkOrders} 
                onAdd={() => { setModalType('bulkOrder'); setShowAddModal(true); }}
                onEdit={(order) => { setModalType('bulkOrder'); setEditingItem(order); setShowAddModal(true); }}
                onDelete={deleteBulkOrder}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showAddModal && (
        <Modal
          type={modalType}
          item={editingItem}
          onClose={() => { setShowAddModal(false); setEditingItem(null); }}
          onSave={handleSave}
        />
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-red-100 rounded-full">
                <FaSignOutAlt className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Confirm Logout</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout? Any unsaved changes will be lost.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Login Form Component
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Fruit Delight Management System
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Dashboard Section Component
const DashboardSection = ({ stats }) => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-100">
        <div className="flex items-center space-x-4">
          <div className="p-4 bg-green-100 rounded-full">
            <FaChartBar className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to Fruit Delight</h1>
            <p className="text-xl text-gray-600">Manage your fruit business operations efficiently</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-gray-600 mb-2">Total Customers</p>
              <p className="text-4xl font-bold text-gray-900">{stats.totalCustomers}</p>
              <p className="text-sm text-green-600 mt-2">Active customers</p>
            </div>
            <div className="p-4 bg-blue-100 rounded-full">
              <FaUsers className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-gray-600 mb-2">Total Stock</p>
              <p className="text-4xl font-bold text-gray-900">{stats.totalStock}</p>
              <p className="text-sm text-green-600 mt-2">items available</p>
            </div>
            <div className="p-4 bg-green-100 rounded-full">
              <FaBoxes className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-gray-600 mb-2">Employees</p>
              <p className="text-4xl font-bold text-gray-900">{stats.totalEmployees}</p>
              <p className="text-sm text-green-600 mt-2">Team members</p>
            </div>
            <div className="p-4 bg-purple-100 rounded-full">
              <FaUserTie className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <button className="flex flex-col items-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 hover:from-green-100 hover:to-green-200 transition-all duration-200 group">
            <div className="p-3 bg-green-500 rounded-full mb-3 group-hover:scale-110 transition-transform">
              <FaUsers className="w-6 h-6 text-white" />
            </div>
            <span className="font-semibold text-gray-800">Add Customer</span>
          </button>
          
          <button className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-all duration-200 group">
            <div className="p-3 bg-blue-500 rounded-full mb-3 group-hover:scale-110 transition-transform">
              <FaBoxes className="w-6 h-6 text-white" />
            </div>
            <span className="font-semibold text-gray-800">Update Stock</span>
          </button>
          
          <button className="flex flex-col items-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:from-purple-100 hover:to-purple-200 transition-all duration-200 group">
            <div className="p-3 bg-purple-500 rounded-full mb-3 group-hover:scale-110 transition-transform">
              <FaUserTie className="w-6 h-6 text-white" />
            </div>
            <span className="font-semibold text-gray-800">Manage Staff</span>
          </button>
          
          <button className="flex flex-col items-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200 hover:from-orange-100 hover:to-orange-200 transition-all duration-200 group">
            <div className="p-3 bg-orange-500 rounded-full mb-3 group-hover:scale-110 transition-transform">
              <FaShoppingCart className="w-6 h-6 text-white" />
            </div>
            <span className="font-semibold text-gray-800">View Orders</span>
          </button>
        </div>
      </div>

      {/* Business Insights */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Business Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-3">Customer Growth</h4>
            <div className="flex items-center space-x-2">
              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <span className="text-sm text-green-600 font-medium">+75%</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">This month vs last month</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-3">Stock Efficiency</h4>
            <div className="flex items-center space-x-2">
              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <span className="text-sm text-blue-600 font-medium">85%</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">Optimal stock levels maintained</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Customers Section Component
const CustomersSection = ({ customers, onAdd, onEdit, onDelete }) => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
        <div className="flex items-center space-x-4">
          <div className="p-4 bg-blue-100 rounded-full">
            <FaUsers className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Customer Management</h1>
            <p className="text-xl text-gray-600">Manage your customer database and relationships</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-gray-600 mb-2">Total Customers</p>
              <p className="text-4xl font-bold text-gray-900">{customers.length}</p>
              <p className="text-sm text-blue-600 mt-2">Active accounts</p>
            </div>
            <div className="p-4 bg-blue-100 rounded-full">
              <FaUsers className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-gray-600 mb-2">Active Customers</p>
              <p className="text-4xl font-bold text-gray-900">
                {customers.filter(c => c.status === 'active').length}
              </p>
              <p className="text-sm text-green-600 mt-2">Verified accounts</p>
            </div>
            <div className="p-4 bg-green-100 rounded-full">
              <FaCheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-gray-600 mb-2">New This Month</p>
              <p className="text-4xl font-bold text-gray-900">
                {customers.filter(c => {
                  const monthAgo = new Date();
                  monthAgo.setMonth(monthAgo.getMonth() - 1);
                  return new Date(c.createdAt) > monthAgo;
                }).length}
              </p>
              <p className="text-sm text-purple-600 mt-2">Recent additions</p>
            </div>
            <div className="p-4 bg-purple-100 rounded-full">
              <FaPlus className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Customer Database</h3>
          <button
            onClick={onAdd}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <FaPlus className="w-5 h-5" />
            <span className="font-semibold">Add New Customer</span>
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Customer Details</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Contact Info</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100 rounded-xl">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-blue-50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {customer.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{customer.name}</p>
                          <p className="text-xs text-gray-500">ID: {customer.id.slice(-6)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-900">{customer.email}</p>
                        <p className="text-sm text-gray-600">{customer.phone}</p>
                        <p className="text-xs text-gray-500 max-w-xs truncate">{customer.address}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        customer.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(customer.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => onEdit(customer)}
                          className="inline-flex items-center px-3 py-2 border border-blue-300 text-sm leading-4 font-medium rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                        >
                          <FaEdit className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(customer.id)}
                          className="inline-flex items-center px-3 py-2 border border-red-300 text-sm leading-4 font-medium rounded-lg text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                        >
                          <FaTrash className="w-4 h-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stock Section Component
const StockSection = ({ stock, onAdd, onEdit, onDelete }) => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
        <div className="flex items-center space-x-4">
          <div className="p-4 bg-green-100 rounded-full">
            <FaBoxes className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Stock Management</h1>
            <p className="text-xl text-gray-600">Monitor and manage your fruit inventory efficiently</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-gray-600 mb-2">Total Items</p>
              <p className="text-4xl font-bold text-gray-900">{stock.length}</p>
              <p className="text-sm text-blue-600 mt-2">Unique products</p>
            </div>
            <div className="p-4 bg-blue-100 rounded-full">
              <FaBoxes className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-gray-600 mb-2">Total Weight</p>
              <p className="text-4xl font-bold text-gray-900">
                {stock.reduce((sum, item) => sum + item.quantity, 0)}
              </p>
              <p className="text-sm text-green-600 mt-2">kg available</p>
            </div>
            <div className="p-4 bg-green-100 rounded-full">
              <FaWeightHanging className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-gray-600 mb-2">Total Value</p>
              <p className="text-4xl font-bold text-gray-900">
                ₹{stock.reduce((sum, item) => sum + (item.quantity * item.costPerKg), 0).toFixed(2)}
              </p>
              <p className="text-sm text-purple-600 mt-2">Inventory worth</p>
            </div>
            <div className="p-4 bg-purple-100 rounded-full">
              <FaRupeeSign className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-gray-600 mb-2">Low Stock Items</p>
              <p className="text-4xl font-bold text-gray-900">
                {stock.filter(item => item.quantity < 10).length}
              </p>
              <p className="text-sm text-red-600 mt-2">Need attention</p>
            </div>
            <div className="p-4 bg-red-100 rounded-full">
              <FaExclamationTriangle className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Stock Inventory</h3>
          <button
            onClick={onAdd}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <FaPlus className="w-5 h-5" />
            <span className="font-semibold">Add Stock Item</span>
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Product Details</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Quantity & Cost</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Total Value</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Stock Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Last Updated</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100 rounded-xl">
                {stock.map((item) => (
                  <tr key={item.id} className="hover:bg-green-50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {item.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-900">{item.quantity} kg</p>
                        <p className="text-sm text-gray-600">₹{item.costPerKg}/kg</p>
                        <p className="text-xs text-gray-500">Min: {item.minQuantity} kg</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-gray-900">
                          ₹{(item.quantity * item.costPerKg).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500">Supplier: {item.supplier}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        item.quantity > item.minQuantity * 2
                          ? 'bg-green-100 text-green-800'
                          : item.quantity > item.minQuantity
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.quantity > item.minQuantity * 2 ? 'In Stock' : 
                         item.quantity > item.minQuantity ? 'Low Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(item.lastUpdated).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => onEdit(item)}
                          className="inline-flex items-center px-3 py-2 border border-blue-300 text-sm leading-4 font-medium rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                        >
                          <FaEdit className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(item.id)}
                          className="inline-flex items-center px-3 py-2 border border-red-300 text-sm leading-4 font-medium rounded-lg text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                        >
                          <FaTrash className="w-4 h-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Employees Section Component
const EmployeesSection = ({ employees, onAdd, onEdit, onDelete }) => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
        <div className="flex items-center space-x-4">
          <div className="p-4 bg-purple-100 rounded-full">
            <FaUserTie className="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Employee Management</h1>
            <p className="text-xl text-gray-600">Manage your team and workforce effectively</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-gray-600 mb-2">Total Employees</p>
              <p className="text-4xl font-bold text-gray-900">{employees.length}</p>
              <p className="text-sm text-blue-600 mt-2">Team members</p>
            </div>
            <div className="p-4 bg-blue-100 rounded-full">
              <FaUsers className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-gray-600 mb-2">Active Employees</p>
              <p className="text-4xl font-bold text-gray-900">
                {employees.filter(e => e.status === 'active').length}
              </p>
              <p className="text-sm text-green-600 mt-2">Currently working</p>
            </div>
            <div className="p-4 bg-green-100 rounded-full">
              <FaCheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-gray-600 mb-2">Total Work Days</p>
              <p className="text-4xl font-bold text-gray-900">
                {employees.reduce((sum, emp) => sum + emp.workDays, 0)}
              </p>
              <p className="text-sm text-purple-600 mt-2">Combined experience</p>
            </div>
            <div className="p-4 bg-purple-100 rounded-full">
              <FaCalendarAlt className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-gray-600 mb-2">Total Salary</p>
              <p className="text-4xl font-bold text-gray-900">
                ₹{employees.reduce((sum, emp) => sum + emp.salary, 0).toFixed(2)}
              </p>
              <p className="text-sm text-yellow-600 mt-2">Monthly payroll</p>
            </div>
            <div className="p-4 bg-yellow-100 rounded-full">
              <FaRupeeSign className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Employee Database</h3>
          <button
            onClick={onAdd}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <FaPlus className="w-5 h-5" />
            <span className="font-semibold">Add New Employee</span>
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Employee Details</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Position & Department</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Contact Information</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Work Details</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100 rounded-xl">
                {employees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-purple-50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {employee.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{employee.name}</p>
                          <p className="text-xs text-gray-500">ID: {employee.id.slice(-6)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-gray-900">{employee.position}</p>
                        <p className="text-xs text-gray-500">Dept: {employee.department}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-900">{employee.email}</p>
                        <p className="text-sm text-gray-600">{employee.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-900">Work Days: {employee.workDays}</p>
                        <p className="text-sm text-gray-600">₹{employee.salary}/month</p>
                        <p className="text-xs text-gray-500">Joined: {new Date(employee.joinDate).toLocaleDateString()}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        employee.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => onEdit(employee)}
                          className="inline-flex items-center px-3 py-2 border border-blue-300 text-sm leading-4 font-medium rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                        >
                          <FaEdit className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(employee.id)}
                          className="inline-flex items-center px-3 py-2 border border-red-300 text-sm leading-4 font-medium rounded-lg text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                        >
                          <FaTrash className="w-4 h-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Bulk Orders Section Component
const BulkOrdersSection = ({ orders, onAdd, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('orderDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [bulkAction, setBulkAction] = useState('');
  const [quickViewOrder, setQuickViewOrder] = useState(null);

  // Filter and sort orders
  const filteredAndSortedOrders = orders
    .filter(order => {
      const matchesSearch = 
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerPhone.includes(searchTerm) ||
        order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'orderDate':
          aValue = new Date(a.orderDate);
          bValue = new Date(b.orderDate);
          break;
        case 'deliveryDate':
          aValue = new Date(a.deliveryDate);
          bValue = new Date(b.deliveryDate);
          break;
        case 'totalAmount':
          aValue = a.totalAmount;
          bValue = b.totalAmount;
          break;
        case 'customerName':
          aValue = a.customerName.toLowerCase();
          bValue = b.customerName.toLowerCase();
          break;
        default:
          aValue = a[sortBy];
          bValue = b[sortBy];
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handlePrint = (order) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Bulk Order - ${order.customerName}</title>
          <style>
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              margin: 20px; 
              background: #f8f9fa;
              color: #333;
            }
            .header { 
              text-align: center; 
              border-bottom: 3px solid #F88B42; 
              padding-bottom: 20px; 
              margin-bottom: 30px;
              background: linear-gradient(135deg, #194528, #2d5a3d);
              color: white;
              padding: 20px;
              border-radius: 10px;
            }
            .header h1 { margin: 0; font-size: 28px; color: #F88B42; }
            .header h2 { margin: 10px 0 0 0; font-size: 20px; opacity: 0.9; }
            .order-details { 
              margin-bottom: 25px; 
              background: white;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .order-details h3 { 
              color: #194528; 
              border-bottom: 2px solid #F88B42; 
              padding-bottom: 10px;
              margin-bottom: 15px;
            }
            .items-table { 
              width: 100%; 
              border-collapse: collapse; 
              margin-bottom: 25px;
              background: white;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .items-table th { 
              background: #194528; 
              color: white; 
              padding: 12px 8px; 
              text-align: left; 
              font-weight: 600;
            }
            .items-table td { 
              border-bottom: 1px solid #eee; 
              padding: 12px 8px; 
              text-align: left; 
            }
            .items-table tr:nth-child(even) { background: #f8f9fa; }
            .total { 
              text-align: right; 
              font-weight: bold; 
              font-size: 18px;
              background: #e3f2fd;
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid #2196f3;
            }
            .status-badge {
              display: inline-block;
              padding: 4px 12px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 600;
              text-transform: uppercase;
            }
            .status-pending { background: #fff3cd; color: #856404; }
            .status-processing { background: #cce5ff; color: #004085; }
            .status-completed { background: #d4edda; color: #155724; }
            .status-cancelled { background: #f8d7da; color: #721c24; }
            @media print { 
              body { margin: 0; background: white; }
              .header { background: #194528 !important; -webkit-print-color-adjust: exact; }
              .items-table th { background: #194528 !important; -webkit-print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🍎 Fruit Delight</h1>
            <h2>Bulk Order Invoice</h2>
          </div>
          
          <div class="order-details">
            <h3>📋 Order Details</h3>
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Customer:</strong> ${order.customerName}</p>
            <p><strong>Date:</strong> ${new Date(order.orderDate).toLocaleDateString()}</p>
            <p><strong>Delivery Date:</strong> ${new Date(order.deliveryDate).toLocaleDateString()}</p>
            <p><strong>Status:</strong> <span class="status-badge status-${order.status}">${order.status}</span></p>
          </div>
          
          <table class="items-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity (kg)</th>
                <th>Price per kg</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td><strong>${item.name}</strong></td>
                  <td>${item.quantity} kg</td>
                  <td>₹${item.pricePerKg}</td>
                  <td>₹${(item.quantity * item.pricePerKg).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="total">
            <p>Subtotal: ₹${order.totalAmount.toFixed(2)}</p>
            <p>Delivery Charge: ₹${order.deliveryCharge.toFixed(2)}</p>
            <p style="font-size: 22px; color: #194528; border-top: 2px solid #F88B42; padding-top: 10px;">
              <strong>Grand Total: ₹${(order.totalAmount + order.deliveryCharge).toFixed(2)}</strong>
            </p>
          </div>
          
          <div style="margin-top: 40px; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="color: #194528; border-bottom: 2px solid #F88B42; padding-bottom: 10px;">📍 Delivery Information</h3>
            <p><strong>Delivery Address:</strong></p>
            <p style="background: #f8f9fa; padding: 10px; border-radius: 4px; margin: 10px 0;">${order.deliveryAddress}</p>
            <p><strong>Special Instructions:</strong> ${order.specialInstructions || 'None'}</p>
          </div>
          
          <div style="text-align: center; margin-top: 40px; padding: 20px; color: #666; font-size: 14px;">
            <p>Thank you for choosing Fruit Delight! 🍓</p>
            <p>For any queries, please contact us at support@fruitdelight.com</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Bulk Orders</h2>
        <button
          onClick={onAdd}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaPlus />
          <span>Add Bulk Order</span>
        </button>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900">Total Orders</h3>
          <p className="text-3xl font-bold text-blue-600">{orders.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900">Pending Orders</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {orders.filter(o => o.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900">Completed Orders</h3>
          <p className="text-3xl font-bold text-green-600">
            {orders.filter(o => o.status === 'completed').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900">Total Revenue</h3>
          <p className="text-3xl font-bold text-purple-600">
            ₹{orders.reduce((sum, order) => sum + order.totalAmount, 0).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Search, Filter, and Sort Controls */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Orders</label>
            <input
              type="text"
              placeholder="Search by customer, phone, email, or order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          
          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="orderDate">Order Date</option>
              <option value="deliveryDate">Delivery Date</option>
              <option value="totalAmount">Total Amount</option>
              <option value="customerName">Customer Name</option>
              <option value="status">Status</option>
            </select>
          </div>
          
          {/* Sort Order */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort Order</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>
        
        {/* Results Summary */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing <span className="font-medium">{filteredAndSortedOrders.length}</span> of <span className="font-medium">{orders.length}</span> orders
            {searchTerm && ` matching "${searchTerm}"`}
            {statusFilter !== 'all' && ` with status "${statusFilter}"`}
          </p>
        </div>
        
        {/* Bulk Actions */}
        {selectedOrders.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">
                {selectedOrders.length} order(s) selected
              </span>
              <select
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Action</option>
                <option value="status-pending">Mark as Pending</option>
                <option value="status-processing">Mark as Processing</option>
                <option value="status-completed">Mark as Completed</option>
                <option value="status-cancelled">Mark as Cancelled</option>
              </select>
              <button
                onClick={() => {
                  if (bulkAction && bulkAction.startsWith('status-')) {
                    const newStatus = bulkAction.replace('status-', '');
                    // Here you would typically call an API to update multiple orders
                    // For now, we'll just show an alert
                    alert(`Would update ${selectedOrders.length} orders to status: ${newStatus}`);
                    setSelectedOrders([]);
                    setBulkAction('');
                  }
                }}
                disabled={!bulkAction}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Apply to Selected
              </button>
              <button
                onClick={() => {
                  setSelectedOrders([]);
                  setBulkAction('');
                }}
                className="px-3 py-2 text-gray-600 hover:text-gray-800"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">Bulk Orders List</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === filteredAndSortedOrders.length && filteredAndSortedOrders.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedOrders(filteredAndSortedOrders.map(order => order.id));
                      } else {
                        setSelectedOrders([]);
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedOrders([...selectedOrders, order.id]);
                        } else {
                          setSelectedOrders(selectedOrders.filter(id => id !== order.id));
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      Order #{order.id}
                    </div>
                    <div className="text-sm text-gray-500">
                      Date: {new Date(order.orderDate).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      Delivery: {new Date(order.deliveryDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.customerName}</div>
                    <div className="text-sm text-gray-500">{order.customerPhone}</div>
                    <div className="text-sm text-gray-500">{order.customerEmail}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {order.items.length} items
                    </div>
                    <div className="text-sm text-gray-500">
                      Total Weight: {order.items.reduce((sum, item) => sum + item.quantity, 0)} kg
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ₹{order.totalAmount.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500">
                      + ₹{order.deliveryCharge.toFixed(2)} delivery
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      Total: ₹{(order.totalAmount + order.deliveryCharge).toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={order.status}
                      onChange={(e) => {
                        // Here you would typically call an API to update the order status
                        // For now, we'll just show an alert
                        alert(`Would update order ${order.id} status to: ${e.target.value}`);
                      }}
                      className={`px-2 py-1 text-xs font-semibold rounded-full border-0 focus:ring-2 focus:ring-blue-500 ${
                      order.status === 'completed' 
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                          : order.status === 'processing'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setQuickViewOrder(order)}
                        className="text-purple-600 hover:text-purple-900"
                        title="Quick View"
                      >
                        <FaEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEdit(order)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit"
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handlePrint(order)}
                        className="text-green-600 hover:text-green-900"
                        title="Print"
                      >
                        <FaPrint className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(order.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Quick View Modal */}
      {quickViewOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Order Details - {quickViewOrder.customerName}</h3>
              <button
                onClick={() => setQuickViewOrder(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Order Information */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Order Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Order ID:</span> {quickViewOrder.id}</p>
                    <p><span className="font-medium">Order Date:</span> {new Date(quickViewOrder.orderDate).toLocaleDateString()}</p>
                    <p><span className="font-medium">Delivery Date:</span> {new Date(quickViewOrder.deliveryDate).toLocaleDateString()}</p>
                    <p><span className="font-medium">Status:</span> 
                      <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
                        quickViewOrder.status === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : quickViewOrder.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : quickViewOrder.status === 'processing'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {quickViewOrder.status}
                      </span>
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Customer Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {quickViewOrder.customerName}</p>
                    <p><span className="font-medium">Phone:</span> {quickViewOrder.customerPhone}</p>
                    <p><span className="font-medium">Email:</span> {quickViewOrder.customerEmail}</p>
                    <p><span className="font-medium">Address:</span> {quickViewOrder.deliveryAddress}</p>
                  </div>
                </div>
              </div>
              
              {/* Items and Total */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Order Items</h4>
                  <div className="space-y-2">
                    {quickViewOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-sm border-b border-gray-200 pb-2">
                        <div>
                          <span className="font-medium">{item.name}</span>
                          <span className="text-gray-500 ml-2">({item.quantity} kg)</span>
                        </div>
                        <span className="font-medium">₹{(item.quantity * item.pricePerKg).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Pricing</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>₹{quickViewOrder.totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Charge:</span>
                      <span>₹{quickViewOrder.deliveryCharge.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-2 font-semibold">
                      <span>Total:</span>
                      <span>₹{(quickViewOrder.totalAmount + quickViewOrder.deliveryCharge).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                {quickViewOrder.specialInstructions && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Special Instructions</h4>
                    <p className="text-sm text-gray-700">{quickViewOrder.specialInstructions}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => onEdit(quickViewOrder)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Edit Order
              </button>
              <button
                onClick={() => handlePrint(quickViewOrder)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Print Invoice
              </button>
              <button
                onClick={() => setQuickViewOrder(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Modal Component
const Modal = ({ type, item, onClose, onSave }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      // Set default values based on type
      switch (type) {
        case 'customer':
          setFormData({
            name: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            status: 'active',
            createdAt: new Date().toISOString()
          });
          break;
        case 'stock':
          setFormData({
            name: '',
            category: '',
            quantity: 0,
            minQuantity: 5,
            costPerKg: 0,
            supplier: '',
            image: '',
            lastUpdated: new Date().toISOString()
          });
          break;
        case 'employee':
          setFormData({
            name: '',
            position: '',
            department: '',
            email: '',
            phone: '',
            salary: 0,
            workDays: 0,
            joinDate: new Date().toISOString(),
            status: 'active'
          });
          break;
        case 'bulkOrder':
          setFormData({
            customerName: '',
            customerPhone: '',
            customerEmail: '',
            deliveryAddress: '',
            orderDate: new Date().toISOString(),
            deliveryDate: new Date().toISOString(),
            items: [],
            totalAmount: 0,
            deliveryCharge: 0,
            specialInstructions: '',
            status: 'pending'
          });
          break;
        default:
          setFormData({});
      }
    }
  }, [type, item]);

  // Auto-update total amount for bulk orders when items change
  useEffect(() => {
    if (type === 'bulkOrder' && formData.items && formData.items.length > 0) {
      const newTotal = formData.items.reduce((sum, item) => sum + (item.quantity * item.pricePerKg), 0);
      if (newTotal !== formData.totalAmount) {
        setFormData(prev => ({ ...prev, totalAmount: newTotal }));
      }
    }
  }, [formData.items, type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData, item ? 'update' : 'create');
      onClose();
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    switch (type) {
      case 'customer':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={formData.status || 'active'}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                value={formData.address || ''}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                value={formData.city || ''}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        );

      case 'stock':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Fruit Name</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                value={formData.category || ''}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Quantity (kg)</label>
              <input
                type="number"
                value={formData.quantity || 0}
                onChange={(e) => setFormData({...formData, quantity: parseFloat(e.target.value)})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Min Quantity (kg)</label>
              <input
                type="number"
                value={formData.minQuantity || 5}
                onChange={(e) => setFormData({...formData, minQuantity: parseFloat(e.target.value)})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cost per kg (₹)</label>
              <input
                type="number"
                step="0.01"
                value={formData.costPerKg || 0}
                onChange={(e) => setFormData({...formData, costPerKg: parseFloat(e.target.value)})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Supplier</label>
              <input
                type="text"
                value={formData.supplier || ''}
                onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="url"
                value={formData.image || ''}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        );

      case 'employee':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <input
                type="text"
                value={formData.position || ''}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <input
                type="text"
                value={formData.department || ''}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Salary (₹)</label>
              <input
                type="number"
                value={formData.salary || 0}
                onChange={(e) => setFormData({...formData, salary: parseFloat(e.target.value)})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Work Days</label>
              <input
                type="number"
                value={formData.workDays || 0}
                onChange={(e) => setFormData({...formData, workDays: parseInt(e.target.value)})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={formData.status || 'active'}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Join Date</label>
              <input
                type="date"
                value={formData.joinDate ? formData.joinDate.split('T')[0] : ''}
                onChange={(e) => setFormData({...formData, joinDate: new Date(e.target.value).toISOString()})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        );

      case 'bulkOrder':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Customer Name</label>
                <input
                  type="text"
                  value={formData.customerName || ''}
                  onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Customer Phone</label>
                <input
                  type="tel"
                  value={formData.customerPhone || ''}
                  onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Customer Email</label>
                <input
                  type="email"
                  value={formData.customerEmail || ''}
                  onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={formData.status || 'pending'}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Order Date</label>
                <input
                  type="date"
                  value={formData.orderDate ? formData.orderDate.split('T')[0] : ''}
                  onChange={(e) => setFormData({...formData, orderDate: new Date(e.target.value).toISOString()})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Delivery Date</label>
                <input
                  type="date"
                  value={formData.deliveryDate ? formData.deliveryDate.split('T')[0] : ''}
                  onChange={(e) => setFormData({...formData, deliveryDate: new Date(e.target.value).toISOString()})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Delivery Charge (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.deliveryCharge || 0}
                  onChange={(e) => setFormData({...formData, deliveryCharge: parseFloat(e.target.value)})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Delivery Address</label>
                <textarea
                  value={formData.deliveryAddress || ''}
                  onChange={(e) => setFormData({...formData, deliveryAddress: e.target.value})}
                  rows="3"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Special Instructions</label>
                <textarea
                  value={formData.specialInstructions || ''}
                  onChange={(e) => setFormData({...formData, specialInstructions: e.target.value})}
                  rows="2"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            {/* Items Management */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-medium text-gray-900">Order Items</h4>
                <button
                  type="button"
                  onClick={() => {
                    const newItem = { name: '', quantity: 0, pricePerKg: 0 };
                    setFormData({
                      ...formData,
                      items: [...(formData.items || []), newItem]
                    });
                  }}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  Add Item
                </button>
              </div>
              
              {formData.items && formData.items.length > 0 ? (
                <div className="space-y-3">
                  {formData.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 border rounded bg-gray-50">
                      <div>
                        <label className="block text-xs font-medium text-gray-700">Item Name</label>
                        <input
                          type="text"
                          value={item.name || ''}
                          onChange={(e) => {
                            const newItems = [...formData.items];
                            newItems[index] = { ...item, name: e.target.value };
                            setFormData({ ...formData, items: newItems });
                          }}
                          className="mt-1 block w-full border border-gray-300 rounded px-2 py-1 text-sm"
                          placeholder="e.g., Mango"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700">Quantity (kg)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={item.quantity || 0}
                          onChange={(e) => {
                            const newItems = [...formData.items];
                            newItems[index] = { ...item, quantity: parseFloat(e.target.value) || 0 };
                            setFormData({ ...formData, items: newItems });
                          }}
                          className="mt-1 block w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700">Price per kg (₹)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={item.pricePerKg || 0}
                          onChange={(e) => {
                            const newItems = [...formData.items];
                            newItems[index] = { ...item, pricePerKg: parseFloat(e.target.value) || 0 };
                            setFormData({ ...formData, items: newItems });
                          }}
                          className="mt-1 block w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={() => {
                            const newItems = formData.items.filter((_, i) => i !== index);
                            setFormData({ ...formData, items: newItems });
                          }}
                          className="px-2 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {/* Total Calculation */}
                  <div className="text-right p-3 bg-blue-50 rounded">
                    <p className="text-sm font-medium text-gray-700">
                      Total Amount: ₹{formData.items.reduce((sum, item) => sum + (item.quantity * item.pricePerKg), 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No items added yet. Click "Add Item" to start.
                </div>
              )}
            </div>
          </div>
        );

      default:
        return <div>Unknown form type</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {item ? 'Edit' : 'Add'} {type === 'customer' ? 'Customer' : 
               type === 'stock' ? 'Stock Item' : 
               type === 'employee' ? 'Employee' : 'Bulk Order'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {renderForm()}
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Saving...' : (item ? 'Update' : 'Save')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
