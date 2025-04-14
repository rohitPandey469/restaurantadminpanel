import React, { useState } from "react";

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Signature Pasta",
      description: "Homemade pasta with our special sauce",
      price: 1320, // Prices in INR
      category: "Main Course",
      image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&auto=format&fit=crop",
      featured: true
    },
    {
      id: 2,
      name: "Grilled Salmon",
      description: "Fresh salmon with seasonal vegetables",
      price: 1899,
      category: "Main Course",
      image: "https://images.unsplash.com/photo-1485704686097-ed47f7263ca4?w=500&auto=format&fit=crop",
      featured: true
    },
    {
      id: 3,
      name: "Classic Burger",
      description: "Juicy beef patty with all the fixings",
      price: 1150,
      category: "Main Course",
      image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=500&auto=format&fit=crop",
      featured: true
    },
    {
      id: 4,
      name: "Chocolate Dessert",
      description: "Rich chocolate cake with vanilla ice cream",
      price: 750,
      category: "Dessert",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop",
      featured: true
    },
    {
      id: 5,
      name: "Caesar Salad",
      description: "Fresh romaine lettuce with our homemade dressing",
      price: 830,
      category: "Starter",
      image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=500&auto=format&fit=crop",
      featured: false
    }
  ]);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    category: "Main Course",
    image: "",
    featured: false
  });

  const [editMode, setEditMode] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showImagePreview, setShowImagePreview] = useState(false);

  // Format price in INR
  const formatINR = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editMode) {
      // Update existing item
      setMenuItems(menuItems.map(item => 
        item.id === formData.id ? {...formData, price: parseInt(formData.price)} : item
      ));
    } else {
      // Add new item
      setMenuItems([...menuItems, {
        ...formData,
        id: Date.now(),
        price: parseInt(formData.price)
      }]);
    }
    
    // Reset form
    setFormData({
      id: null,
      name: "",
      description: "",
      price: "",
      category: "Main Course",
      image: "",
      featured: false
    });
    setEditMode(false);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditMode(true);
    // Scroll to the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      setMenuItems(menuItems.filter(item => item.id !== id));
    }
  };

  const handleCancel = () => {
    setFormData({
      id: null,
      name: "",
      description: "",
      price: "",
      category: "Main Course",
      image: "",
      featured: false
    });
    setEditMode(false);
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

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Menu Management</h1>
        <p className="text-sm text-gray-500">
          {menuItems.length} items in menu | {menuItems.filter(item => item.featured).length} featured
        </p>
      </div>
      
      {/* Add/Edit Menu Item Form */}
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50"
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
                placeholder="Enter price in INR"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Category*</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50"
              >
                <option value="Starter">Starter</option>
                <option value="Main Course">Main Course</option>
                <option value="Dessert">Dessert</option>
                <option value="Beverage">Beverage</option>
                <option value="Special">Special</option>
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50"
                />
                {formData.image && (
                  <button 
                    type="button"
                    onClick={() => setShowImagePreview(!showImagePreview)} 
                    className="ml-2 mt-1 px-2 py-1 bg-amber-100 text-amber-700 rounded hover:bg-amber-200"
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Featured Item
              </label>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-2">
            {editMode && (
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
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
                className="focus:ring-amber-500 focus:border-amber-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
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
              className="block w-full sm:w-auto rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        
        {filteredItems.length > 0 ? (
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
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <img className="h-12 w-12 rounded object-cover" src={item.image} alt={item.name} />
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
                      {formatINR(item.price)}
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
                        className="text-amber-600 hover:text-amber-900 mr-3"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-900"
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