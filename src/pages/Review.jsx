import React, { useState, useEffect } from "react";
// import { BACKEND_URL } from "../App";

// Sample reviews for development
const sampleReviews = [
  {
    id: 1,
    name: "Rajesh Sharma",
    rating: 5,
    comment: "The butter chicken was amazing! Authentic flavors and great service.",
    date: "2025-04-01"
  },
  {
    id: 2,
    name: "Priya Patel",
    rating: 4,
    comment: "Loved the ambiance and the food. The naan bread was particularly good.",
    date: "2025-03-29"
  },
  {
    id: 3,
    name: "Arjun Singh",
    rating: 5,
    comment: "Best biryani in town! Will definitely be coming back.",
    date: "2025-03-25"
  },
  {
    id: 4,
    name: "Meera Krishnan",
    rating: 3,
    comment: "Good food but service was a bit slow during peak hours.",
    date: "2025-03-22"
  },
  {
    id: 5,
    name: "Vikram Malhotra",
    rating: 5,
    comment: "The paneer tikka masala and garlic naan were exceptional. Great vegetarian options!",
    date: "2025-03-20"
  }
];

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    comment: "",
    date: new Date().toISOString().split('T')[0]
  });

  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [filterRating, setFilterRating] = useState(0);

  // Fetch reviews on component mount
  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch(`${BACKEND_URL}/api/reviews`);
        
  //       if (!response.ok) {
  //         setReviews(sampleReviews)
  //         return;
  //         // throw new Error(`Failed to fetch reviews: ${response.status}`);
  //       }
        
  //       const data = await response.json();
  //       setReviews(data);
        
  //       // Calculate average rating
  //       if (data.length > 0) {
  //         const totalRating = data.reduce((acc, review) => acc + review.rating, 0);
  //         setAverageRating((totalRating / data.length).toFixed(1));
  //       }
        
  //     } catch (err) {
  //       console.error("Error fetching reviews:", err);
  //       setError("Failed to load reviews. Please try again later.");
        
  //       setReviews(sampleReviews);
        
  //       // Calculate average rating for sample data
  //       const totalRating = sampleReviews.reduce((acc, review) => acc + review.rating, 0);
  //       setAverageRating((totalRating / sampleReviews.length).toFixed(1));
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
    
  //   fetchReviews();
  // }, []);

  // Handle input changes for the review form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "rating" ? parseInt(value, 10) : value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError("");
    setFormSuccess("");
    
    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.comment) {
        throw new Error("Please fill in all required fields");
      }
      
      // Submit review to backend
      const response = await fetch(`${BACKEND_URL}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          date: new Date().toISOString().split('T')[0]
        })
      });
      
      if (!response.ok) {
        throw new Error("Failed to submit review");
      }
      
      const data = await response.json();
      
      // Update reviews list with new review
      setReviews([data, ...reviews]);
      
      // Recalculate average rating
      const totalRating = [...reviews, data].reduce((acc, review) => acc + review.rating, 0);
      setAverageRating((totalRating / (reviews.length + 1)).toFixed(1));
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        rating: 5,
        comment: "",
        date: new Date().toISOString().split('T')[0]
      });
      
      setFormSuccess("Thank you for your review!");
      
    } catch (err) {
      console.error("Error submitting review:", err);
      setFormError(err.message || "Failed to submit review. Please try again.");
      
      // For development: add the review locally without API
      const newReview = {
        id: reviews.length + 1,
        ...formData,
        date: new Date().toISOString().split('T')[0]
      };
      
      setReviews([newReview, ...reviews]);
      
      // Recalculate average rating
      const totalRating = [...reviews, newReview].reduce((acc, review) => acc + review.rating, 0);
      setAverageRating((totalRating / (reviews.length + 1)).toFixed(1));
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        rating: 5,
        comment: "",
        date: new Date().toISOString().split('T')[0]
      });
      
      setFormSuccess("Thank you for your review!");
    } finally {
      setSubmitting(false);
    }
  };

  // Filter reviews by rating
  const filteredReviews = filterRating === 0
    ? reviews
    : reviews.filter(review => review.rating === filterRating);

  // Render stars for ratings
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <svg 
        key={i}
        className={`w-5 h-5 ${i < rating ? "text-amber-500" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">Customer Reviews</h1>
        <p className="mt-4 text-lg text-gray-600">
          We value your feedback. Share your dining experience with us and others.
        </p>
        
        <div className="flex items-center justify-center mt-6">
          <div className="flex items-center">
            {renderStars(Math.round(averageRating))}
          </div>
          <p className="ml-2 text-2xl font-bold text-gray-900">{averageRating}</p>
          <p className="ml-1 text-gray-500">out of 5</p>
          <p className="ml-4 text-sm text-gray-500">Based on {reviews.length} reviews</p>
        </div>
      </div>
      
      {/* Rating breakdown */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-10">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Rating Breakdown</h3>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = reviews.filter(review => review.rating === rating).length;
            const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
            
            return (
              <div key={rating} className="flex items-center">
                <div className="w-24 flex items-center">
                  <button 
                    onClick={() => setFilterRating(filterRating === rating ? 0 : rating)}
                    className={`flex items-center ${filterRating === rating ? 'font-bold' : ''}`}
                  >
                    <span className="mr-2">{rating}</span>
                    <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                </div>
                <div className="flex-1 h-5 mx-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-500" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="w-16 text-right text-sm text-gray-600">
                  {count} ({percentage.toFixed(0)}%)
                </div>
              </div>
            );
          })}
        </div>
        {filterRating > 0 && (
          <div className="mt-4">
            <button 
              onClick={() => setFilterRating(0)} 
              className="text-sm text-amber-600 hover:text-amber-800"
            >
              Clear filter
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Submit review form */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Write a Review</h3>
            
            {formSuccess && (
              <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                {formSuccess}
              </div>
            )}
            
            {formError && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {formError}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email* (will not be published)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating*
                </label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({...formData, rating: star})}
                      className="mr-1 focus:outline-none"
                    >
                      <svg 
                        className={`w-8 h-8 ${star <= formData.rating ? "text-amber-500" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Review*
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </div>
        
        {/* Reviews list */}
        <div className="md:col-span-2">
          <h3 className="text-xl font-medium text-gray-900 mb-6">
            {filterRating > 0 
              ? `Reviews with ${filterRating} ${filterRating === 1 ? 'star' : 'stars'} (${filteredReviews.length})`
              : `All Reviews (${reviews.length})`}
          </h3>
          
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                    <div className="ml-4">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                      <div className="h-3 bg-gray-200 rounded w-12 mt-2"></div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          ) : filteredReviews.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-500">No reviews found matching your criteria.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredReviews.map((review) => (
                <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{review.name}</h4>
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {renderStars(review.rating)}
                        </div>
                        <span className="ml-2 text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                        <span className="text-amber-800 font-medium">
                          {review.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-gray-700">
                    <p>{review.comment}</p>
                  </div>
                  {review.response && (
                    <div className="mt-4 pl-4 border-l-4 border-amber-200 bg-amber-50 p-3 rounded">
                      <h5 className="font-medium text-gray-900">Response from Spice Kingdom</h5>
                      <p className="mt-1 text-gray-700">{review.response}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;