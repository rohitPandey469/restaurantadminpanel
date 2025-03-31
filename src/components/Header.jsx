import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-primary font-bold text-xl">Restaurant</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:ml-6 md:flex md:space-x-8">
            <Link
              to="/"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                isActive("/") ? "border-primary text-dark" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                isActive("/menu") ? "border-primary text-dark" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Menu
            </Link>
            <Link
              to="/reserve"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                isActive("/reserve") ? "border-primary text-dark" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Reservations
            </Link>
            <Link
              to="/admin/dashboard"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                location.pathname.includes("/admin") ? "border-primary text-dark" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Admin Dashboard
            </Link>
            <Link
              to="/admin/menu"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                location.pathname.includes("/menu") ? "border-primary text-dark" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Admin Menu
            </Link>
            <Link
              to="/admin/banners"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                location.pathname.includes("/banners") ? "border-primary text-dark" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Admin Banners
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive("/") ? "border-primary text-primary bg-indigo-50" : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              }`}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive("/menu") ? "border-primary text-primary bg-indigo-50" : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              }`}
            >
              Menu
            </Link>
            <Link
              to="/reserve"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive("/reserve") ? "border-primary text-primary bg-indigo-50" : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              }`}
            >
              Reservations
            </Link>
            <Link
              to="/admin/dashboard"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                location.pathname.includes("/admin") ? "border-primary text-primary bg-indigo-50" : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              }`}
            >
              Admin Dashboard
            </Link>
            <Link
              to="/admin/menu"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                location.pathname.includes("/menu") ? "border-primary text-primary bg-indigo-50" : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              }`}
            >
              Admin Menu
            </Link>
            <Link
              to="/admin/banners"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                location.pathname.includes("/banners") ? "border-primary text-primary bg-indigo-50" : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              }`}
            >
              Admin Banners
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;