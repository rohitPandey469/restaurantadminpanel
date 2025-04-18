import React, { useEffect, useState } from "react";
import { addMenuItem, getMenuItems, updateMenuItem, deleteMenuItem } from "../../service/menu";
import { formatEURO } from "../../utils/formatEURO";

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "main",
    image: "",
    featured: false
  });

  const [editMode, setEditMode] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showImagePreview, setShowImagePreview] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    
    try {
      if (editMode) {
        await updateMenuItem(formData._id, formData, setMessage, setError);
      } else {
        await addMenuItem(formData, setMessage, setError);
      }
      
      await getMenuItems(setMenuItems, setIsLoading);
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "Main Course",
        image: "",
        featured: false
      });
      setEditMode(false);
    } catch (err) {
      setError(err.message || "An error occurred while saving the menu item");
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditMode(true);
    setError(null);
    setMessage(null);
    // Scroll to the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      setError(null);
      setMessage(null);
      try {
        await deleteMenuItem(id, setMessage, setError);
        await getMenuItems(setMenuItems, setIsLoading);
      } catch (err) {
        setError(err.message || "Failed to delete menu item");
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "Main Course",
      image: "",
      featured: false
    });
    setEditMode(false);
    setError(null);
    setMessage(null);
  };

  // Get all unique categories for filter
  const categories = ["All", ...new Set(menuItems.map(item => item.category))];

  // Filter and search menu items
  const filteredItems = menuItems
    .filter(item => filterCategory === "All" || item.category === filterCategory)
    .filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        await getMenuItems(setMenuItems, setIsLoading);
      } catch (err) {
        setError("Failed to load menu items");
        setIsLoading(false);
      }
    }
    fetchMenuItems();
    return () => {
      setMenuItems([]);
    };
  },[]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Menu Management</h1>
        <p className="text-sm text-gray-500">
          {menuItems.length} items in menu | {menuItems.filter(item => item.featured).length} featured
        </p>
      </div>
      
      {message && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{message}</span>
          <button 
            type="button" 
            className="cursor-pointer absolute top-0 right-0 p-2 focus:outline-none"
            onClick={() => setMessage(null)}
          >
            <span className="text-xl">&times;</span>
          </button>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
          <button 
            type="button" 
            className="cursor-pointer absolute top-0 right-0 p-2 focus:outline-none"
            onClick={() => setError(null)}
          >
            <span className="text-xl">&times;</span>
          </button>
        </div>
      )}
      
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">
          {editMode ? "Edit Menu Item" : "Add New Menu Item"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Item Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Price (€)*</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                placeholder="Enter price in EUR"
                className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Category*</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50"
              >
                <option value="starters">Starter</option>
                <option value="main">Main Course</option>
                <option value="desserts">Dessert</option>
                <option value="drinks">Beverage</option>
                <option value="sides">Special</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL*</label>
              <div className="flex">
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                  className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50"
                />
                {formData.image && (
                  <button 
                    type="button"
                    onClick={() => setShowImagePreview(!showImagePreview)} 
                    className="cursor-pointer ml-2 mt-1 px-2 py-1 bg-amber-100 text-amber-700 rounded hover:bg-amber-200"
                  >
                    {showImagePreview ? "Hide" : "Preview"}
                  </button>
                )}
              </div>
              {showImagePreview && formData.image && (
                <div className="mt-2">
                  <img 
                    src={formData.image} 
                    alt="Preview" 
                    className="h-24 w-24 object-cover rounded border border-gray-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/150?text=Image+Error";
                      setError("Failed to load image preview. Please check the URL.");
                    }}
                  />
                </div>
              )}
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description*</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={3}
                className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                Featured Item | Chef's Choice
              </label>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-2">
            {editMode && (
              <button
                type="button"
                onClick={handleCancel}
                className="cursor-pointer bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="cursor-pointer bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
            >
              {editMode ? "Update Item" : "Add Item"}
            </button>
          </div>
        </form>
      </div>
      
      {/* Menu Items List */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
          <h2 className="text-lg font-medium">Current Menu Items</h2>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search menu items..."
                className="p-2 focus:ring-amber-500 focus:border-amber-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="p-2 block w-full sm:w-auto rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        
        {isLoading ? (
          <div className="py-12 text-center">
            <svg className="animate-spin h-10 w-10 mx-auto text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-3 text-amber-800">Loading menu items...</p>
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <img 
                            className="h-12 w-12 rounded object-cover" 
                            src={item.image} 
                            alt={item.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://via.placeholder.com/150?text=No+Image";
                            }} 
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.description.length > 40 ? `${item.description.substring(0, 40)}...` : item.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatEURO(item.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.featured 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {item.featured ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="cursor-pointer text-amber-600 hover:text-amber-900 mr-3"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(item._id)}
                        className="cursor-pointer text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No menu items found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery ? `No results for "${searchQuery}"` : 'Try adding some menu items'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMenu;