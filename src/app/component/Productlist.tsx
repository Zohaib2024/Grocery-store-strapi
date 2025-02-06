"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import {
  addToCart,
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
} from "@/lib/features/todos/cartSlice";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "http://localhost:1337/api/products?populate=*",
          { cache: "no-store" }
        );
        const data = await res.json();
        setProducts(data?.data || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product: any) => {
    setSelectedProduct(product);
  };

  const confirmAddToCart = () => {
    if (selectedProduct) {
      const existingItem = cartItems.find(
        (item) => item.id === selectedProduct.id
      );

      if (existingItem) {
        dispatch(increaseQuantity(selectedProduct.id));
      } else {
        dispatch(
          addToCart({
            id: selectedProduct.id,
            name: selectedProduct.Title,
            price: selectedProduct.Price,
            image: selectedProduct.Image?.url || "/Fruits.png",
            quantity: 1,
          })
        );
      }
    }
    setSelectedProduct(null); // Close the popup
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product: any, index: number) => {
          const imageUrl = product.Image?.formats?.thumbnail?.url
            ? `http://localhost:1337${product.Image.formats.thumbnail.url}`
            : "/Fruits.png";

          return (
            <ProductCard
              key={index}
              product={product}
              imageUrl={imageUrl}
              onAddToCart={handleAddToCart}
              cartItems={cartItems}
              dispatch={dispatch}
            />
          );
        })}
      </div>

      {/* Custom Popup Window */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <Card>
            <div className=" flex p-5">
              {/* Image Section */}
              <div className="flex-shrink-0 mr-6">
                <Image
                  src={
                    selectedProduct.Image?.formats?.thumbnail?.url
                      ? `http://localhost:1337${selectedProduct.Image.formats.thumbnail.url}`
                      : "/Fruits.png"
                  }
                  width={200}
                  height={200}
                  alt={selectedProduct.Title}
                  className="rounded-md"
                />
              </div>

              {/* Product Details Section */}
              <div className="flex-grow">
                <h2 className="text-4xl font-bold mb-2">
                  {selectedProduct.Title}
                </h2>
                <p className="text-gray-600 text-md mb-2">
                  {selectedProduct.Description}
                </p>

                <div className="flex items-center mb-2">
                  {/* Discount Price */}
                  <p className="text-green-700  font-semibold">Rs: </p>
                  <p className="text-green-700 text-3xl font-semibold">
                    {selectedProduct.Price - selectedProduct.Discount_price}
                  </p>
                  {/* Original Price with strike-through */}
                  <p className="text-green-700 ml-7  font-semibold">Rs: </p>
                  <p className="text-gray-500 text-3xl  line-through">
                    {selectedProduct.Price}
                  </p>
                </div>

                {/* Buttons Section */}
                <div className="flex justify-between mt-4 gap-2 ">
                  <Button
                    onClick={confirmAddToCart}
                    className="bg-green-700 hover:bg-green-800 w-full text-white"
                  >
                    Confirm
                  </Button>
                  <Button
                    onClick={() => setSelectedProduct(null)}
                    className="bg-gray-500 hover:bg-gray-600 w-full text-white"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

function ProductCard({
  product,
  imageUrl,
  onAddToCart,

  dispatch,
}: {
  product: any;
  imageUrl: string;
  onAddToCart: (product: any) => void;
  cartItems: any[];
  dispatch: any;
}) {
  return (
    <Card className="p-4 flex flex-col items-center mb-10">
      <div className="flex flex-col items-center">
        <CardTitle className="text-lg md:text-2xl mb-2">
          {product.Title}
        </CardTitle>
        <CardDescription className="text-gray-600 text-md md:text-xl text-center mb-4">
          Rs {product.Price}
        </CardDescription>
        <Image
          src={imageUrl}
          width={200}
          height={200}
          alt={product.Title}
          className="rounded-md mb-4 w-[200px] md:w-auto"
        />
      </div>

      <Button
        onClick={() => onAddToCart(product)}
        className="bg-green-700 hover:bg-green-800 text-white md:h-10"
      >
        Add to Cart
      </Button>
    </Card>
  );
}
