"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import dynamic from "next/dynamic";
import Heading from "../component/Heading";
import { Card } from "@/components/ui/card";

const Header = dynamic(() => import("../component/Header"), { ssr: false });

export default function UserStatus() {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userData = Cookies.get("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      fetch("http://localhost:1337/api/orders")
        .then((response) => response.json())
        .then((data) => {
          if (data && data.data) {
            const matchedOrders = data.data.filter(
              (order: any) => order.email === parsedUser.email
            );
            if (matchedOrders.length > 0) {
              setOrders(matchedOrders);
            }
          }
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to fetch orders");
          setLoading(false);
        });
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <Heading title="Order Details" />
        <Card>
          <div className=" shadow-lg rounded-lg p-6 mt-4">
            {user ? (
              <>
                {loading ? (
                  <p className="text-blue-500">Loading orders...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : orders.length > 0 ? (
                  <div>
                    <ul className="space-y-4">
                      {orders.map((order) => (
                        <li
                          key={order.id}
                          className="border rounded-lg p-4 shadow-md"
                        >
                          <p className="text-lg font-medium">
                            Order ID: {order.id}
                          </p>
                          <p className="">
                            Total Amount:
                            <span className="font-semibold">
                              Rs:{order.totalAmount}
                            </span>
                          </p>
                          <p className="">
                            Status:
                            <span
                              className={`ml-2 px-2 py-1 text-sm font-semibold rounded text-black ${
                                order.orderStatus === "Paid"
                                  ? "bg-green-500"
                                  : order.orderStatus === "Failed"
                                  ? "bg-red-500"
                                  : order.orderStatus === "Pending"
                                  ? "bg-yellow-500"
                                  : "bg-gray-500" // Default case if the status doesn't match any specific ones
                              }`}
                            >
                              {order.orderStatus}
                            </span>
                          </p>

                          <h4 className="font-semibold mt-2">Items:</h4>
                          <ul className="list-disc list-inside">
                            {order.items.map((item: any, index: number) => (
                              <li key={index} className="">
                                {item.name} - {item.quantity} x ${item.price}
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="">No orders found.</p>
                )}
              </>
            ) : (
              <p className="">Please log in to view your orders.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
