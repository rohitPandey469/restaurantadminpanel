import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Reservations from "./pages/Reservations";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMenu from "./pages/admin/AdminMenu";
import AdminBanners from "./pages/admin/AdminBanners";
import ErrorBoundary from "./components/ErrorBoundary";

const DemoUser = {
  name: "John Doe",
  role: "admin", // or "user"
};

// Protection for admin routes
const AdminRoute = ({ children }) => {
  // const { user } = useSelector((state) => state.auth);
  const user = DemoUser;
  return user?.role === "admin" ? children : <Navigate to="/" />;
};

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout><Outlet /></Layout>}>
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
      </Routes>
    </Router>
  );
}