import AnnouncementBar from '@/components/AnnouncementBar'
import LogoWithTagline from '@/components/LogoWithTagline'
import NavBar from '@/components/Navbar'
import Trends from '@/components/Trends'
import React from 'react'
import Footer from '@/components/Footer'

const TrendPage = () => {
  return (
    <div>
        <AnnouncementBar/>
        <LogoWithTagline/>
        <NavBar/>
        <Trends/>
        <Footer/>
    </div>
  )
}

export default TrendPage