import React from 'react';
import { FaUsers, FaCheckCircle, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const CustomersSection = ({ customers, onAdd, onEdit, onDelete }) => {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-100 rounded-full">
            <FaUsers className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1.5">Customer Management</h1>
            <p className="text-base text-gray-600">Manage your customer database and relationships</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-medium text-gray-600 mb-1.5">Total Customers</p>
              <p className="text-3xl font-bold text-gray-900">{customers.length}</p>
              <p className="text-xs text-blue-600 mt-1.5">Active accounts</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FaUsers className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-medium text-gray-600 mb-1.5">Active Customers</p>
              <p className="text-3xl font-bold text-gray-900">
                {customers.filter(c => c.status === 'active').length}
              </p>
              <p className="text-xs text-green-600 mt-1.5">Verified accounts</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FaCheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-medium text-gray-600 mb-1.5">New This Month</p>
              <p className="text-3xl font-bold text-gray-900">
                {customers.filter(c => {
                  const monthAgo = new Date();
                  monthAgo.setMonth(monthAgo.getMonth() - 1);
                  return new Date(c.createdAt) > monthAgo;
                }).length}
              </p>
              <p className="text-xs text-purple-600 mt-1.5">Recent additions</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <FaPlus className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Customer Database</h3>
          <button
            onClick={onAdd}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center space-x-2.5 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            <FaPlus className="w-4 h-4" />
            <span className="font-medium text-sm">Add New Customer</span>
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Customer Details</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Contact Info</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Joined</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100 rounded-lg">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-blue-50 transition-colors duration-200">
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
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

export default CustomersSection; 