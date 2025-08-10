import React from 'react';
import { FaUserTie, FaUsers, FaCheckCircle, FaCalendarAlt, FaRupeeSign, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

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

export default EmployeesSection;
