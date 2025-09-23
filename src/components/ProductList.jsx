import React from "react";
import { useParams, Link } from "react-router-dom";
import AnnouncementBar from "./AnnouncementBar";
import LogoWithTagline from "./LogoWithTagline";
import NavBar from "./Navbar";

const dummyProducts = {
  compliant: [
    { name: "Product 1", barcode: "12345" },
    { name: "Product 2", barcode: "67890" },
    { name: "Product 3", barcode: "54321" },
  ],
  "non-compliant": [
    { name: "Product 4", missing: ["Label", "Weight info"] },
    { name: "Product 5", missing: ["Batch number", "Expiry date"] },
    { name: "Product 6", missing: ["Barcode"] },
  ],
};

const ProductList = () => {
  const { type } = useParams();
  const products = dummyProducts[type] || [];

  return (
    <div>
    <AnnouncementBar/>
    <LogoWithTagline/>
    <NavBar/>
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold capitalize text-gray-900 dark:text-white">
          {type.replace("-", " ")}
        </h2>
        <Link
          to="/"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Back to Dashboard
        </Link>
      </div>

      <div className="grid gap-4">
        {products.map((product, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-xl shadow-lg transition hover:scale-105 duration-200 ${
              type === "non-compliant"
                ? "bg-red-100 dark:bg-red-800"
                : "bg-green-100 dark:bg-green-800"
            }`}
          >
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
              {product.name}
            </h3>

            {type === "non-compliant" && (
              <ul className="list-disc pl-5 mt-2 text-gray-800 dark:text-gray-200">
                {product.missing.map((item, i) => (
                  <li key={i}>❌ {item} missing</li>
                ))}
              </ul>
            )}

            {type === "compliant" && (
              <p className="mt-2 text-gray-700 dark:text-gray-300">✅ All compliance requirements met</p>
            )}
          </div>
        ))}
      </div>
    </div> </div>
  );
};

export default ProductList;
