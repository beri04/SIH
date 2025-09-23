import AnnouncementBar from '@/components/AnnouncementBar'
import LogoWithTagline from '@/components/LogoWithTagline'
import NavBar from '@/components/Navbar'
import React from 'react'
import Footer from '@/components/Footer'
const About = () => {
  return (
    <div>
<AnnouncementBar />
<LogoWithTagline /> 
<NavBar/>
<div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
  <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">About Niyantran</h1>
  
  <section className="mb-8">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">What is Niyantran?</h2>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
      Niyantran is an advanced web application designed to assist Legal Metrology Officers in ensuring compliance with legal metrology standards. By leveraging cutting-edge technologies such as Optical Character Recognition (OCR) and Artificial Intelligence (AI), Niyantran automates the process of verifying product labels against regulatory requirements.
    </p>
  </section>

  <section className="mb-8">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Key Features</h2>
    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed">
      <li><strong>Image Upload:</strong> Officers can easily upload images of product labels for analysis.</li>
      <li><strong>OCR Technology:</strong> Extracts text from images to identify key label information.</li>
      <li><strong>AI-Powered Analysis:</strong> Compares extracted data against legal metrology standards to identify discrepancies.</li>
      <li><strong>Compliance Reports:</strong> Generates detailed reports highlighting compliance status and any violations.</li>
      <li><strong>Geo-Tagging:</strong> Associates compliance checks with specific locations for better tracking and accountability.</li>
    </ul>
  </section>

  <section className="mb-8">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Why Niyantran?</h2>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
      Niyantran streamlines the compliance verification process, reducing manual effort and minimizing human error. By automating label analysis, it allows Legal Metrology Officers to focus on enforcement and regulatory duties, ultimately enhancing the effectiveness of legal metrology practices.
    </p>
  </section>    
</div>
<Footer/>
</div>
   
  )
}

export default About