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
  const [showImagePreview, setShowImagePreview] = useState(false);

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
    setShowImagePreview(false);
  };

  const handleEdit = (banner) => {
    setFormData(banner);
    setEditMode(true);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      setBanners(banners.filter(banner => banner.id !== id));
    }
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
    setShowImagePreview(false);
  };

  const toggleActive = (id) => {
    setBanners(banners.map(banner => 
      banner.id === id ? { ...banner, active: !banner.active } : banner
    ));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Banner Management</h1>
        <p className="text-sm text-gray-500">
          {banners.length} total banners | {banners.filter(b => b.active).length} active
        </p>
      </div>
      
      {/* Add/Edit Banner Form */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4 text-gray-800">
          {editMode ? "Edit Banner" : "Add New Banner"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Banner Image URL*</label>
              <div className="flex">
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                  placeholder="https://example.com/image.jpg"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50"
                />
                {formData.image && (
                  <button
                    type="button"
                    onClick={() => setShowImagePreview(!showImagePreview)}
                    className="ml-2 mt-1 px-3 py-1 bg-amber-100 text-amber-700 rounded hover:bg-amber-200 transition"
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
                    className="h-40 w-full object-cover rounded-md border border-gray-300"
                  />
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Enter banner title"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Active Status</label>
              <div className="flex items-center mt-2">
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    name="active"
                    id="active"
                    checked={formData.active}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <label
                    htmlFor="active"
                    className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                      formData.active ? "bg-amber-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`dot block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                        formData.active ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </label>
                </div>
                <span className="text-sm text-gray-700">
                  {formData.active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                placeholder="Enter banner description"
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-2">
            {(editMode || formData.title || formData.image || formData.description) && (
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition"
            >
              {editMode ? "Update Banner" : "Add Banner"}
            </button>
          </div>
        </form>
      </div>

      {/* Banner List */}
      <div className="grid grid-cols-1 gap-6">
        {banners.length > 0 ? (
          banners.map((banner) => (
            <div key={banner.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="relative">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-0 right-0 m-4">
                  <span 
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      banner.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {banner.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{banner.title}</h3>
                <p className="text-gray-600 mb-4">{banner.description}</p>
                
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => toggleActive(banner.id)}
                    className={`px-4 py-2 rounded transition ${
                      banner.active 
                        ? 'bg-green-50 text-green-600 hover:bg-green-100' 
                        : 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                    }`}
                  >
                    {banner.active ? "Deactivate" : "Activate"}
                  </button>
                  
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEdit(banner)}
                      className="px-4 py-2 bg-amber-50 text-amber-600 rounded hover:bg-amber-100 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(banner.id)}
                      className="px-4 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No banners</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new banner.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBanners;