"use client";

import convertToSubCurrency from "@/lib/ConvertToSubCurrency";
import CheckoutPage from "../Stipecheckout/page";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Card } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

// Ensure the Stripe key is available before loading Stripe
const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
if (!stripeKey) {
  console.error("Stripe Publishable Key is missing.");
}

const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

const StripePayment = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (!stripePromise) {
    return (
      <div className="text-center text-red-500">
        Error: Stripe is not initialized. Please check your environment
        variables.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="p-6 shadow-lg rounded-lg w-full max-w-lg">
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubCurrency(totalPrice),
            currency: "usd",
          }}
        >
          <CheckoutPage amount={totalPrice} />
        </Elements>
      </Card>
    </div>
  );
};

export default StripePayment;
