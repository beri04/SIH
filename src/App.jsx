import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/Dashboardpage";
import AboutPage from "./pages/AboutPage";
import TrendPage from "./pages/TrendPage";
import UploadImage from "./components/UploadImage";
import UploadPage from "./pages/UploadPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/trends" element={<TrendPage/>} />
      <Route path="/upload" element={<UploadPage/>}/>
      
    </Routes>
  );
};

export default App;

