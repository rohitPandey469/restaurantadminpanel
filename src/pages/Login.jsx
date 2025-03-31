import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Mock authentication - replace with actual authentication logic
      if (credentials.email === "admin@restaurant.com" && credentials.password === "admin123") {
        localStorage.setItem("user", JSON.stringify({
          name: "Admin User",
          email: credentials.email,
          role: "admin"
        }));
        navigate("/admin/dashboard");
      } else if (credentials.email === "user@example.com" && credentials.password === "user123") {
        localStorage.setItem("user", JSON.stringify({
          name: "Regular User",
          email: credentials.email,
          role: "user"
        }));
        navigate("/");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Authentication failed. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-amber-800">Restaurant Login</h1>
          <p className="text-gray-600 mt-2">Sign in to access your account</p>
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
              className="input-field"
              id="email"
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="input-field"
              id="password"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-amber-600 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-amber-700 hover:text-amber-900">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          <span>Demo accounts:</span>
          <div className="mt-2">
            <p>Admin: admin@restaurant.com / admin123</p>
            <p>User: user@example.com / user123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;