"use client";
import { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubCurrency from "@/lib/ConvertToSubCurrency";
import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "@/lib/features/todos/cartSlice";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { updateTotalAmount } from "@/lib/features/todos/cartSlice";
const CheckoutPage = () => {
  const myhost = window.location.host;
  let URL =
    myhost === "localhost:3000"
      ? "http://localhost:3000"
      : "https://stripe-payment-one-nu.vercel.app";

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector((state: RootState) => state.cart.totalAmount);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateTotalAmount());
  }, [cartItems, dispatch]);

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setError] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: convertToSubCurrency(totalPrice) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [totalPrice]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const { error: submitErrors } = await elements.submit();
    if (submitErrors) {
      setError(submitErrors.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${URL}/payment-success?amount=${totalPrice}`,
      },
    });

    if (error) setError(error.message);
    else setError("");
    setLoading(false);
  };

  return (
    <div className="flex justify-center">
      <Card>
        <CardContent>
          <div className="p-6 w-auto lg:w-[600px] shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty</p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center mb-4"
                  >
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="mt-1">Rs. {item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-bold">
                      Rs. {item.price * item.quantity}
                    </p>
                  </div>
                ))
              )}
              {cartItems.length > 0 && (
                <div className="flex justify-between items-center mt-4">
                  <h3 className="font-bold">Total Price:</h3>
                  <p className="font-bold text-2xl mb-10">Rs. {totalPrice}</p>
                </div>
              )}
              {cartItems.length > 0 && <Link href="/checkout" />}
            </div>
            <form onSubmit={handleSubmit} className="w-full p-2 md:p-8">
              {clientSecret && <PaymentElement />}
              <button
                className="w-full bg-black text-white py-2 mt-5"
                disabled={loading}
              >
                {loading ? "Processing..." : "Pay Now"}
              </button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutPage;
