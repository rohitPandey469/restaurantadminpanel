import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header user={user} onLogout={handleLogout} />
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;