import React from 'react';
import { FaBoxes, FaWeightHanging, FaRupeeSign, FaExclamationTriangle, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const StockSection = ({ stock, onAdd, onEdit, onDelete }) => {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-green-100 rounded-full">
            <FaBoxes className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1.5">Stock Management</h1>
            <p className="text-base text-gray-600">Monitor and manage your fruit inventory efficiently</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-medium text-gray-600 mb-1.5">Total Items</p>
              <p className="text-3xl font-bold text-gray-900">{stock.length}</p>
              <p className="text-xs text-blue-600 mt-1.5">Unique products</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FaBoxes className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-medium text-gray-600 mb-1.5">Total Weight</p>
              <p className="text-3xl font-bold text-gray-900">
                {stock.reduce((sum, item) => sum + item.quantity, 0)}
              </p>
              <p className="text-xs text-green-600 mt-1.5">kg available</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FaWeightHanging className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-medium text-gray-600 mb-1.5">Total Value</p>
              <p className="text-3xl font-bold text-gray-900">
                ₹{stock.reduce((sum, item) => sum + (item.quantity * item.costPerKg), 0).toFixed(2)}
              </p>
              <p className="text-xs text-purple-600 mt-1.5">Inventory worth</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <FaRupeeSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-medium text-gray-600 mb-1.5">Low Stock Items</p>
              <p className="text-3xl font-bold text-gray-900">
                {stock.filter(item => item.quantity < 10).length}
              </p>
              <p className="text-xs text-red-600 mt-1.5">Need attention</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <FaExclamationTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Stock Inventory</h3>
          <button
            onClick={onAdd}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center space-x-2.5 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            <FaPlus className="w-4 h-4" />
            <span className="font-medium text-sm">Add Stock Item</span>
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Product Details</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Quantity & Cost</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Total Value</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Stock Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Last Updated</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100 rounded-lg">
                {stock.map((item) => (
                  <tr key={item.id} className="hover:bg-green-50 transition-colors duration-200">
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
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

export default StockSection;
