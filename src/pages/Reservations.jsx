import React, { useState } from "react";

const Reservations = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
    occasion: "",
    specialRequests: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real application, this would be an API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage({
        type: "success",
        text: "Reservation request submitted! We'll confirm your booking shortly."
      });
      
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: 2,
        occasion: "",
        specialRequests: ""
      });
    }, 1500);
  };
  
  // Get tomorrow's date as the minimum date for reservation
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];
  
  return (
    <div>
      <div className="bg-dark text-white py-16 px-4 mb-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Reserve Your Table</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Book your dining experience with us. We look forward to serving you.
          </p>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 mb-16">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Image Side */}
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=900&fit=crop" 
                alt="Restaurant interior" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Form Side */}
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">Make a Reservation</h2>
              
              {submitMessage && (
                <div className={`p-4 mb-6 rounded ${
                  submitMessage.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                }`}>
                  {submitMessage.text}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Date*
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      min={minDate}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                      Time*
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Guests*
                    </label>
                    <input
                      type="number"
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      required
                      min="1"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="occasion" className="block text-sm font-medium text-gray-700 mb-1">
                      Occasion
                    </label>
                    <input
                      type="text"
                      id="occasion"
                      name="occasion"
                      value={formData.occasion}
                      onChange={handleChange}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
                      Special Requests
                    </label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      rows="4"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Reservation"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;