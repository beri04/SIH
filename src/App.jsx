import React from 'react'
import AnnouncementBar from './components/AnnouncementBar'
import './index.css'
import LogoWithTagline from './components/LogoWithTagline'
import DashboardSummary from './components/DashboardSummary'
import NavBar from './components/Navbar'
import GeoTaggedCompliance from './components/GeoTaggedCompliance'

const App = () => {
  return (
    <div>
      <AnnouncementBar/>
      <LogoWithTagline/>
      <NavBar/>
      <DashboardSummary/>
      <GeoTaggedCompliance/>
    </div>
  )
}

export default App
