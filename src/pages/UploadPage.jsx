import AnnouncementBar from '@/components/AnnouncementBar'
import LogoWithTagline from '@/components/LogoWithTagline'
import NavBar from '@/components/Navbar'
import UploadImage from '@/components/UploadImage'

import React from 'react'

const UploadPage = () => {
  return (
    <div>
        <AnnouncementBar/>
        <LogoWithTagline/>
        <NavBar/>
       <UploadImage/>
    </div>
  )
}

export default UploadPage