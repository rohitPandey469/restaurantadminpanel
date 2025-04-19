import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatEURO } from "../utils/formatEURO";
import { getFeaturedItems } from "../service/menu";
import { getActiveBanners } from "../service/banners";

const Home = () => {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    if (banners.length === 0) return;
    const interval = setInterval(() => {
      setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);


  useEffect(() => {
    const fetchFeaturedItems = async () => {
      await getFeaturedItems(setFeaturedItems, setIsLoading);
    }
    fetchFeaturedItems();
    return () => {
      setFeaturedItems([]);
    }
  }, [])

  useEffect(() => {
    const fetchBanners = async () => {
      await getActiveBanners(setBanners, setIsLoading);
    }
    fetchBanners();
    return () => {
      setBanners([]);
    }
  }, [])

  return (
    <div className="space-y-12">
      {/* Banner Carousel with Loading State */}
      <div className="relative h-[500px] overflow-hidden rounded-xl">
        {isLoading ? (
          // Skeleton loader for banner carousel
          <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        ) : banners.length > 0 ? (
          <>
            {banners.map((banner, index) => (
              <div
                key={banner._id}
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 bg-transparent
    ${index === currentBanner ? "opacity-100" : "opacity-0"}`}
              >
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full absolute left-0 top-0 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop"; // Fallback image
                  }}
                />
                <div className="absolute inset-0 bg-transparent flex items-center justify-center">
                  <div className="text-center text-white p-5">
                    <h2 className="text-4xl font-bold mb-4">{banner.title}</h2>
                    <p className="text-xl">{banner.description}</p>
                    <Link to="/reserve">
                      <button className="cursor-pointer mt-6 bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 px-6 rounded-full text-lg transition-colors">
                        Reserve a Table
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* Dots navigation for banners */}
            <div className="absolute bottom-5 left-0 right-0 flex justify-center">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBanner(index)}
                  className={`h-3 w-3 mx-1 rounded-full ${index === currentBanner ? "bg-white" : "bg-white bg-opacity-50"
                    }`}
                />
              ))}
            </div>
          </>
        ) : (
          // Empty state for banners
          <div className="w-full h-full bg-amber-50 flex items-center justify-center">
            <div className="text-center p-5">
              <h2 className="text-2xl font-bold text-amber-900">Welcome to Our Restaurant</h2>
              <p className="text-lg text-gray-600 mt-2">Discover our exquisite menu and dining experience</p>
              <Link to="/menu">
                <button className="mt-6 bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 px-6 rounded-full transition-colors">
                  Browse Menu
                </button>
              </Link>
            </div>
          </div>
        )}
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
            <button className="cursor-pointer bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 px-6 rounded-md transition-colors">
              Explore Our Menu
            </button>
          </Link>
        </div>
      </section>

      {/* Featured Items with Loading State */}
      <section>
        <h2 className="text-3xl font-bold text-amber-900 mb-8 text-center">Featured Menu Items</h2>

        {isLoading ? (
          // Skeleton loaders for featured items
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-4 space-y-2">
                  <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : featuredItems.length > 0 ? (
          // Render featured items when available
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map(item => (
              <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
        ) : (
          // Empty state for featured items
          <div className="text-center p-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No featured items available at the moment.</p>
          </div>
        )}

        <div className="text-center mt-8">
          <Link to="/menu">
            <button className="cursor-pointer bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 px-6 rounded-md transition-colors">
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
          <button className="cursor-pointer bg-white text-amber-800 hover:bg-amber-100 font-bold py-3 px-8 rounded-full text-lg transition-colors">
            Reserve Now
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Home;