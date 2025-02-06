"use client";
import { useState, ChangeEvent } from "react";

// Define types for the product state
interface Product {
  Title: string;
  Description: string;
  Price: string;
  Discount_price: string;
}

export default function AddProduct() {
  // Explicitly type the product state
  const [product, setProduct] = useState<Product>({
    Title: "",
    Description: "",
    Price: "",
    Discount_price: "",
  });

  // Type the event parameter for handleChange
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    const formData = new FormData();
    formData.append("data[Title]", product.Title);
    formData.append("data[Description]", product.Description);
    formData.append("data[Price]", product.Price);
    formData.append("data[Discount_price]", product.Discount_price);

    try {
      const response = await fetch("http://localhost:1337/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`, // Add your API key or token if required
        },
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Product added successfully!");
        setProduct({
          Title: "",
          Description: "",
          Price: "",
          Discount_price: "",
        });
      } else {
        alert("Error adding product!");
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4">Add New Product</h2>

      <input
        type="text"
        name="Title"
        placeholder="Product Title"
        value={product.Title}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="text"
        name="Description"
        placeholder="Description"
        value={product.Description}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="number"
        name="Price"
        placeholder="Price"
        value={product.Price}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="number"
        name="Discount_price"
        placeholder="Discount Price"
        value={product.Discount_price}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
      />

      <button
        onClick={addProduct}
        className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600"
      >
        Add Product
      </button>
    </div>
  );
}
