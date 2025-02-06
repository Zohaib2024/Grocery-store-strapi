"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

// Define a type for the categories
interface Category {
  id: number;
  Title: string;
  Image: {
    url: string;
  };
}

export function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("http://localhost:1337/api/categories?populate=*")
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          setCategories(
            data.data.map((item: any) => ({
              id: item.id,
              Title: item.Title,
              Image: { url: `http://localhost:1337${item.Image.url}` },
            }))
          );
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Limit the number of categories based on screen size
  const visibleCategories = categories.slice(0, 5);
  const mobilevisibleCategories = categories.slice(0, 3); // Show only the first 5 items

  return (
    <div>
      <div className="hidden lg:block ">
        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-5 gap-6 p-6">
          {visibleCategories.map((category) => (
            <Card
              key={category.id}
              className="w-full h-auto flex flex-col items-center justify-center shadow-lg"
            >
              <CardContent className="flex flex-col items-center justify-center p-6">
                <img
                  src={category.Image.url}
                  alt={category.Title}
                  className="w-full h-[100px] object-cover rounded-lg"
                />
                <span className="text-2xl font-semibold mt-2">
                  {category.Title}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="block lg:hidden">
        <div className="grid  grid-cols-3 sm:grid-cols-2 lg:grid-cols-5 gap-6 p-6">
          {mobilevisibleCategories.map((category) => (
            <Card
              key={category.id}
              className="w-full h-auto flex flex-col items-center justify-center shadow-lg"
            >
              <CardContent className="flex flex-col items-center justify-center p-6">
                <img
                  src={category.Image.url}
                  alt={category.Title}
                  className="w-[50px] h-[50px] object-cover rounded-lg"
                />
                <span className="text-md font-semibold mt-2">
                  {category.Title}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
