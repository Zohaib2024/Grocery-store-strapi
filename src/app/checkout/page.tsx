"use client";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";

interface Item {
  name: string;
  quantity: number;
  price: number;
}

interface FormData {
  name: string;
  email: string;
  items: Item[];
  totalAmount: number;
  orderStatus: string;
  stripePaymentId: string;
}

export default function CheckoutPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    items: [],
    totalAmount: 0,
    orderStatus: "Pending",
    stripePaymentId: "",
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for managing popup visibility

  useEffect(() => {
    const userData = Cookies.get("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      // Set user details from cookies
      setFormData((prev) => ({
        ...prev,
        name: parsedUser.username || "",
        email: parsedUser.email || "",
      }));
    }
  }, []);

  // Update formData.items when cartItems change
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      items: cartItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: cartItems.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      ),
    }));
  }, [cartItems]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const totalAmount = Math.round(formData.totalAmount);

    const payload = {
      data: {
        ...formData,
        totalAmount,
      },
    };

    console.log("Sending payload:", JSON.stringify(payload, null, 2));

    try {
      const response = await fetch("http://localhost:1337/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();
      console.log("Response:", responseData);

      if (response.ok) {
        setIsPopupOpen(true); // Open the payment popup after order is placed
      } else {
        alert(`Failed to place order: ${responseData.error.message}`);
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Error submitting order");
    }
  };

  return (
    <div>
      <DynamicComponentWithNoSSR />

      <Card className="max-w-md mx-auto p-4 shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4">Checkout</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </label>

          <div className="mt-4">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p>Rs. {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-bold">Rs. {item.price * item.quantity}</p>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="flex justify-between items-center mt-4">
              <h3 className="font-bold">Total Price:</h3>
              <p className="font-bold">Rs. {formData.totalAmount}</p>
            </div>
          )}

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Place Order
          </button>
        </form>
      </Card>

      {/* Payment Popup (Modal) */}
      {isPopupOpen && (
        <div className="fixed inset-0   flex justify-center items-center">
          <DynamicComponentofpayment />
          {/* <button
              onClick={() => setIsPopupOpen(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
            >
              Close
            </button> */}
        </div>
      )}
    </div>
  );
}

const DynamicComponentofpayment = dynamic(
  () => import("@/app/component/Stripepayment"),
  { ssr: false }
);

const DynamicComponentWithNoSSR = dynamic(
  () => import("@/app/component/Header"),
  { ssr: false }
);
