import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📦 Products in Database</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {products.map((p) => (
            <div
              key={p.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                width: "200px",
              }}
            >
              <h3>{p.title}</h3>
              {/* ✅ Show image if exists */}
              {p.sku === "COL-200" && (
                <img
                  src="http://127.0.0.1:8000/static/colgate.jpg"
                  alt={p.title}
                  style={{ width: "100%", height: "auto" }}
                />
              )}
              <p>MRP: ₹{p.mrp || "N/A"}</p>
              <p>Status: {p.status || "pending"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
