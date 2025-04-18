import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatEURO } from "../utils/formatEURO";

const sampleBanners = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
    title: "Welcome to Our Restaurant",
    description: "Experience the finest dining in town"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
    title: "Try Our Special Menu",
    description: "Handcrafted dishes made with premium ingredients"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1502301103665-0b95cc738daf?q=80&w=1200&auto=format&fit=crop",
    title: "Book Your Table",
    description: "Reserve your spot for a memorable dining experience"
  }
]

const sampletFeaturedItems = [
  {
    id: 1,
    name: "Signature Pasta",
    description: "Homemade pasta with our special sauce",
    price: 1320, // Price in INR
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Grilled Salmon",
    description: "Fresh salmon with seasonal vegetables",
    price: 1899, // Price in INR
    image: "https://images.unsplash.com/photo-1485704686097-ed47f7263ca4?w=500&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Classic Burger",
    description: "Juicy beef patty with all the fixings",
    price: 1150, // Price in INR
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=500&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Chocolate Dessert",
    description: "Rich chocolate cake with vanilla ice cream",
    price: 750, // Price in INR
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop"
  }
]

const Home = () => {
  const [banners, setBanners] = useState(sampleBanners);

  const [featuredItems, setFeaturedItems] = useState(sampletFeaturedItems);

  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);


  useEffect(() => {
    
  })
  
  return (
    <div className="space-y-12">
      {/* Banner Carousel */}
      <div className="relative h-[500px] overflow-hidden rounded-xl">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 
            ${index === currentBanner ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white p-5">
                <h2 className="text-4xl font-bold mb-4">{banner.title}</h2>
                <p className="text-xl">{banner.description}</p>
                <Link to="/reserve">
                  <button className="mt-6 bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 px-6 rounded-full text-lg transition-colors">
                    Reserve a Table
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        <div className="absolute bottom-5 left-0 right-0 flex justify-center">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`h-3 w-3 mx-1 rounded-full ${
                index === currentBanner ? "bg-white" : "bg-white bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Welcome Section */}
      <section className="bg-amber-50 p-8 rounded-lg shadow-sm">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Welcome to Our Restaurant</h2>
          <p className="text-gray-700 mb-6">
            We provide an authentic dining experience with recipes that have been perfected over generations.
            Our chefs use only the freshest ingredients to create memorable meals for our guests.
          </p>
          <Link to="/menu">
            <button className="bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 px-6 rounded-md transition-colors">
              Explore Our Menu
            </button>
          </Link>
        </div>
      </section>

      {/* Featured Items */}
      <section>
        <h2 className="text-3xl font-bold text-amber-900 mb-8 text-center">Featured Menu Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg text-amber-900">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-amber-700">{formatEURO(item.price)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/menu">
            <button className="bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 px-6 rounded-md transition-colors">
              View Full Menu
            </button>
          </Link>
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="bg-amber-700 text-white p-12 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Make a Reservation</h2>
        <p className="text-xl mb-8">Book your table now for a delightful dining experience</p>
        <Link to="/reserve">
          <button className="bg-white text-amber-800 hover:bg-amber-100 font-bold py-3 px-8 rounded-full text-lg transition-colors">
            Reserve Now
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Home;