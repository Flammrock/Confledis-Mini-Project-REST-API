import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import HomePage from "./home";
import AboutPage from "./about";
import ProductPage from "./product";
import ProductEditPage from "./product-edit";
import ProductCreatePage from "./product-create";
import ProductSearchPage from "./product-search";

import Header from "../components/headerComponent";

const pages = () => {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/search" element={<ProductSearchPage />} />
        <Route path="/product/create" element={<ProductCreatePage />} />
        <Route path="/product/edit/:id" element={<ProductEditPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default pages;
