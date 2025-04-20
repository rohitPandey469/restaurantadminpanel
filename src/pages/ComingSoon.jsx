import React, { useState, useEffect } from "react";
import { formatEURO } from "../utils/formatEURO"; 
import { getComingSoonMenuItems } from "../service/menu";
import { renderDietaryIcons } from "../utils/renderDietaryIcons";

const ComingSoon = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  // Add states for coming soon menu items
  const [comingSoonMenuItems, setComingSoonMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set the launch date
  const launchDate = new Date("2025-05-15T00:00:00");

  // Calculate time remaining
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = launchDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchComingSoonItems = async () => {
    await getComingSoonMenuItems(setComingSoonMenuItems, setIsLoading, setError);
  };

  useEffect(() => {
    fetchComingSoonItems();
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      setSubmitMessage({ type: "error", text: "Please enter your email address" });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage({ type: "", text: "" });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you'd make an actual API call here
      
      setSubmitMessage({ 
        type: "success", 
        text: "Thank you! We'll notify you when we launch." 
      });
      setEmail("");
    } catch (err) {
      setSubmitMessage({ 
        type: "error", 
        text: "Something went wrong. Please try again." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-grow flex flex-col justify-center items-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Coming Soon
        </h1>
        
        <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto">
          We're working on something exciting! Our new features will be available soon.
          Stay tuned for an enhanced dining experience.
        </p>

        {/* Countdown timer */}
        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4">
          <div className="bg-white rounded-lg shadow-md px-5 py-6">
            <span className="text-4xl font-bold text-amber-600">{timeRemaining.days}</span>
            <p className="text-gray-500 text-sm">Days</p>
          </div>
          <div className="bg-white rounded-lg shadow-md px-5 py-6">
            <span className="text-4xl font-bold text-amber-600">{timeRemaining.hours}</span>
            <p className="text-gray-500 text-sm">Hours</p>
          </div>
          <div className="bg-white rounded-lg shadow-md px-5 py-6">
            <span className="text-4xl font-bold text-amber-600">{timeRemaining.minutes}</span>
            <p className="text-gray-500 text-sm">Minutes</p>
          </div>
          <div className="bg-white rounded-lg shadow-md px-5 py-6">
            <span className="text-4xl font-bold text-amber-600">{timeRemaining.seconds}</span>
            <p className="text-gray-500 text-sm">Seconds</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-10 max-w-md mx-auto">
          <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
              style={{ width: '65%' }}
            ></div>
          </div>
          <p className="mt-2 text-sm text-gray-500">Development Progress: 65% Complete</p>
        </div>

        {/* Notification form */}
        <div className="mt-12 sm:max-w-lg sm:mx-auto sm:px-6">
          <form onSubmit={handleSubscribe} className="sm:flex">
            <div className="flex-1 min-w-0">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                className="block w-full border border-gray-300 rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <button
                type="submit"
                className="block w-full rounded-md border border-transparent bg-amber-600 px-5 py-3 text-base font-medium text-white shadow hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 sm:px-10 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Notify Me"}
              </button>
            </div>
          </form>
          
          {submitMessage.text && (
            <div className={`mt-3 text-sm ${submitMessage.type === "error" ? "text-red-600" : "text-green-600"}`}>
              {submitMessage.text}
            </div>
          )}
          
          <p className="mt-3 text-sm text-gray-500">
            We'll notify you when we launch. No spam, we promise!
          </p>
        </div>

        {/* Coming Soon Menu Items */}
        <div className="w-full mt-16">
          <h2 className="text-2xl font-bold text-gray-900">New Dishes Coming to Our Menu</h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Our chefs are preparing some exciting new flavors! Watch the countdown to see them revealed.
          </p>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <svg className="animate-spin h-12 w-12 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500">{error}</p>
              <button 
                onClick={fetchComingSoonItems}
                className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
              >
                Try Again
              </button>
            </div>
          ) : comingSoonMenuItems.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No coming soon items available right now.</p>
            </div>
          ) : (
            <div className="w-full mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {comingSoonMenuItems.map((item) => (
                <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 w-full relative">
                    {item.image ? (
                      <img 
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                        }}
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center">
                        <span className="text-white text-lg font-medium">Coming Soon</span>
                      </div>
                    )}
                    
                    {/* Countdown overlay - you can customize this based on your data structure */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2">
                      <h3 className="text-lg font-bold text-white">{item.name}</h3>
                      {item.category && (
                        <p className="text-sm text-white text-opacity-80">{item.category}</p>
                      )}
                    </div>
                    
                    {/* Mystery icon overlay */}
                    <div className="absolute top-2 right-2 bg-white rounded-full p-2">
                      <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-amber-600">{formatEURO(item.price)}</p>
                        <p className="text-xs text-gray-500">Coming soon</p>
                      </div>
                      <div className="flex items-center">
                          {renderDietaryIcons(item.dietary)}
                      </div>
                    </div>
                    
                    <div className="mt-4 bg-amber-50 p-3 rounded-lg">
                      <p className="text-sm text-amber-800">
                        <span className="font-medium">Description:</span> {item.description || "More details coming soon..."}
                      </p>
                    </div>
                    
                    <button disabled className="cursor-pointer w-full mt-4 bg-amber-600 text-white py-2 rounded-md hover:bg-amber-700 transition-colors font-medium text-sm disabled:opacity-50">
                      Get Notified When Available
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-10 text-center">
            <button className="px-6 py-3 bg-amber-600 text-white font-medium rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
              Get Notified About All New Dishes
            </button>
            <p className="mt-3 text-sm text-gray-500">
              Be the first to know when we add something new to our menu
            </p>
          </div>
        </div>
      </div>   
    </div>
  );
};

export default ComingSoon;