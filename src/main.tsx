import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import Home from "./pages/Home.tsx";
import ReactDOM from "react-dom/client";
import ProductDetail from "./pages/ProductDetail.tsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product" element={<ProductDetail />} />
    </Routes>
  </BrowserRouter>
);
