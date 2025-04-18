import React, { useState } from "react";
import { reservationSchema, validateField, validateForm } from "../utils/validationSchemas";
import { createReservation } from "../service/reserve";

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
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleBlur = async (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate field on blur
    const result = await validateField(reservationSchema, name, value);
    if (!result.valid) {
      setErrors(prev => ({ ...prev, [name]: result.error }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);
    
    // Mark all fields as touched
    const allTouched = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);
    
    // Validate entire form
    const validationResult = await validateForm(reservationSchema, formData);
    if (!validationResult.valid) {
      setErrors(validationResult.errors);
      setIsSubmitting(false);
      return;
    }
    
    await createReservation(formData, setFormData, setErrors, setTouched, setSubmitMessage, setIsSubmitting);
  };
  
  // Get tomorrow's date as the minimum date for reservation
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Available time slots
  const timeSlots = [
    "11:30", "12:00", "12:30", "13:00", "13:30", 
    "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"
  ];
  
  // Occasions
  const occasions = [
    "None", "Birthday", "Anniversary", "Business Meeting", 
    "Date Night", "Family Gathering", "Other"
  ];
  
  return (
    <div className="bg-amber-50 min-h-screen">
      <div className="bg-gradient-to-r from-amber-900 to-amber-700 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Reserve Your Table</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Book your dining experience with us. We look forward to serving you.
          </p>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-5">
            {/* Image Side - takes 2/5 of the width on medium screens and up */}
            <div className="hidden md:block md:col-span-2 relative">
              <img 
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=900&fit=crop" 
                alt="Restaurant interior" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-amber-900 bg-opacity-20"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent text-white">
                <h3 className="text-2xl font-bold mb-2">Elegant Dining Experience</h3>
                <p>Our restaurant offers the perfect ambiance for your special occasions.</p>
              </div>
            </div>
            
            {/* Form Side - takes 3/5 of the width on medium screens and up */}
            <div className="p-8 md:col-span-3">
              <h2 className="text-2xl font-bold text-amber-800 mb-6">Make a Reservation</h2>
              
              {submitMessage && (
                <div className={`p-4 mb-6 rounded-lg ${
                  submitMessage.type === "success" 
                    ? "bg-green-50 text-green-800 border border-green-200" 
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}>
                  {submitMessage.text}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      onBlur={handleBlur}
                      required
                      placeholder="John Doe"
                      className={`block w-full border ${errors.name && touched.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:ring-amber-500 focus:border-amber-500`}
                    />
                    {errors.name && touched.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
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
                      onBlur={handleBlur}
                      required
                      placeholder="john@example.com"
                      className={`block w-full border ${errors.email && touched.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:ring-amber-500 focus:border-amber-500`}
                    />
                    {errors.email && touched.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      onBlur={handleBlur}
                      required
                      placeholder="+1 (555) 123-4567"
                      className={`block w-full border ${errors.phone && touched.phone ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:ring-amber-500 focus:border-amber-500`}
                    />
                    {errors.phone && touched.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Guests*
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={`block w-full border ${errors.guests && touched.guests ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:ring-amber-500 focus:border-amber-500`}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                      ))}
                      <option value="11">More than 10 (We'll contact you)</option>
                    </select>
                    {errors.guests && touched.guests && (
                      <p className="mt-1 text-sm text-red-600">{errors.guests}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      onBlur={handleBlur}
                      required
                      min={minDate}
                      className={`block w-full border ${errors.date && touched.date ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:ring-amber-500 focus:border-amber-500`}
                    />
                    {errors.date && touched.date && (
                      <p className="mt-1 text-sm text-red-600">{errors.date}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                      Time*
                    </label>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={`block w-full border ${errors.time && touched.time ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:ring-amber-500 focus:border-amber-500`}
                    >
                      <option value="">Select a time</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time}>
                          {time.split(':')[0]}:{time.split(':')[1]} 
                          {parseInt(time.split(':')[0]) < 12 || parseInt(time.split(':')[0]) === 24 
                            ? ' AM' 
                            : ' PM'}
                        </option>
                      ))}
                    </select>
                    {errors.time && touched.time && (
                      <p className="mt-1 text-sm text-red-600">{errors.time}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="occasion" className="block text-sm font-medium text-gray-700 mb-1">
                    Occasion
                  </label>
                  <select
                    id="occasion"
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`block w-full border ${errors.occasion && touched.occasion ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:ring-amber-500 focus:border-amber-500`}
                  >
                    {occasions.map(occasion => (
                      <option key={occasion} value={occasion}>{occasion}</option>
                    ))}
                  </select>
                  {errors.occasion && touched.occasion && (
                    <p className="mt-1 text-sm text-red-600">{errors.occasion}</p>
                  )}
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
                    onBlur={handleBlur}
                    rows="4"
                    placeholder="Let us know if you have any specific requests or dietary restrictions..."
                    className={`block w-full border ${errors.specialRequests && touched.specialRequests ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:ring-amber-500 focus:border-amber-500`}
                  />
                  {errors.specialRequests && touched.specialRequests && (
                    <p className="mt-1 text-sm text-red-600">{errors.specialRequests}</p>
                  )}
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-amber-700 text-white py-3 px-4 rounded-md shadow hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </div>
                    ) : "Book My Table"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* Additional Information */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-amber-100 rounded-full mr-4">
                <svg className="h-6 w-6 text-amber-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Hours of Operation</h3>
            </div>
            <div className="text-gray-600 space-y-2">
              <p><span className="font-medium">Lunch:</span> 11:30 AM - 2:30 PM</p>
              <p><span className="font-medium">Dinner:</span> 6:00 PM - 10:30 PM</p>
              <p><span className="font-medium">Weekends:</span> 11:30 AM - 11:00 PM</p>
              <p className="text-sm italic mt-2">Closed on Mondays</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-amber-100 rounded-full mr-4">
                <svg className="h-6 w-6 text-amber-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Location</h3>
            </div>
            <div className="text-gray-600 space-y-2">
            <p>Lützowstraße 81,</p>
            <p>10785 Berlin</p>
              <p className="mt-2">
                <a href="#" className="text-amber-700 hover:text-amber-800 font-medium">
                  View on Map →
                </a>
              </p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-amber-100 rounded-full mr-4">
                <svg className="h-6 w-6 text-amber-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Contact Us</h3>
            </div>
            <div className="text-gray-600 space-y-2">
              <p><span className="font-medium">Phone:</span> (555) 123-4567</p>
              <p><span className="font-medium">Email:</span> reservations@restaurant.com</p>
              <p className="mt-3 text-sm">
                Need immediate assistance? Call us directly for same-day reservations or parties larger than 10.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;