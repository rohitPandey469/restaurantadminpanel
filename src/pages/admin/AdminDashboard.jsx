import React, { useState, useEffect, useMemo } from "react";
import { getReservations, updateReservationStatus } from "../../service/reserve";
import { formatEURO } from "../../utils/formatEURO";
import { getAllOrders, getOrderInfo, placeOrder, updateOrderStatus } from "../../service/orders";
import { getAvailableMenuItems } from "../../service/menu";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 124,
    pendingReservations: 8,
    totalMenuItems: 42,
    revenue: 3280.50
  });

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [recentReservations, setRecentReservations] = useState([]);
  const [lastNumHours, setLastNumHours] = useState(48);
  const [status, setStatus] = useState("pending");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      await getReservations(lastNumHours, status, setRecentReservations, setIsLoading);
    };
    fetchReservations();
  }, [lastNumHours, status]);

  useEffect(() => {
    const fetchOrders = async () => {
      await getAllOrders(setRecentOrders, setIsLoading);
    }
    fetchOrders();
  }, [])

  useEffect(() => {
    // Set default date if there's at least one reservation
    if (recentReservations.length > 0) {
      // Use the most recent date as default
      const sortedDates = [...new Set(recentReservations.map(res => {
        return res.date && res.date.includes('T')
          ? res.date.split('T')[0]
          : res.date || res.date_field;
      }))].sort();

      if (sortedDates.length > 0) {
        setSelectedDate(sortedDates[sortedDates.length - 1]);
      }
    }
  }, [recentReservations, lastNumHours, status]);

  // Extract all unique dates from reservations
  const reservationDates = useMemo(() => {
    if (!recentReservations || recentReservations.length === 0) return [];

    const dateSet = new Set();

    recentReservations.forEach(res => {
      let dateStr;
      if (res.date && res.date.includes('T')) {
        dateStr = res.date.split('T')[0];
      } else if (res.date) {
        dateStr = res.date;
      } else if (res.date_field) {
        dateStr = res.date_field;
      }

      if (dateStr) {
        dateSet.add(dateStr);
      }
    });

    return [...dateSet].sort();
  }, [recentReservations]);

  // Filter reservations more reliably
  const filteredReservations = useMemo(() => {
    if (!recentReservations || recentReservations.length === 0 || !selectedDate) {
      return [];
    }

    return recentReservations.filter(reservation => {
      // Handle different date formats
      let reservationDateStr;

      if (reservation.date && reservation.date.includes('T')) {
        reservationDateStr = reservation.date.split('T')[0];
      } else if (reservation.date) {
        reservationDateStr = reservation.date;
      } else if (reservation.date_field) {
        reservationDateStr = reservation.date_field;
      } else {
        return false;
      }

      // Clean up selectedDate (in case it has time component)
      const cleanSelectedDate = selectedDate.split('T')[0];

      return reservationDateStr === cleanSelectedDate;
    });
  }, [recentReservations, selectedDate]);

  // Handle reservation status change
  const handleStatusChange = async (reservationId, newStatus) => {
    if (newStatus === 'cancelled') {
      const confirmCancel = window.confirm("Are you sure you want to cancel this reservation?");
      if (!confirmCancel) return;
    }
    const isStatusUpdated = await updateReservationStatus(reservationId, newStatus, setIsLoading, setError);
    if (!isStatusUpdated) return;
    await getReservations(lastNumHours, status, setRecentReservations, setIsLoading);
    setError(null);
  };

  // Orders
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenuItems, setSelectedMenuItems] = useState([]);
  const [orderCustomer, setOrderCustomer] = useState({
    customerName: "",
    customerEmail: "",
    reservationId: ""
  });
  const [orderStatus, setOrderStatus] = useState("pending");
  const [isMenuLoading, setIsMenuLoading] = useState(true);

  const openFormToPlaceOrder = (reservation) => {
    setOrderCustomer(
      {
        customerName: reservation.name,
        customerEmail: reservation.email,
        reservationId: reservation._id
      }
    )
    setSelectedMenuItems([]);
    setOrderStatus("pending");
    fetchMenuItems();
    setIsOrderModalOpen(true);
  }

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
    setSelectedMenuItems([]);
    setOrderCustomer({
      customerName: "",
      customerEmail: "",
      reservationId: ""
    });
  }

  const fetchMenuItems = async () => {
    await getAvailableMenuItems(setMenuItems, setIsMenuLoading);
  }

  const handleItemSelect = (item) => {
    const existingItem = selectedMenuItems.find(selectedItem => selectedItem._id === item._id);
    if (existingItem) {
      // If item already exists, remove it from the selected items
      setSelectedMenuItems(selectedMenuItems.filter(selectedItem => selectedItem._id !== item._id));
    } else {
      // If item doesn't exist, add it to the selected items
      setSelectedMenuItems([...selectedMenuItems, { ...item, quantity: 1 }]);
    }
  }

  const updateItemQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    setSelectedMenuItems(selectedMenuItems.map(item => {
      if (item._id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    }))
  }

  const totalPrice = useMemo(() => {
    return selectedMenuItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [selectedMenuItems])

  const submitOrder = async () => {
    if (selectedMenuItems.length === 0) {
      setError("Please select at least one menu item.");
      return;
    }

    // Take only menuitems id and quantity in items
    const orderData = {
      customerName: orderCustomer.customerName,
      customerEmail: orderCustomer.customerEmail,
      reservationId: orderCustomer.reservationId,
      items: selectedMenuItems.map(item => ({
        menuItemId: item._id,
        quantity: item.quantity
      })),
      totalAmount: totalPrice,
      status: orderStatus
    };

    console.log("Order Data:", orderData);

    await placeOrder(orderData, setIsMenuLoading, setError);
    closeOrderModal();
    await getAllOrders(setRecentOrders, setIsLoading);
  }

  const [isOrderInfoModalOpen, setIsOrderInfoModalOpen] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);
  const [orderInfoLoading, setOrderInfoLoading] = useState(false);
  const [orderInfoError, setOrderInfoError] = useState(null);
  const viewOrderInfo = async (orderId) => {
    await getOrderInfo(orderId, setOrderInfo, setOrderInfoLoading, orderInfoError);
  }
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);

  const handleOrderStatusUpdate = async (newStatus) => {
    if (orderInfo?.status === newStatus) return;

    setStatusUpdateLoading(true);
    await updateOrderStatus(
      orderInfo._id,
      newStatus,
      setStatusUpdateLoading,
      setOrderInfoError
    );
    setOrderInfo(prev => ({ ...prev, status: newStatus }));
    setStatusUpdateLoading(false);
    setError(null);
    await getAllOrders(setRecentOrders, setIsLoading);
  }

  return (
    <div className="relative space-y-6 p-6 max-w-7xl mx-auto">
      {isOrderInfoModalOpen && (
        <div className="w-full h-full fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Order Details</h2>
                <button
                  onClick={() => setIsOrderInfoModalOpen(false)}
                  className="cursor-pointer text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto flex-grow">
              {orderInfoLoading ? (
                <div className="flex justify-center items-center h-full">
                  <svg className="animate-spin h-10 w-10 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : (
                <>
                  {orderInfo && (
                    <>
                      <div className="mb-6 bg-green-50 p-4 rounded">
                        <h3 className="font-medium text-green-800 mb-2">Order Information</h3>
                        <p><span className="font-medium">Order ID:</span> {orderInfo._id}</p>
                        <p><span className="font-medium">Customer Name:</span> {orderInfo.customerName}</p>
                        <p><span className="font-medium">Customer Email:</span> {orderInfo.customerEmail}</p>
                        <p><span className="font-medium">Total Amount:</span> {formatEURO(orderInfo.totalAmount)}</p>
                        <p><span className="font-medium">Status:</span> {orderInfo.status}</p>
                      </div>
                      <div className="mb-6">
                        <h3 className="font-medium text-gray-800 mb-4">Order Items</h3>
                        <div className="border rounded-lg overflow-hidden">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Item
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Price
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Quantity
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Total
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {orderInfo.items.map(item => (
                                console.log(item.menuItemId),
                                <tr key={item.menuItemId._id}>
                                  <td className="px-4 py-3 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{item.menuItemId.name}</div>
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{formatEURO(item.menuItemId.price)}</div>
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{item.quantity}</div>
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{formatEURO(item.menuItemId.price * item.quantity)}</div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="mb-6">
                        <h3 className="font-medium text-gray-800 mb-4">Order Status</h3>
                        <div className="flex items-center space-x-4">
                          <p className="text-sm text-gray-500">Current Status:
                            <span className={`ml-2 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
        ${orderInfo.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {orderInfo.status.charAt(0).toUpperCase() + orderInfo.status.slice(1)}
                            </span>
                          </p>

                          <div className="ml-auto flex items-center space-x-2">
                            <button
                              onClick={() => handleOrderStatusUpdate('paid')}
                              disabled={orderInfo.status === 'paid' || statusUpdateLoading}
                              className={`px-3 py-1 text-sm rounded transition-colors ${orderInfo.status === 'paid'
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-green-600 text-white hover:bg-green-700'
                                }`}
                            >
                              {statusUpdateLoading && orderInfo.status !== 'paid' ? (
                                <span className="flex items-center">
                                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Updating...
                                </span>
                              ) : "Mark as Paid"}
                            </button>
                            <button
                              onClick={() => handleOrderStatusUpdate('pending')}
                              disabled={orderInfo.status === 'pending' || statusUpdateLoading}
                              className={`px-3 py-1 text-sm rounded transition-colors ${orderInfo.status === 'pending'
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-yellow-500 text-white hover:bg-yellow-600'
                                }`}
                            >
                              {statusUpdateLoading && orderInfo.status !== 'pending' ? (
                                <span className="flex items-center">
                                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Updating...
                                </span>
                              ) : "Mark as Pending"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setIsOrderInfoModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isOrderModalOpen && (
        <div className="w-full h-full fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Place Order for {orderCustomer.customerName}</h2>
                <button
                  onClick={closeOrderModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto flex-grow">
              {isMenuLoading ? (
                <div className="flex justify-center items-center h-full">
                  <svg className="animate-spin h-10 w-10 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : (
                <>
                  <div className="mb-6 bg-amber-50 p-4 rounded">
                    <h3 className="font-medium text-amber-800 mb-2">Customer Information</h3>
                    <p><span className="font-medium">Name:</span> {orderCustomer.customerName}</p>
                    <p><span className="font-medium">Email:</span> {orderCustomer.customerEmail}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-medium text-gray-800 mb-4">Select Menu Items</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {menuItems.map(item => (
                        <div
                          key={item._id}
                          className={`border rounded p-3 cursor-pointer transition-colors ${selectedMenuItems.some(i => i._id === item._id)
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-gray-200 hover:border-amber-300'
                            }`}
                          onClick={() => handleItemSelect(item)}
                        >
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded object-cover"
                                src={item.image}
                                alt={item.name}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "https://via.placeholder.com/40?text=No+Image";
                                }}
                              />
                            </div>
                            <div className="ml-3 flex-1">
                              <p className="text-sm font-medium text-gray-900">{item.name}</p>
                              <p className="text-xs text-gray-500">{item.category}</p>
                            </div>
                            <div className="text-sm font-medium text-amber-600">
                              {formatEURO(item.price)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {selectedMenuItems.length > 0 && (
                      <div className="border rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Item
                              </th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                              </th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Quantity
                              </th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total
                              </th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Remove
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {selectedMenuItems.map(item => (
                              <tr key={item._id}>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <div className="text-sm text-gray-500">{formatEURO(item.price)}</div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <button
                                      onClick={() => updateItemQuantity(item._id, item.quantity - 1)}
                                      className="p-1 text-gray-500 hover:text-gray-700"
                                    >
                                      -
                                    </button>
                                    <input
                                      type="number"
                                      min="1"
                                      value={item.quantity}
                                      onChange={(e) => updateItemQuantity(item._id, parseInt(e.target.value) || 1)}
                                      className="w-12 text-center border-none"
                                    />
                                    <button
                                      onClick={() => updateItemQuantity(item._id, item.quantity + 1)}
                                      className="p-1 text-gray-500 hover:text-gray-700"
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">
                                    {formatEURO(item.price * item.quantity)}
                                  </div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <button
                                    onClick={() => handleItemSelect(item)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                </td>
                              </tr>
                            ))}
                            <tr className="bg-amber-50">
                              <td colSpan="3" className="px-4 py-3 text-right font-medium">
                                Total:
                              </td>
                              <td colSpan="2" className="px-4 py-3 font-bold text-amber-800">
                                {formatEURO(totalPrice)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-800 mb-2">Order Status</h3>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio text-amber-600"
                          name="orderStatus"
                          value="paid"
                          checked={orderStatus === "paid"}
                          onChange={() => setOrderStatus("paid")}
                        />
                        <span className="ml-2">Paid</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio text-amber-600"
                          name="orderStatus"
                          value="pending"
                          checked={orderStatus === "pending"}
                          onChange={() => setOrderStatus("pending")}
                        />
                        <span className="ml-2">Pending Payment</span>
                      </label>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={closeOrderModal}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={submitOrder}
                disabled={selectedMenuItems.length === 0 || isMenuLoading}
                className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 disabled:opacity-50"
              >
                Submit Order
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg className="fill-current h-6 w-6 text-red-500" role="button" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" onClick={() => setError(null)}>
              <title>Close</title>
              <path d="M10 9l-5 5m0-5l5 5m0-5l5-5m-5 5l5 5m-5-5l-5 5" />
            </svg>
          </span>
        </div>
      )}
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

      {/* Recent Reservations with Time Filter */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h2 className="text-lg font-medium text-gray-800">Recent Reservations Within</h2>
          <div className="mt-3 md:mt-0 flex flex-wrap gap-2">
            <button
              onClick={() => setLastNumHours(24)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${lastNumHours === 24
                ? 'bg-amber-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              24 hours
            </button>
            <button
              onClick={() => setLastNumHours(48)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${lastNumHours === 48
                ? 'bg-amber-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              48 hours
            </button>
            <button
              onClick={() => setLastNumHours(168)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${lastNumHours === 168
                ? 'bg-amber-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              1 week
            </button>
            <button
              onClick={() => setLastNumHours(720)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${lastNumHours === 720
                ? 'bg-amber-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              1 month
            </button>
            <button
              onClick={() => setLastNumHours(4320)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${lastNumHours === 4320
                ? 'bg-amber-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              6 month
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h2 className="text-lg font-medium text-gray-800">Recent Reservations Status</h2>
          <div className="mt-3 md:mt-0 flex flex-wrap gap-2">
            <button
              onClick={() => setStatus('confirmed')}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${status === 'confirmed'
                ? 'bg-amber-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              Confirmed
            </button>
            <button
              onClick={() => setStatus('pending')}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${status === 'pending'
                ? 'bg-amber-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              Pending
            </button>
            <button
              onClick={() => setStatus('cancelled')}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${status === 'cancelled'
                ? 'bg-amber-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              Cancelled
            </button>
          </div>
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
              {reservationDates.length > 0 ? (
                reservationDates.map(date => (
                  <option key={date} value={date}>
                    {new Date(date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </option>
                ))
              ) : (
                <option value="">No dates available</option>
              )}
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
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Place Order
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReservations.map((reservation) => (
                  <tr key={reservation._id} className="hover:bg-gray-50">
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
                            onClick={() => handleStatusChange(reservation._id, 'confirmed')}
                            className="cursor-pointer text-green-600 hover:text-green-900"
                          >
                            Confirm
                          </button>
                        )}
                        {reservation.status === 'confirmed' && (
                          <button
                            onClick={() => handleStatusChange(reservation._id, 'cancelled')}
                            className="cursor-pointer text-red-600 hover:text-red-900"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button disabled={reservation.status === 'pending' || reservation.status === 'cancelled'} onClick={() => openFormToPlaceOrder(reservation)} className="cursor-pointer  text-xs underline italic disabled:text-gray-400">{reservation.status === 'confirmed' ? "Place order" : "Not confirmed Reservation"}</button>
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
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">#{order._id.substring(0, 6)}...</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.customerName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{formatEURO(order.totalAmount)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(order.updatedAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'paid' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                      }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => {
                      viewOrderInfo(order._id);
                      setIsOrderInfoModalOpen(true);
                    }} className="cursor-pointer text-amber-600 hover:text-amber-900">View</button>
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