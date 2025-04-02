import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Reservations from "./pages/Reservations";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMenu from "./pages/admin/AdminMenu";
import AdminBanners from "./pages/admin/AdminBanners";
import ErrorBoundary from "./components/ErrorBoundary";
import Login from "./pages/Login";

// Protection for admin routes
const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.role === "admin" ? children : <Navigate to="/" />;
};

// Protection for authenticated routes
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? children : <Navigate to="/login" />;
};

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Login Route - accessible to everyone */}
        <Route path="/login" element={
          user ? <Navigate to="/" /> : <Login />
        } />

        {/* Protected Routes - require authentication */}
        <Route path="/" element={
          <ProtectedRoute>
            <Layout>
              <Outlet />
            </Layout>
          </ProtectedRoute>
        }>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="reserve" element={<Reservations />} />

          {/* Protected Admin Routes */}
          <Route path="admin" element={<AdminRoute><Outlet /></AdminRoute>}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="menu" element={<AdminMenu />} />
            <Route path="banners" element={<AdminBanners />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<ErrorBoundary error={{ status: 404 }} />} />
        </Route>

        {/* Catch-all route to redirect to login if not authenticated */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}