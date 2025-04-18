import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { getToken, removeToken } from "../utils/token";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const authToken = getToken("authToken");

  const handleLogout = () => {
    removeToken("authToken");
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header authToken={authToken} onLogout={handleLogout} />
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children || <Outlet />}
      </main>
      <Footer authToken={authToken} />
    </div>
  );
};

export default Layout;