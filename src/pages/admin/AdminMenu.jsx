import React, { useState } from "react";

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Signature Pasta",
      description: "Homemade pasta with our special sauce",
      price: 15.99,
      category: "Main Course",
      image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&auto=format&fit=crop",
      featured: true
    },
    {
      id: 2,
      name: "Grilled Salmon",
      description: "Fresh salmon with seasonal vegetables",
      price: 22.99,
      category: "Main Course",
      image: "https://images.unsplash.com/photo-1485704686097-ed47f7263ca4?w=500&auto=format&fit=crop",
      featured: true
    },
    {
      id: 3,
      name: "Classic Burger",
      description: "Juicy beef patty with all the fixings",
      price: 13.99,
      category: "Main Course",
      image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=500&auto=format&fit=crop",
      featured: true
    },
    {
      id: 4,
      name: "Chocolate Dessert",
      description: "Rich chocolate cake with vanilla ice cream",
      price: 8.99,
      category: "Dessert",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop",
      featured: true
    },
    {
      id: 5,
      name: "Caesar Salad",
      description: "Fresh romaine lettuce with our homemade dressing",
      price: 9.99,
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
        item.id === formData.id ? {...formData, price: parseFloat(formData.price)} : item
      ));
    } else {
      // Add new item
      setMenuItems([...menuItems, {
        ...formData,
        id: Date.now(),
        price: parseFloat(formData.price)
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
  };

  const handleDelete = (id) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Menu Management</h1>
      
      {/* Add/Edit Menu Item Form */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">{editMode ? "Edit Menu Item" : "Add New Menu Item"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Item Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              >
                <option value="Starter">Starter</option>
                <option value="Main Course">Main Course</option>
                <option value="Dessert">Dessert</option>
                <option value="Beverage">Beverage</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Featured Item
              </label>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
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
              className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {editMode ? "Update Item" : "Add Item"}
            </button>
          </div>
        </form>
      </div>
      
      {/* Menu Items List */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Current Menu Items</h2>
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
              {menuItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full object-cover" src={item.image} alt={item.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.description.substring(0, 40)}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{item.price.toFixed(2)}
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
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
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
      </div>
    </div>
  );
};

export default AdminMenu;