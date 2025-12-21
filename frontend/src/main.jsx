import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProtectedRoute from "./layouts/ProtectedRoutes.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import CartPage from "./pages/CartPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import UpdateCartItemPage from "./pages/UpdateCartItemPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/my-cart" element={<CartPage />} />
          <Route path="/my-cart/:id/update" element={<UpdateCartItemPage />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
