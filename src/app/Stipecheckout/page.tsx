"use client";
import { useState, useEffect, Suspense } from "react";
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
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Header from "../component/Header";

const CheckoutPage = ({ amount }: { amount: number }) => {
  console.log(window.location.host);

  const myhost = window.location.host;
  let URL = "";

  if (myhost === "localhost:3000") {
    URL = "http://localhost:3000";
  } else {
    URL = "https://stripe-payment-one-nu.vercel.app";
  }

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setError] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  // as the payment method changes it is necessary to generate a new client secret.
  useEffect(() => {
    fetch("api/payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubCurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Error handling
    if (!stripe || !elements) {
      return;
    }

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
        return_url: `${URL}/payment-success?amount=${amount}`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        {/* <div className="flex min-h-svh flex-col items-center  bg-muted p-6 md:p-10">
          <div className="w-full ">
            <div className="container mx-auto px-4 py-8"> */}
        <div className=" ">
          <div className=" flex justify-center ">
            <Card>
              <CardContent>
                <div className=" p-6 w-auto lg:w-[600px] shadow-md rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                  <div className="space-y-4">
                    {/* Product List */}
                    <div className="flex flex-col justify-between">
                      {cartItems.length === 0 ? (
                        <p className="text-center text-gray-500">
                          Your cart is empty
                        </p>
                      ) : (
                        cartItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex justify-between items-center mb-4"
                          >
                            <div className="flex   items-center space-x-4">
                              <div>
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="mt-1">Rs. {item.price}</p>
                                <p className="">Quantity: {item.quantity}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <p className="font-bold">
                                Rs. {item.price * item.quantity}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {cartItems.length > 0 && (
                      <div className="flex justify-between items-center mt-4">
                        <h3 className="font-bold">Total Price:</h3>
                        <p className="font-bold text-2xl mb-10">
                          Rs. {totalPrice}
                        </p>
                      </div>
                    )}
                    {cartItems.length > 0 && <Link href="/checkout"></Link>}
                  </div>
                  <form onSubmit={handleSubmit} className="w-full p-2 md:p-8">
                    {clientSecret && <PaymentElement />}
                    <button className="w-full bg-black text-white py-2 mt-5">
                      Pay Now
                    </button>
                  </form>

                  {/* <button className="w-full bg-black text-white py-2 mt-5">
                    Cash Payment
                  </button> */}
                  {/* <div className="flex justify-between">
              <span className="text-lg font-medium">Shipping</span>
              <span className="text-lg font-medium">$10.00</span>
            </div> */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* </div>
          </div>
        </div>  */}
      </div>
    </div>
  );
};

export default CheckoutPage;
