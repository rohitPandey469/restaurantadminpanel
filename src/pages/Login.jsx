import React, { useState } from "react";
import { handleLogin } from "../service/auth";
import { loginSchema, validateField, validateForm } from "../utils/validationSchemas";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    
    // Clear field-specific errors when user edits the field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ""
      });
    }

    if(error) setError("");
  };

  const handleBlur = async (e) => {
    const {name, value} = e.target;
    setTouched(prev => ({...prev, [name]: true}));

    // Validate the field on blur
    const result = await validateField(loginSchema, name, value);
    if(!result.valid){
      setErrors(prev => ({...prev, [name]: result.error}));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Mark all fields as touched
    const allTouched = {}
    Object.keys(credentials).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    // validate entire form
    const validationResult = await validateForm(loginSchema, credentials);
    console.log(validationResult);
    if(!validationResult.valid){
      setErrors(validationResult.errors);
      setIsLoading(false);
      return;
    }
    
    console.log("Submitting")
    await handleLogin(credentials, setCredentials, setError, navigate);
    setIsLoading(false)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-amber-800">Admin Login</h1>
          <p className="text-gray-600 mt-2">Sign in to access admin functionalities</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className={`w-full border ${errors.email ? "border-red-300" : "border-gray-300"} rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500`}
              id="email"
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className={`w-full border ${errors.password ? "border-red-300" : "border-gray-300"} rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500`}
              id="password"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer mb-10 bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Admin signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;