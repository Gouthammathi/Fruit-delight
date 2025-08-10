import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaPrint, FaEye, FaTimes, FaSearch, FaFilter, FaSort } from 'react-icons/fa';
import Modal from './Modal';

const Bulk = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('orderDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [bulkAction, setBulkAction] = useState('');
  const [quickViewOrder, setQuickViewOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock data - replace with actual Firebase data
  useEffect(() => {
    const mockOrders = [
      {
        id: 'BO001',
        customerName: 'Fresh Market Ltd',
        customerPhone: '+91 98765 43210',
        customerEmail: 'orders@freshmarket.com',
        deliveryAddress: '123 Market Street, Downtown, Mumbai',
        orderDate: '2024-01-15T10:00:00Z',
        deliveryDate: '2024-01-20T14:00:00Z',
        items: [
          { name: 'Mangoes', quantity: 50, pricePerKg: 120 },
          { name: 'Bananas', quantity: 100, pricePerKg: 60 },
          { name: 'Oranges', quantity: 75, pricePerKg: 80 }
        ],
        totalAmount: 15000,
        deliveryCharge: 500,
        specialInstructions: 'Handle with care, deliver before 2 PM',
        status: 'pending'
      },
      {
        id: 'BO002',
        customerName: 'Hotel Grand Palace',
        customerPhone: '+91 87654 32109',
        customerEmail: 'procurement@grandpalace.com',
        deliveryAddress: '456 Palace Road, Luxury District, Delhi',
        orderDate: '2024-01-14T09:00:00Z',
        deliveryDate: '2024-01-18T11:00:00Z',
        items: [
          { name: 'Apples', quantity: 80, pricePerKg: 150 },
          { name: 'Grapes', quantity: 60, pricePerKg: 200 },
          { name: 'Pomegranates', quantity: 40, pricePerKg: 180 }
        ],
        totalAmount: 25200,
        deliveryCharge: 800,
        specialInstructions: 'Premium quality required for 5-star hotel',
        status: 'processing'
      }
    ];
    setOrders(mockOrders);
  }, []);

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
              padding: 12px; 
              text-align: left;
              font-weight: 600;
            }
            .items-table td { 
              padding: 12px; 
              border-bottom: 1px solid #e9ecef;
            }
            .items-table tr:nth-child(even) { background: #f8f9fa; }
            .total-section { 
              background: white;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .total-row { 
              display: flex; 
              justify-content: space-between; 
              margin-bottom: 8px;
              padding: 8px 0;
            }
            .total-row.final { 
              border-top: 2px solid #F88B42; 
              font-weight: bold; 
              font-size: 18px;
              color: #194528;
            }
            .footer { 
              text-align: center; 
              margin-top: 30px; 
              color: #6c757d; 
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🍎 Fruit Delight</h1>
            <h2>Bulk Order Invoice</h2>
          </div>
          
          <div class="order-details">
            <h3>Order Information</h3>
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Order Date:</strong> ${new Date(order.orderDate).toLocaleDateString()}</p>
            <p><strong>Delivery Date:</strong> ${new Date(order.deliveryDate).toLocaleDateString()}</p>
            <p><strong>Status:</strong> <span style="color: #F88B42; font-weight: bold;">${order.status.toUpperCase()}</span></p>
          </div>
          
          <div class="order-details">
            <h3>Customer Information</h3>
            <p><strong>Name:</strong> ${order.customerName}</p>
            <p><strong>Phone:</strong> ${order.customerPhone}</p>
            <p><strong>Email:</strong> ${order.customerEmail}</p>
            <p><strong>Delivery Address:</strong> ${order.deliveryAddress}</p>
          </div>
          
          <table class="items-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity (kg)</th>
                <th>Price per kg (₹)</th>
                <th>Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>₹${item.pricePerKg}</td>
                  <td>₹${(item.quantity * item.pricePerKg).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="total-section">
            <div class="total-row">
              <span>Subtotal:</span>
              <span>₹${order.totalAmount.toFixed(2)}</span>
            </div>
            <div class="total-row">
              <span>Delivery Charge:</span>
              <span>₹${order.deliveryCharge.toFixed(2)}</span>
            </div>
            <div class="total-row final">
              <span>Total Amount:</span>
              <span>₹${(order.totalAmount + order.deliveryCharge).toFixed(2)}</span>
            </div>
          </div>
          
          ${order.specialInstructions ? `
            <div class="order-details">
              <h3>Special Instructions</h3>
              <p>${order.specialInstructions}</p>
            </div>
          ` : ''}
          
          <div class="footer">
            <p>Thank you for choosing Fruit Delight! 🍇</p>
            <p>For any queries, contact us at support@fruitdelight.com</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleSave = async (formData, action) => {
    setLoading(true);
    try {
      if (action === 'create') {
        const newOrder = {
          ...formData,
          id: `BO${String(orders.length + 1).padStart(3, '0')}`,
          createdAt: new Date().toISOString()
        };
        setOrders(prev => [...prev, newOrder]);
      } else {
        setOrders(prev => prev.map(order => 
          order.id === editingOrder.id ? { ...formData, id: order.id } : order
        ));
      }
      setShowModal(false);
      setEditingOrder(null);
    } catch (error) {
      console.error('Error saving order:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setShowModal(true);
  };

  const handleDelete = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(prev => prev.filter(order => order.id !== orderId));
    }
  };

  const handleBulkAction = () => {
    if (bulkAction === 'delete' && selectedOrders.length > 0) {
      if (window.confirm(`Are you sure you want to delete ${selectedOrders.length} orders?`)) {
        setOrders(prev => prev.filter(order => !selectedOrders.includes(order.id)));
        setSelectedOrders([]);
      }
    }
    setBulkAction('');
  };

  const toggleOrderSelection = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bulk Orders Management</h1>
          <p className="text-gray-600 mt-2">Manage and track all bulk orders from customers</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl"
        >
          <FaPlus className="w-4 h-4" />
          New Bulk Order
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          {/* Search */}
          <div className="flex-1 min-w-0">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search orders by customer, phone, email, or order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-400 w-4 h-4" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <FaSort className="text-gray-400 w-4 h-4" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="orderDate">Order Date</option>
              <option value="deliveryDate">Delivery Date</option>
              <option value="totalAmount">Total Amount</option>
              <option value="customerName">Customer Name</option>
            </select>
            <button
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedOrders.length > 0 && (
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-600">
              {selectedOrders.length} order(s) selected
            </span>
            <select
              value={bulkAction}
              onChange={(e) => setBulkAction(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Bulk Actions</option>
              <option value="delete">Delete Selected</option>
            </select>
            <button
              onClick={handleBulkAction}
              disabled={!bulkAction}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Apply
            </button>
          </div>
        )}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-green-50 to-green-100">
              <tr>
                <th className="px-6 py-4 text-left">
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
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Order ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Order Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Delivery Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAndSortedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => toggleOrderSelection(order.id)}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm font-semibold text-gray-900">{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.customerPhone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(order.deliveryDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900">
                      ₹{(order.totalAmount + order.deliveryCharge).toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500">
                      +₹{order.deliveryCharge} delivery
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setQuickViewOrder(order)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Quick View"
                      >
                        <FaEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(order)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handlePrint(order)}
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        title="Print"
                      >
                        <FaPrint className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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

        {filteredAndSortedOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by creating your first bulk order'
              }
            </p>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Order Details - {quickViewOrder.id}
              </h3>
              <button
                onClick={() => setQuickViewOrder(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Order Information */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Order Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Order ID:</span> {quickViewOrder.id}</p>
                    <p><span className="font-medium">Order Date:</span> {new Date(quickViewOrder.orderDate).toLocaleDateString()}</p>
                    <p><span className="font-medium">Delivery Date:</span> {new Date(quickViewOrder.deliveryDate).toLocaleDateString()}</p>
                    <p><span className="font-medium">Status:</span> 
                      <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(quickViewOrder.status)}`}>
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
                onClick={() => handleEdit(quickViewOrder)}
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

      {/* Add/Edit Modal */}
      {showModal && (
        <Modal
          type="bulkOrder"
          item={editingOrder}
          onClose={() => {
            setShowModal(false);
            setEditingOrder(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Bulk;
