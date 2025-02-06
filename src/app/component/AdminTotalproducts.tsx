"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminTotalproducts = () => {
  const [productCount, setProductCount] = useState<number | null>(null);

  useEffect(() => {
    // Fetch the total number of products from the Strapi API
    axios
      .get("http://localhost:1337/api/products")
      .then((response) => {
        console.log("this is total products :", response.data); // Log the full response
        // Assuming products are inside response.data.data
        const products = response.data.data;
        setProductCount(products.length);
        console.log("this is total product number :", products.length); // Log the product count
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-gray-700">Total Products</h3>
      <p className="text-2xl font-bold text-gray-900">
        {productCount !== null ? productCount : "Loading..."}
      </p>
    </div>
  );
};

export default AdminTotalproducts;
