import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import Home from "./pages/Home.tsx";
import ReactDOM from "react-dom/client";
import ProductDetail from "./pages/ProductDetail.tsx";
import UserProfile from "./pages/UserProfile.tsx";
import Checkout from "./pages/Checkout.tsx";
import Search from "./pages/Search.tsx";
import Category from "./pages/Category.tsx";
import Info from "./pages/Info.tsx";
import Contact from "./pages/Contact.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { CartProvider } from "./context/CartContext.tsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <AuthProvider>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ProductDetail />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/search" element={<Search />} />
          <Route path="/category/:categorySlug" element={<Category />} />
          <Route path="/info" element={<Info />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </AuthProvider>
);
