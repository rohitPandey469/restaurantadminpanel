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
import Review from "./pages/Review";
import ComingSoon from "./pages/ComingSoon";
import { getToken } from "./utils/token";

const AdminRoute = ({ children }) => {
  const authToken = getToken("authToken");
  return authToken ? children : <Navigate to="/" />;
};

export default function App() {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const authToken = getToken("authToken")
    setAuthToken(authToken);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          authToken ? <Navigate to="/" /> : <Login />
        } />
        <Route path="/" element={<Layout><Outlet/></Layout>}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="reserve" element={<Reservations />} />
          <Route path="review" element={<Review/>} />
          <Route path="coming-soon" element={<ComingSoon/>}/>

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