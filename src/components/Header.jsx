import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isAdmin = user?.role === "admin";

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and desktop navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-amber-700 font-bold text-xl">Benne Berlin</span>
            </Link>

            {/* Desktop Navigation - hidden on mobile */}
            <nav className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === "/"
                  ? "bg-amber-100 text-amber-900"
                  : "text-gray-700 hover:bg-amber-50"
                  }`}
              >
                Home
              </Link>
              <Link
                to="/menu"
                className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === "/menu"
                  ? "bg-amber-100 text-amber-900"
                  : "text-gray-700 hover:bg-amber-50"
                  }`}
              >
                Menu
              </Link>
              <Link
                to="/reserve"
                className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === "/reserve"
                  ? "bg-amber-100 text-amber-900"
                  : "text-gray-700 hover:bg-amber-50"
                  }`}
              >
                Reservations
              </Link>
              <Link
                to="/review"
                className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === "/review"
                  ? "bg-amber-100 text-amber-900"
                  : "text-gray-700 hover:bg-amber-50"
                  }`}
              >
                Review
              </Link>
              <Link
                to="/coming-soon"
                className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === "/coming-soon"
                  ? "bg-amber-100 text-amber-900"
                  : "text-gray-700 hover:bg-amber-50"
                  }`}
              >
                Coming Soon
              </Link>

              {/* Admin links - only shown to admin users */}
              {isAdmin && (
                <>
                  <Link
                    to="/admin/dashboard"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname.includes("/admin/dashboard")
                      ? "bg-amber-100 text-amber-900"
                      : "text-gray-700 hover:bg-amber-50"
                      }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/admin/menu"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname.includes("/admin/menu")
                      ? "bg-amber-100 text-amber-900"
                      : "text-gray-700 hover:bg-amber-50"
                      }`}
                  >
                    Admin Menu
                  </Link>
                  <Link
                    to="/admin/banners"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname.includes("/admin/banners")
                      ? "bg-amber-100 text-amber-900"
                      : "text-gray-700 hover:bg-amber-50"
                      }`}
                  >
                    Banners
                  </Link>
                </>
              )}
            </nav>
          </div>

          {/* User info and logout - Desktop */}
          <div className="hidden md:flex md:items-center">
            <div className="flex items-center space-x-3">
              {
                !user ?
                  (<button
                    onClick={() => {
                      localStorage.removeItem("user");
                      navigate("/login")
                    }}
                    className="bg-amber-100 cursor-pointer text-amber-800 hover:bg-amber-200 px-3 py-2 rounded-md text-sm font-medium transition"
                  >Admin Login</button>) : (<>
                    <span className="text-sm font-medium text-gray-700">
                      {user?.name}
                    </span>
                    <button
                      onClick={onLogout}
                      className="bg-amber-100 cursor-pointer text-amber-800 hover:bg-amber-200 px-3 py-2 rounded-md text-sm font-medium transition"
                    >
                      Logout
                    </button>
                  </>)
              }
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-amber-700 hover:bg-amber-50 focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                /* Icon when menu is open */
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === "/"
                ? "bg-amber-100 text-amber-900"
                : "text-gray-700 hover:bg-amber-50"
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === "/menu"
                ? "bg-amber-100 text-amber-900"
                : "text-gray-700 hover:bg-amber-50"
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Menu
            </Link>
            <Link
              to="/reserve"
              className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === "/reserve"
                ? "bg-amber-100 text-amber-900"
                : "text-gray-700 hover:bg-amber-50"
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Reservations
            </Link>
            <Link
              to="/review"
              className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === "/review"
                ? "bg-amber-100 text-amber-900"
                : "text-gray-700 hover:bg-amber-50"
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Review
            </Link>
            <Link
              to="/coming-soon"
              className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === "/coming-soon"
                ? "bg-amber-100 text-amber-900"
                : "text-gray-700 hover:bg-amber-50"
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Coming Soon
            </Link>

            {/* Admin links - only shown to admin users */}
            {isAdmin && (
              <>
                <Link
                  to="/admin/dashboard"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname.includes("/admin/dashboard")
                    ? "bg-amber-100 text-amber-900"
                    : "text-gray-700 hover:bg-amber-50"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/menu"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname.includes("/admin/menu")
                    ? "bg-amber-100 text-amber-900"
                    : "text-gray-700 hover:bg-amber-50"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Menu
                </Link>
                <Link
                  to="/admin/banners"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname.includes("/admin/banners")
                    ? "bg-amber-100 text-amber-900"
                    : "text-gray-700 hover:bg-amber-50"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Banners
                </Link>
              </>
            )}
          </div>

          {/* Mobile view - user profile and logout */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                {/* User avatar or initials */}
                <div className="h-10 w-10 rounded-full bg-amber-200 flex items-center justify-center">
                  <span className="text-amber-800 font-medium">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{user?.name}</div>
                <div className="text-sm font-medium text-gray-500">{user?.email}</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              {
                !user ? (
                  <button
                    onClick={() => {
                      localStorage.removeItem("user");
                      setIsMenuOpen(false);
                      navigate("/login");
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-amber-50"
                  >
                    Admin Login
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-amber-50"
                  >
                    Logout
                  </button>
                )
              }
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;