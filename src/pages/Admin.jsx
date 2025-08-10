import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { db, auth } from '../firebase';
import { 
  FaSignOutAlt,
  FaBars,
  FaChevronLeft,
  FaExclamationTriangle,
  FaChartBar,
  FaUsers,
  FaBoxes,
  FaUserTie,
  FaShoppingCart
} from 'react-icons/fa';
import DashboardSection from '../admin/DashboardSection';
import CustomersSection from '../admin/CustomersSection';
import StockSection from '../admin/StockSection';
import EmployeesSection from '../admin/EmployeesSection';
import Bulk from '../admin/Bulk';
import Modal from '../admin/Modal';

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

  // Sidebar Component
  const Sidebar = () => {
    

    return (
            <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-gradient-to-b from-white to-gray-50 shadow-xl transition-all duration-300 ease-in-out border-r border-gray-200 flex-shrink-0 fixed left-0 top-0 z-10 flex flex-col`} style={{ height: '100vh' }}>
        {/* Sidebar Toggle Button */}
        <div className="flex justify-end p-3 flex-shrink-0">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-md bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
            title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {sidebarCollapsed ? <FaBars className="w-3.5 h-3.5" /> : <FaChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>
        
        <nav className="mt-3 flex-1">
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
                className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-1.5' : 'space-x-2 px-4'} py-3 text-left transition-all duration-200 hover:bg-green-50 group relative ${
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
    );
  };

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
      // Add the type property to the data based on modalType
      const dataWithType = { ...data, type: modalType };
      const collectionName = getCollectionName(modalType);
      let docRef;
      
      if (operation === 'create') {
        docRef = await addDoc(collection(db, collectionName), dataWithType);
        console.log('Document written with ID: ', docRef.id);
      } else if (operation === 'update') {
        await updateDoc(doc(db, collectionName, dataWithType.id), dataWithType);
        console.log('Document updated successfully');
      }
      
      // Refresh data
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
      
      updateDashboardStats();
      setShowAddModal(false);
      setEditingItem(null);
      setModalType('');
    } catch (error) {
      console.error('Error saving document: ', error);
      setFirebaseError(error.message);
    }
  };

  const getCollectionName = (type) => {
    switch (type) {
      case 'customer': return 'customers';
      case 'stock': return 'stock';
      case 'employee': return 'employees';
      case 'bulkOrder': return 'bulkOrders';
      default: return 'customers';
    }
  };

  const deleteCustomer = async (id) => {
      try {
        await deleteDoc(doc(db, 'customers', id));
        await fetchCustomers();
        updateDashboardStats();
      } catch (error) {
      console.error('Error deleting customer: ', error);
      setFirebaseError(error.message);
    }
  };

  const deleteStockItem = async (id) => {
      try {
        await deleteDoc(doc(db, 'stock', id));
        await fetchStock();
        updateDashboardStats();
      } catch (error) {
      console.error('Error deleting stock item: ', error);
      setFirebaseError(error.message);
    }
  };

  const deleteEmployee = async (id) => {
      try {
        await deleteDoc(doc(db, 'employees', id));
        await fetchEmployees();
        updateDashboardStats();
      } catch (error) {
      console.error('Error deleting employee: ', error);
      setFirebaseError(error.message);
    }
  };

  const deleteBulkOrder = async (id) => {
      try {
        await deleteDoc(doc(db, 'bulkOrders', id));
        await fetchBulkOrders();
        updateDashboardStats();
      } catch (error) {
      console.error('Error deleting bulk order: ', error);
      setFirebaseError(error.message);
    }
  };

  const updateDashboardStats = () => {
    setDashboardStats({
      totalCustomers: customers.length,
      totalStock: stock.length,
      totalEmployees: employees.length
    });
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setShowLogoutConfirm(false);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  useEffect(() => {
    const testConnection = async () => {
      try {
        setConnectionStatus('connecting');
        const testQuery = query(collection(db, 'customers'), orderBy('createdAt', 'desc'));
        await getDocs(testQuery);
        setConnectionStatus('connected');
        setFirebaseError(null);
      } catch (error) {
        console.error('Firebase connection test failed:', error);
        setConnectionStatus('error');
        setFirebaseError(error.message);
        
        if (error.code === 'unavailable') {
          console.log('Firebase is unavailable, will retry...');
          setTimeout(testConnection, 5000);
        }
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
    testConnection();
        fetchAllData();
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchAllData = async () => {
    try {
    await Promise.all([
      fetchCustomers(),
      fetchStock(),
      fetchEmployees(),
      fetchBulkOrders()
    ]);
    updateDashboardStats();
    } catch (error) {
      console.error('Error fetching all data:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-600 text-lg font-semibold">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  const renderSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <DashboardSection stats={dashboardStats} />;
      case 'customers':
  return (
              <CustomersSection 
                customers={customers} 
            onAdd={() => {
              setModalType('customer');
              setShowAddModal(true);
            }}
            onEdit={(customer) => {
              setEditingItem(customer);
              setModalType('customer');
              setShowAddModal(true);
            }}
                onDelete={deleteCustomer}
              />
        );
      case 'stock':
        return (
              <StockSection 
                stock={stock} 
            onAdd={() => {
              setModalType('stock');
              setShowAddModal(true);
            }}
            onEdit={(item) => {
              setEditingItem(item);
              setModalType('stock');
              setShowAddModal(true);
            }}
                onDelete={deleteStockItem}
              />
        );
      case 'employees':
        return (
              <EmployeesSection 
                employees={employees} 
            onAdd={() => {
              setModalType('employee');
              setShowAddModal(true);
            }}
            onEdit={(employee) => {
              setEditingItem(employee);
              setModalType('employee');
              setShowAddModal(true);
            }}
                onDelete={deleteEmployee}
              />
        );
      case 'bulkOrders':
        return <Bulk />;
      default:
        return <DashboardSection stats={dashboardStats} />;
    }
  };

  return (
    <div className="flex bg-gray-50" style={{ zoom: '0.8' }}>
      <Sidebar />
      
      <main className={`flex-1 transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-3 py-2.5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2.5">
          <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-1 rounded-md hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-800"
                title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
                {sidebarCollapsed ? <FaBars className="w-3.5 h-3.5" /> : <FaChevronLeft className="w-3.5 h-3.5" />}
          </button>
                        <div>
                <h1 className="text-lg font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-xs text-gray-600">Welcome back, {user.email}</p>
                        </div>
                      </div>
            
                                                 <div className="flex items-center gap-2.5">
               {/* Connection Status */}
               <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-md">
                 <div className={`w-1 h-1 rounded-full ${
                   connectionStatus === 'connected' ? 'bg-green-500' : 
                   connectionStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'
                 }`}></div>
                 <span className="text-xs font-medium text-gray-700">
                   {connectionStatus === 'connected' ? 'Connected' : 
                    connectionStatus === 'connecting' ? 'Connecting...' : 'Connection Error'}
                           </span>
                         </div>
               
           <button
                 onClick={handleLogout}
                 className="flex items-center gap-1 px-2.5 py-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors font-medium text-xs"
           >
                 <FaSignOutAlt className="w-3 h-3" />
                 Logout
           </button>
         </div>
                        </div>
        </header>

                                 {/* Main Content */}
         <div className="p-3">
           {renderSection()}
           </div>
      </main>

            {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-5 max-w-sm w-full mx-4">
            <h3 className="text-base font-bold text-gray-900 mb-3">Confirm Logout</h3>
            <p className="text-gray-600 mb-3 text-xs">Are you sure you want to logout from the admin panel?</p>
            <div className="flex justify-end space-x-2.5">
        <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-3 py-1.5 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors text-xs"
        >
                Cancel
        </button>
              <button
                onClick={confirmLogout}
                className="px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-xs"
              >
                Logout
              </button>
            </div>
          </div>
      </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <Modal
          type={modalType}
          item={editingItem}
          onClose={() => {
            setShowAddModal(false);
            setEditingItem(null);
            setModalType('');
          }}
          onSave={handleSave}
        />
      )}

      {/* Firebase Error Modal */}
      {firebaseError && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-5 max-w-sm w-full mx-4">
            <div className="flex items-center gap-2 mb-3">
              <FaExclamationTriangle className="w-4 h-4 text-red-500" />
              <h3 className="text-base font-bold text-gray-900">Connection Error</h3>
            </div>
            <p className="text-gray-600 mb-3 text-xs">{firebaseError}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setFirebaseError(null)}
                className="px-3 py-1.5 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors text-xs"
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

// Login Form Component
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

        return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🍎 Fruit Delight</h1>
          <p className="text-gray-600">Admin Panel Login</p>
            </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
          
              <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
            </div>
            
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
          
              <button
                type="submit"
                disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
            {loading ? 'Signing In...' : 'Sign In'}
              </button>
          </form>
      </div>
    </div>
  );
};

export default Admin;
