import React, { useState, useEffect } from "react";

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

  // Set the launch date - modify this to your actual target date
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
      // const response = await fetch(`${BACKEND_URL}/api/subscribe`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email })
      // });
      
      // if (!response.ok) throw new Error("Failed to subscribe");
      
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
        <div className="max-w-3xl w-full text-center">
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

            {/* Mystery Upcoming Dishes */}
            <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900">New Dishes Coming to Our Menu</h2>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
                Our chefs are preparing some exciting new flavors! Watch the countdown to see them revealed.
            </p>
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Mystery Dish 1 - North Indian Special */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 w-full relative bg-gradient-to-r from-amber-400 to-amber-600">
                    {/* Blurred/hidden image until reveal */}
                    <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-4">
                        <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-2">
                        North Indian Special
                        </span>
                        <h3 className="text-lg font-bold text-white mb-1">Mystery Dish</h3>
                        <p className="text-white text-opacity-80 text-sm">Premieres in</p>
                    </div>
                    </div>
                    
                    {/* Countdown for this specific dish */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2">
                    <div className="flex justify-center space-x-3">
                        <div className="text-center">
                        <span className="block text-xl font-bold text-white">14</span>
                        <span className="text-xs text-white text-opacity-80">Days</span>
                        </div>
                        <div className="text-center">
                        <span className="block text-xl font-bold text-white">08</span>
                        <span className="text-xs text-white text-opacity-80">Hours</span>
                        </div>
                        <div className="text-center">
                        <span className="block text-xl font-bold text-white">23</span>
                        <span className="text-xs text-white text-opacity-80">Mins</span>
                        </div>
                    </div>
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
                        <p className="font-medium text-amber-600">€???</p>
                        <p className="text-xs text-gray-500">Price to be revealed</p>
                    </div>
                    <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-green-500 mr-1"></div>
                        <span className="text-xs text-gray-600">Non-Veg</span>
                    </div>
                    </div>
                    <div className="mt-4 bg-amber-50 p-3 rounded-lg">
                    <p className="text-sm text-amber-800">
                        <span className="font-medium">Hint:</span> Our chef's signature creation combines royal flavors from Lucknow with a modern twist...
                    </p>
                    </div>
                    <button className="w-full mt-4 bg-amber-600 text-white py-2 rounded-md hover:bg-amber-700 transition-colors font-medium text-sm">
                    Get Notified When Revealed
                    </button>
                </div>
                </div>
        
                {/* Mystery Dish 2 - Seasonal Special with partial reveal */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 w-full relative">
                    {/* Partially blurred/pixelated image */}
                    <img 
                    src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?blur=10" 
                    alt="Partially revealed dish" 
                    className="w-full h-full object-cover filter brightness-75"
                    />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-4">
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-2">
                        Seasonal Special
                        </span>
                        <h3 className="text-lg font-bold text-white mb-1">Summer Surprise</h3>
                        <p className="text-white text-opacity-80 text-sm">Reveals in</p>
                    </div>
                    </div>
                    
                    {/* Countdown for this specific dish */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2">
                    <div className="flex justify-center space-x-3">
                        <div className="text-center">
                        <span className="block text-xl font-bold text-white">07</span>
                        <span className="text-xs text-white text-opacity-80">Days</span>
                        </div>
                        <div className="text-center">
                        <span className="block text-xl font-bold text-white">12</span>
                        <span className="text-xs text-white text-opacity-80">Hours</span>
                        </div>
                        <div className="text-center">
                        <span className="block text-xl font-bold text-white">36</span>
                        <span className="text-xs text-white text-opacity-80">Mins</span>
                        </div>
                    </div>
                    </div>
                    
                    {/* Partial reveal indicator */}
                    <div className="absolute top-2 right-2 bg-white rounded-full p-2">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    </div>
                </div>
                <div className="p-4">
                    <div className="flex justify-between items-center">
                    <div>
                        <p className="font-medium text-amber-600">€499</p>
                        <p className="text-xs text-gray-500">Introductory price</p>
                    </div>
                    <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-green-700 mr-1"></div>
                        <span className="text-xs text-gray-600">Vegan</span>
                    </div>
                    </div>
                    <div className="mt-4 bg-purple-50 p-3 rounded-lg">
                    <p className="text-sm text-purple-800">
                        <span className="font-medium">Hint:</span> Beat the heat with this refreshing dish featuring seasonal ingredients sourced from local farmers...
                    </p>
                    </div>
                    <div className="w-full mt-4 bg-gray-100 rounded-full h-2.5">
                    <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "70%" }}></div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 text-right">70% revealed</p>
                </div>
                </div>
        
                {/* Mystery Dish 3 - Chef's Special with locked details */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 w-full relative bg-gradient-to-r from-gray-700 to-gray-900">
                    {/* Locked image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="mb-2 mx-auto w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7z" />
                        </svg>
                        </div>
                        <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-1">
                        Chef's Secret Creation
                        </span>
                        <h3 className="text-sm text-white">Unlocks in</h3>
                    </div>
                    </div>
                    
                    {/* Countdown for this specific dish */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2">
                    <div className="flex justify-center space-x-3">
                        <div className="text-center">
                        <span className="block text-xl font-bold text-white">21</span>
                        <span className="text-xs text-white text-opacity-80">Days</span>
                        </div>
                        <div className="text-center">
                        <span className="block text-xl font-bold text-white">05</span>
                        <span className="text-xs text-white text-opacity-80">Hours</span>
                        </div>
                        <div className="text-center">
                        <span className="block text-xl font-bold text-white">18</span>
                        <span className="text-xs text-white text-opacity-80">Mins</span>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="p-4">
                    <div className="flex justify-between items-center">
                    <div>
                        <p className="font-medium text-gray-800">Top Secret</p>
                        <p className="text-xs text-gray-500">Details locked</p>
                    </div>
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    </div>
                    <div className="mt-4">
                    {/* Progress tiles representing locked hints */}
                    <div className="grid grid-cols-5 gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                        <div 
                            key={i} 
                            className={`h-8 rounded ${i === 1 ? 'bg-amber-500' : 'bg-gray-200'} flex items-center justify-center`}
                        >
                            {i === 1 ? (
                            <span className="text-xs font-medium text-white">1/5</span>
                            ) : (
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7z" />
                            </svg>
                            )}
                        </div>
                        ))}
                    </div>
                    <p className="mt-2 text-xs text-gray-500">1 of 5 hints unlocked</p>
                    <div className="mt-3 bg-amber-50 p-3 rounded-lg">
                        <p className="text-sm text-amber-800">
                        <span className="font-medium">Hint #1:</span> This innovative fusion dish combines our chef's international training with local ingredients...
                        </p>
                    </div>
                    </div>
                    <button className="w-full mt-4 bg-amber-600 text-white py-2 rounded-md hover:bg-amber-700 transition-colors font-medium text-sm flex items-center justify-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    Get Notified About New Hints
                    </button>
                </div>
                </div>
        
                {/* Nearly Revealed Dish */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 w-full relative">
                    {/* Blurred but almost visible image */}
                    <img 
                    src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?blur=5" 
                    alt="Almost revealed dish" 
                    className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    
                    <div className="absolute bottom-5 left-0 right-0 text-center">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        Almost Revealed!
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">Plant-Based Creation</h3>
                    </div>
                    
                    {/* Countdown for this specific dish */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2">
                    <div className="flex justify-center space-x-3">
                        <div className="text-center">
                        <span className="block text-xl font-bold text-white">00</span>
                        <span className="text-xs text-white text-opacity-80">Days</span>
                        </div>
                        <div className="text-center">
                        <span className="block text-xl font-bold text-white">02</span>
                        <span className="text-xs text-white text-opacity-80">Hours</span>
                        </div>
                        <div className="text-center">
                        <span className="block text-xl font-bold text-white">47</span>
                        <span className="text-xs text-white text-opacity-80">Mins</span>
                        </div>
                    </div>
                    </div>
                    
                    {/* Almost revealed indicator */}
                    <div className="absolute top-2 right-2 bg-white rounded-full p-2">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                    </div>
                </div>
                <div className="p-4">
                    <div className="flex justify-between items-center">
                    <div>
                        <p className="font-medium text-amber-600">€449</p>
                        <p className="text-xs text-gray-500">Launching soon</p>
                    </div>
                    <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-green-700 mr-1"></div>
                        <span className="text-xs text-gray-600">Vegan</span>
                    </div>
                    </div>
                    <div className="w-full mt-4 bg-gray-100 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "95%" }}></div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 text-right">95% revealed</p>
                    <div className="mt-3 bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-green-800">
                        <span className="font-medium">Final Hint:</span> Our innovative plant-based dish uses locally sourced vegetables and ancient techniques to create a hearty and flavorful experience that will change how you think about vegan cuisine...
                    </p>
                    </div>
                </div>
                </div>
                
                {/* Just Unlocked Dish */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 w-full relative">
                    <img 
                    src="https://images.unsplash.com/photo-1551024709-8f23befc6f87" 
                    alt="Mango Cheesecake Jar" 
                    className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-amber-500 bg-opacity-40"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white p-3 rounded-lg shadow-lg transform rotate-6 animate-pulse">
                        <p className="text-amber-600 font-bold text-lg">Just Revealed!</p>
                    </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-3">
                    <h3 className="text-lg font-bold text-white">Mango Cheesecake Jar</h3>
                    <p className="text-sm text-white text-opacity-80">Limited Summer Edition</p>
                    </div>
                </div>
                <div className="p-4">
                    <div className="flex justify-between items-center">
                    <div>
                        <p className="font-medium text-amber-600">€299</p>
                        <p className="text-xs text-gray-500">Newly added</p>
                    </div>
                    <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-yellow-500 mr-1"></div>
                        <span className="text-xs text-gray-600">Vegetarian</span>
                    </div>
                    </div>
                    <div className="mt-4 bg-yellow-50 p-3 rounded-lg">
                    <p className="text-sm text-yellow-800">
                        <span className="font-medium">Description:</span> Layers of creamy cheesecake, fresh Alphonso mango pulp, and crunchy biscuit crumble. Summer in a jar! Available for a limited time only.
                    </p>
                    </div>
                    <button className="w-full mt-4 bg-amber-600 text-white py-2 rounded-md hover:bg-amber-700 transition-colors font-medium text-sm">
                    Try Today - Limited Availability!
                    </button>
                </div>
                </div>
                
                {/* Coming Soon Placeholder for More */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 w-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center">
                    <div className="text-center p-4">
                    <svg className="w-12 h-12 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <h3 className="text-lg font-bold text-white mt-2">More Surprises Coming</h3>
                    <p className="text-white text-opacity-90">Stay tuned for more exciting dishes!</p>
                    </div>
                </div>
                <div className="p-4">
                    <div className="text-center">
                    <p className="font-medium text-gray-800">🔒 More dishes locked</p>
                    <p className="text-sm text-gray-500 mt-1">Follow us on social media for early hints</p>
                    
                    <div className="mt-4 flex justify-center space-x-4">
                        <a href="#" className="text-amber-600 hover:text-amber-700">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        </svg>
                        </a>
                        <a href="#" className="text-amber-600 hover:text-amber-700">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
                        </a>
                        <a href="#" className="text-amber-600 hover:text-amber-700">
                        <svg fill="currentColor" className="h-6 w-6" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 308 308" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="XMLID_468_"> <path id="XMLID_469_" d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156 c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687 c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887 c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153 c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348 c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802 c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922 c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0 c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458 C233.168,179.508,230.845,178.393,227.904,176.981z"></path> <path id="XMLID_470_" d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716 c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396 c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188 l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677 c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867 C276.546,215.678,222.799,268.994,156.734,268.994z"></path> </g> </g></svg>
                        </a>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            
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
  )
};

export default ComingSoon;