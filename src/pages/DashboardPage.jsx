import React from 'react';
import AnnouncementBar from '@/components/AnnouncementBar';
import LogoWithTagline from '@/components/LogoWithTagline';
import NavBar from '@/components/Navbar';
import DashboardSummary from '@/components/DashboardSummary';
import GeoTaggedCompliance from '@/components/GeoTaggedCompliance';
import Footer from '@/components/Footer';


const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AnnouncementBar />
      <LogoWithTagline />
      <NavBar />
      <DashboardSummary />    {/* Clickable summary cards */}
      <GeoTaggedCompliance />
      <Footer/>
    </div>
  );
};

export default DashboardPage;
