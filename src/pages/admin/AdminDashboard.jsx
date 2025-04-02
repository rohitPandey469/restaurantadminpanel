import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../App";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 124,
    pendingReservations: 8,
    totalMenuItems: 42,
    revenue: 3280.50
  });

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [recentReservations, setRecentReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [recentOrders, setRecentOrders] = useState([
    { id: 101, customer: "Vikram Malhotra", amount: 89.99, status: "completed", date: "2025-03-30" },
    { id: 102, customer: "Sneha Reddy", amount: 55.50, status: "processing", date: "2025-03-31" },
    { id: 103, customer: "Kiran Joshi", amount: 124.75, status: "completed", date: "2025-03-31" },
    { id: 104, customer: "Deepak Sharma", amount: 67.80, status: "processing", date: "2025-03-31" },
  ]);
  
// Fetch reservations data from API
useEffect(() => {
  const fetchReservations = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/reservations/all`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch reservations: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Process the data and ensure each reservation has a status
      const processedReservations = data.map(reservation => ({
        ...reservation,
        // Set status to "confirmed" if not present
        status: reservation.status || "confirmed"
      }));
      
      console.log(processedReservations)
      setRecentReservations(processedReservations);
      
      // Update pending reservations count in stats
      const pendingCount = processedReservations.filter(
        res => res.status === "pending"
      ).length;
      
      setStats(prevStats => ({
        ...prevStats,
        pendingReservations: pendingCount
      }));

      setError(null);
    } catch (err) {
      console.error("Error fetching reservations:", err);
      setError("Failed to load reservations. Please try again later.");

      // Fallback to sample data if API call fails
      const sampleReservations = [
        { id: 1, name: "Amit Kumar", date: "2025-04-01", time: "19:00", guests: 4, status: "confirmed", email: "amit@example.com", phone: "+91 98765-43210" },
        { id: 2, name: "Priya Sharma", date: "2025-04-02", time: "20:30", guests: 2, status: "pending", email: "priya@example.com", phone: "+91 87654-32109" },
        { id: 3, name: "Rahul Singh", date: "2025-04-02", time: "18:00", guests: 6, status: "confirmed", email: "rahul@example.com", phone: "+91 76543-21098" },
        { id: 4, name: "Neha Patel", date: "2025-04-03", time: "19:30", guests: 3, status: "pending", email: "neha@example.com", phone: "+91 65432-10987" },
        { id: 5, name: "Karan Malhotra", date: "2025-04-01", time: "18:30", guests: 2, status: "confirmed", email: "karan@example.com", phone: "+91 54321-09876" },
        { id: 6, name: "Ananya Gupta", date: "2025-04-03", time: "20:00", guests: 5, status: "confirmed", email: "ananya@example.com", phone: "+91 43210-98765" },
      ];
      setRecentReservations(sampleReservations);
    } finally {
      setIsLoading(false);
    }
  };

  fetchReservations();
}, []);

  // Filter reservations by selected date (showing all reservations for the entire 24-hour period)
const filteredReservations = recentReservations.filter(reservation => {
  // Handle different date storage formats
  let reservationDate;
  
  // If date is a complete ISO string with 'T' separator (e.g., "2025-04-01T12:00:00")
  if (reservation.date && reservation.date.includes('T')) {
    reservationDate = reservation.date.split('T')[0];
  } 
  // If date is stored as a simple date string (e.g., "2025-04-01")
  else if (reservation.date) {
    reservationDate = reservation.date;
  } 
  // If date and time are separate fields (e.g., date: "2025-04-01", time: "19:00")
  else if (reservation.date_field) {
    reservationDate = reservation.date_field;
  }
  // Fallback if no date field is found
  else {
    return false;
  }
  
  // Extract the value from the selected date dropdown
  const selectedDateValue = selectedDate.split('T')[0];
  
  // Compare just the date portions
  return reservationDate === selectedDateValue;
});

  // Group reservations by date for the date selector
  const reservationDates = [...new Set(recentReservations.map(res => res.date))].sort();
  
  // Handle reservation status change
  const handleStatusChange = (id, newStatus) => {
    setRecentReservations(prev => 
      prev.map(res => res.id === id ? {...res, status: newStatus} : res)
    );
  };

  // Helper function to format currency in INR
  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount * 83); // Approximate USD to INR conversion
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-amber-500 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Orders</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalOrders}</p>
              <p className="text-xs text-green-600 mt-1">↑ 12% from last week</p>
            </div>
            <div className="bg-amber-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 font-medium">Pending Reservations</p>
              <p className="text-2xl font-bold text-gray-800">{stats.pendingReservations}</p>
              <p className="text-xs text-amber-600 mt-1">↑ 3 new today</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 font-medium">Menu Items</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalMenuItems}</p>
              <p className="text-xs text-green-600 mt-1">→ 2 seasonal items</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 font-medium">Revenue</p>
              <p className="text-2xl font-bold text-gray-800">{formatINR(stats.revenue)}</p>
              <p className="text-xs text-green-600 mt-1">↑ 8% from last month</p>
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
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/admin/menu" className="bg-amber-50 hover:bg-amber-100 p-4 rounded-lg transition-colors text-center group">
            <div className="bg-amber-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 group-hover:bg-amber-200 transition-colors">
              <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <span className="block text-sm font-medium text-gray-700">Manage Menu</span>
          </Link>
          
          <Link to="/admin/banners" className="bg-amber-50 hover:bg-amber-100 p-4 rounded-lg transition-colors text-center group">
            <div className="bg-amber-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 group-hover:bg-amber-200 transition-colors">
              <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <span className="block text-sm font-medium text-gray-700">Manage Banners</span>
          </Link>
          
          <button className="bg-amber-50 hover:bg-amber-100 p-4 rounded-lg transition-colors text-center group">
            <div className="bg-amber-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 group-hover:bg-amber-200 transition-colors">
              <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <span className="block text-sm font-medium text-gray-700">Add New Item</span>
          </button>
          
          <button className="bg-amber-50 hover:bg-amber-100 p-4 rounded-lg transition-colors text-center group">
            <div className="bg-amber-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 group-hover:bg-amber-200 transition-colors">
              <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
              </svg>
            </div>
            <span className="block text-sm font-medium text-gray-700">View Reports</span>
          </button>
        </div>
      </div>
      
      {/* Day-wise Reservations */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-lg font-medium text-gray-800">Reservations by Date</h2>
          <div className="mt-3 md:mt-0">
            <select 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            >
              {reservationDates.map(date => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {filteredReservations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Guest
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Party Size
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReservations.map((reservation) => (
                  <tr key={reservation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{reservation.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(`2000-01-01T${reservation.time}`).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{reservation.guests} {reservation.guests === 1 ? 'person' : 'people'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{reservation.phone}</div>
                      <div className="text-sm text-gray-500">{reservation.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                          reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {reservation.status === 'pending' && (
                          <button 
                            onClick={() => handleStatusChange(reservation.id, 'confirmed')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Confirm
                          </button>
                        )}
                        {reservation.status === 'confirmed' && (
                          <button 
                            onClick={() => handleStatusChange(reservation.id, 'cancelled')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Cancel
                          </button>
                        )}
                        <button className="text-amber-600 hover:text-amber-900">
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No reservations</h3>
            <p className="mt-1 text-sm text-gray-500">There are no reservations for this date.</p>
          </div>
        )}
      </div>
      
      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.customer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{formatINR(order.amount)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" className="text-amber-600 hover:text-amber-900">View</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;