import React, { useState, useEffect } from "react";
import { formatEURO } from "../utils/formatEURO";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [animatedItems, setAnimatedItems] = useState([]);
  
  const categories = [
    { id: "all", name: "All Items", icon: "🍽️" },
    { id: "starters", name: "Starters", icon: "🥗" },
    { id: "main", name: "Main Course", icon: "🍲" },
    { id: "desserts", name: "Desserts", icon: "🍰" },
    { id: "drinks", name: "Drinks", icon: "🍹" }
  ];
  
  // Filter items by selected category
  const filteredItems = activeCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);
  
  // Animation effect when changing categories
  useEffect(() => {
    setIsLoading(true);
    setAnimatedItems([]);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      const delay = 100;
      
      filteredItems.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedItems(prev => [...prev, index]);
        }, index * delay);
      });
    }, 300);
    
    return () => clearTimeout(timer);
  }, [activeCategory]);
  
  // Function to render dietary indicators
  const renderDietaryIcons = (dietary) => {
    if (!dietary || dietary.length === 0) return null;
    
    return (
      <div className="flex gap-1 mt-1">
        {dietary.includes("vegetarian") && (
          <span title="Vegetarian" className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
            Veg
          </span>
        )}
        {dietary.includes("gluten-free") && (
          <span title="Gluten Free" className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
            GF
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="bg-amber-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-800 to-amber-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Menu</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Experience our carefully crafted dishes prepared with the freshest ingredients.
            Each item is made with passion by our talented chefs.
          </p>
        </div>
      </div>
      
      {/* Category Navigation */}
      <div className="sticky top-0 bg-white shadow-md z-10 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center ${
                  activeCategory === category.id 
                    ? 'bg-amber-600 text-white shadow-md scale-105' 
                    : 'bg-white text-amber-800 hover:bg-amber-100 border border-amber-200'
                }`}
              >
                <span className="mr-1">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Menu Items */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-amber-800 mb-8 text-center">
              {categories.find(c => c.id === activeCategory)?.name}
              <span className="ml-2">{categories.find(c => c.id === activeCategory)?.icon}</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform ${
                    animatedItems.includes(index) 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-4 opacity-0'
                  }`}
                >
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-60 object-cover"
                    />
                    {item.featured && (
                      <div className="absolute top-3 right-3 bg-amber-500 text-white px-2 py-1 rounded-lg text-sm font-bold">
                        Chef's Choice
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-amber-900">{item.name}</h3>
                      <span className="text-amber-700 font-bold text-lg">{formatEURO(item.price)}</span>
                    </div>
                    
                    {renderDietaryIcons(item.dietary)}
                    
                    <p className="text-gray-600 my-4">{item.description}</p>
                    
                    <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                      Add to Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredItems.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-gray-500">No items found in this category.</p>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Additional Info */}
      <div className="bg-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">Enjoy Our Culinary Experience</h2>
          <p className="text-gray-600 mb-6">
            All dishes are prepared fresh to order. Please inform your server of any dietary restrictions or allergies.
            A 5% service charge will be added to parties of 6 or more.
          </p>
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Reserve a Table
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;