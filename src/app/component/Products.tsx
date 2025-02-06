"use client";
import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "@/app/services/productService";
import Link from "next/link";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    window.location.reload(); // Refresh the page after deletion
  };

  return (
    <div>
      <h1>Product List</h1>
      <Link href="/admin/create-product">
        <button>Add Product</button>
      </Link>
      <ul>
        {products.map((product) => (
          <div key={product.id}>
            <h2>{product.Title}</h2>
            <p>{product.Description}</p>
            <p>Price: ${product.Price}</p>
            <p>Discount: ${product.Discount_price}</p>
          </div>
        ))}
      </ul>
    </div>
  );
}
