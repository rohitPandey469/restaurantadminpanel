import React, { useState } from "react";

const AdminBanners = () => {
  const [banners, setBanners] = useState([
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
      title: "Welcome to Our Restaurant",
      description: "Experience the finest dining in town",
      active: true
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
      title: "Try Our Special Menu",
      description: "Handcrafted dishes made with premium ingredients",
      active: true
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1502301103665-0b95cc738daf?q=80&w=1200&auto=format&fit=crop",
      title: "Book Your Table",
      description: "Reserve your spot for a memorable dining experience",
      active: true
    }
  ]);

  const [formData, setFormData] = useState({
    id: null,
    image: "",
    title: "",
    description: "",
    active: true
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
      // Update existing banner
      setBanners(banners.map(banner => 
        banner.id === formData.id ? formData : banner
      ));
    } else {
      // Add new banner
      setBanners([...banners, {
        ...formData,
        id: Date.now()
      }]);
    }
    
    // Reset form
    setFormData({
      id: null,
      image: "",
      title: "",
      description: "",
      active: true
    });
    setEditMode(false);
  };

  const handleEdit = (banner) => {
    setFormData(banner);
    setEditMode(true);
  };

  const handleDelete = (id) => {
    setBanners(banners.filter(banner => banner.id !== id));
  };

  const handleCancel = () => {
    setFormData({
      id: null,
      image: "",
      title: "",
      description: "",
      active: true
    });
    setEditMode(false);
  };

  const toggleActive = (id) => {
    setBanners(banners.map(banner => 
      banner.id === id ? { ...banner, active: !banner.active } : banner
    ));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Banner Management</h1>
      
      {/* Add/Edit Banner Form */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">{editMode ? "Edit Banner" : "Add New Banner"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
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
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleInputChange}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">Active</label>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md"
            >
              {editMode ? "Update Banner" : "Add Banner"}
            </button>
          </div>
        </form>
      </div>

      {/* Banner List */}
      <div className="space-y-4">
        {banners.map((banner) => (
          <div key={banner.id} className="bg-white shadow rounded-lg p-6">
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-medium">{banner.title}</h3>
            <p className="text-gray-700">{banner.description}</p>
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => toggleActive(banner.id)}
                className={`px-4 py-2 rounded-md ${
                  banner.active ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                {banner.active ? "Active" : "Inactive"}
              </button>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(banner)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(banner.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBanners;