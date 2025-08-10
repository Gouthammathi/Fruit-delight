import React from 'react';
import { FaChartBar, FaUsers, FaBoxes, FaUserTie, FaShoppingCart, FaPlus } from 'react-icons/fa';

const DashboardSection = ({ stats }) => {
  // Safety check for stats prop
  const safeStats = stats || {
    totalCustomers: 0,
    totalStock: 0,
    totalEmployees: 0
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-green-100 rounded-full">
            <FaChartBar className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1.5">Welcome to Fruit Delight</h1>
            <p className="text-base text-gray-600">Manage your fruit business operations efficiently</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-medium text-gray-600 mb-1.5">Total Customers</p>
              <p className="text-3xl font-bold text-gray-900">{safeStats.totalCustomers}</p>
              <p className="text-xs text-green-600 mt-1.5">Active customers</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FaUsers className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-medium text-gray-600 mb-1.5">Total Stock</p>
              <p className="text-3xl font-bold text-gray-900">{safeStats.totalStock}</p>
              <p className="text-xs text-green-600 mt-1.5">items available</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FaBoxes className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-medium text-gray-600 mb-1.5">Employees</p>
              <p className="text-3xl font-bold text-gray-900">{safeStats.totalEmployees}</p>
              <p className="text-xs text-green-600 mt-1.5">Team members</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <FaUserTie className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 hover:from-green-100 hover:to-green-200 transition-all duration-200 group">
            <div className="p-2.5 bg-green-500 rounded-full mb-2.5 group-hover:scale-110 transition-transform">
              <FaUsers className="w-5 h-5 text-white" />
            </div>
            <span className="font-medium text-sm text-gray-800">Add Customer</span>
          </button>
          
          <button className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-all duration-200 group">
            <div className="p-2.5 bg-blue-500 rounded-full mb-2.5 group-hover:scale-110 transition-transform">
              <FaBoxes className="w-5 h-5 text-white" />
            </div>
            <span className="font-medium text-sm text-gray-800">Update Stock</span>
          </button>
          
          <button className="flex flex-col items-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200 hover:from-purple-100 hover:to-purple-200 transition-all duration-200 group">
            <div className="p-2.5 bg-purple-500 rounded-full mb-2.5 group-hover:scale-110 transition-transform">
              <FaUserTie className="w-5 h-5 text-white" />
            </div>
            <span className="font-medium text-sm text-gray-800">Manage Staff</span>
          </button>
          
          <button className="flex flex-col items-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200 hover:from-orange-100 hover:to-orange-200 transition-all duration-200 group">
            <div className="p-2.5 bg-orange-500 rounded-full mb-2.5 group-hover:scale-110 transition-transform">
              <FaShoppingCart className="w-5 h-5 text-white" />
            </div>
            <span className="font-medium text-sm text-gray-800">View Orders</span>
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

export default DashboardSection; 