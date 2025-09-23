import React, { useState } from 'react'
import AnnouncementBar from './components/AnnouncementBar'
import './index.css'
import LogoWithTagline from './components/LogoWithTagline'
import DashboardSummary from './components/DashboardSummary'
import NavBar from './components/Navbar'
import GeoTaggedCompliance from './components/GeoTaggedCompliance'
import axios from 'axios'
import ProductList from "./components/ProductList";

const App = () => {
  const [asin, setAsin] = useState("")
  const [product, setProduct] = useState(null)

  const fetchProduct = async () => {
    if (!asin) {
      alert("Please enter an ASIN")
      return
    }
    try {
      const res = await axios.get(`http://localhost:8000/get-product/${asin}`)
      setProduct(res.data)
    } catch (err) {
      console.error(err)
      alert("Error fetching product. Check backend logs.")
    }
  }

  return (
    <div>
      <AnnouncementBar />
      <LogoWithTagline />
      <NavBar />
      <DashboardSummary />
      <GeoTaggedCompliance />

      {/* 🔎 ASIN Search Section */}
      <div style={{ padding: "20px", marginTop: "20px" }}>
        <h2>Amazon Product Lookup</h2>
        <input
          type="text"
          placeholder="Enter ASIN"
          value={asin}
          onChange={(e) => setAsin(e.target.value)}
        />
        <button onClick={fetchProduct} style={{ marginLeft: "10px" }}>
          Search
        </button>

        {/* 🎯 Show product if found */}
        {product && (
          <div style={{ marginTop: "20px" }}>
            <h3>{product.title}</h3>
            <img src={product.image} alt={product.title} width="200" />
            <p>Price: {product.price}</p>
          </div>
        )}
      </div>

      {/* 📦 Product List Section */}
      <div style={{ marginTop: "40px", padding: "20px" }}>
        <ProductList />
      </div>
    </div>
  )
}

export default App
