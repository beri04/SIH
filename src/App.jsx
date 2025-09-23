import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/Dashboardpage';
import ProductList from './components/ProductList';
import ComplianceUpload from './components/ComplianceUpload';
import UploadImage from './components/UploadImage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/products/:type" element={<ProductList />} />
      <Route path="/upload" element={<  UploadImage />} />
    </Routes>
  );
};

export default App;
