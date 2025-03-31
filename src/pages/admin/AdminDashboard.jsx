import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 124,
    pendingReservations: 8,
    totalMenuItems: 42,
    revenue: 3280.50
  });

  const [recentReservations, setRecentReservations] = useState([
    { id: 1, name: "Amit Kumar", date: "2025-04-01", time: "19:00", guests: 4, status: "confirmed" },
    { id: 2, name: "Priya Sharma", date: "2025-04-02", time: "20:30", guests: 2, status: "pending" },
    { id: 3, name: "Rahul Singh", date: "2025-04-02", time: "18:00", guests: 6, status: "confirmed" },
    { id: 4, name: "Neha Patel", date: "2025-04-03", time: "19:30", guests: 3, status: "pending" },
  ]);
  
  const [recentOrders, setRecentOrders] = useState([
    { id: 101, customer: "Vikram Malhotra", amount: 89.99, status: "completed", date: "2025-03-30" },
    { id: 102, customer: "Sneha Reddy", amount: 55.50, status: "processing", date: "2025-03-31" },
    { id: 103, customer: "Kiran Joshi", amount: 124.75, status: "completed", date: "2025-03-31" },
    { id: 104, customer: "Deepak Sharma", amount: 67.80, status: "processing", date: "2025-03-31" },
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Orders</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalOrders}</p>
            </div>
            <div className="bg-amber-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 font-medium">Pending Reservations</p>
              <p className="text-2xl font-bold text-gray-800">{stats.pendingReservations}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 font-medium">Menu Items</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalMenuItems}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 font-medium">Revenue</p>
              <p className="text-2xl font-bold text-gray-800">${stats.revenue.toFixed(2)}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/admin/menu" className="bg-amber-50 hover:bg-amber-100 p-4 rounded-lg transition-colors text-center">
            <svg className="w-6 h-6 mx-auto text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            <span className="block mt-2 text-sm font-medium text-gray-700">Manage Menu</span>
          </Link>
          
          <Link to="/admin/banners" className="bg-amber-50 hover:bg-amber-100 p-4 rounded-lg transition-colors text-center">
            <svg className="w-6 h-6 mx-auto text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span className="block mt-2 text-sm font-medium text-gray-700">Manage Banners</span>
          </Link>
          
          <button className="bg-amber-50 hover:bg-amber-100 p-4 rounded-lg transition-colors text-center">
            <svg className="w-6 h-6 mx-auto text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <span className="block mt-2 text-sm font-medium text-gray-700">Add New Item</span>
          </button>
          
          <button className="bg-amber-50 hover:bg-amber-100 p-4 rounded-lg transition-colors text-center">
            <svg className="w-6 h-6 mx-auto text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
            </svg>
            <span className="block mt-2 text-sm font-medium text-gray-700">View Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;