import React, { useState } from "react";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const categories = [
    { id: "all", name: "All Items" },
    { id: "starters", name: "Starters" },
    { id: "main", name: "Main Course" },
    { id: "desserts", name: "Desserts" },
    { id: "drinks", name: "Drinks" }
  ];
  
  const menuItems = [
    {
      id: 1,
      name: "Bruschetta",
      description: "Toasted bread topped with tomatoes, garlic, and fresh basil",
      price: 8.99,
      category: "starters",
      image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=500"
    },
    {
      id: 2,
      name: "Garlic Shrimp",
      description: "Sautéed shrimp with garlic, butter, and white wine",
      price: 12.99,
      category: "starters",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500"
    },
    {
      id: 3,
      name: "Grilled Salmon",
      description: "Fresh salmon fillet with lemon herb sauce and seasonal vegetables",
      price: 24.99,
      category: "main",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500"
    },
    {
      id: 4,
      name: "Beef Tenderloin",
      description: "Perfectly cooked beef with red wine reduction and mashed potatoes",
      price: 29.99,
      category: "main",
      image: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=500"
    },
    {
      id: 5,
      name: "Mushroom Risotto",
      description: "Creamy arborio rice with wild mushrooms and parmesan",
      price: 18.99,
      category: "main",
      image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500"
    },
    {
      id: 6,
      name: "Tiramisu",
      description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone",
      price: 9.99,
      category: "desserts",
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500"
    },
    {
      id: 7,
      name: "Chocolate Lava Cake",
      description: "Warm chocolate cake with a molten center, served with vanilla ice cream",
      price: 10.99,
      category: "desserts",
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500"
    },
    {
      id: 8,
      name: "Craft Beer",
      description: "Selection of local craft beers",
      price: 7.99,
      category: "drinks",
      image: "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?w=500"
    },
    {
      id: 9,
      name: "Wine Selection",
      description: "Fine selection of red and white wines",
      price: 9.99,
      category: "drinks",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500"
    }
  ];
  
  const filteredItems = activeCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);
  
  return (
    <div>
      <div className="bg-dark text-white py-16 px-4 mb-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Our Menu</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Experience our carefully crafted dishes prepared with the freshest ingredients.
            From delightful starters to mouthwatering main courses and divine desserts.
          </p>
        </div>
      </div>
      
      {/* Category Navigation */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                activeCategory === category.id 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Menu Items */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-60 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <span className="text-primary font-semibold">${item.price.toFixed(2)}</span>
                </div>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <button className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded font-medium transition">
                  Add to Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;