// Routes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import WebsiteDetails from "./components/WebsiteDetails";
import ImageScanner from "./components/ImageScanner";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/website-details/:url" element={<WebsiteDetails />} /> */}
      <Route path="/website-details" element={<WebsiteDetails />} />
      <Route path="/image-scan" element={<ImageScanner />} />
    </Routes>
  );
};

export default AllRoutes;
