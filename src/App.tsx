/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Upload from "./pages/Upload";
import Tracking from "./pages/Tracking";
import Locator from "./pages/Locator";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="locator" element={<Locator />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="upload" element={<Upload />} />
              <Route path="tracking" element={<Tracking />} />
              <Route path="profile" element={<Profile />} />
              <Route path="admin" element={<AdminDashboard />} />
            </Route>

            <Route path="*" element={<div className="p-20 text-center text-2xl font-bold">404 - Not Found</div>} />
          </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}
