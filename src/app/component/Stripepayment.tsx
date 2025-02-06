"use client";

import convertToSubCurrency from "@/lib/ConvertToSubCurrency";
import CheckoutPage from "../Stipecheckout/page";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Card } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const StripePayment = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const amount = totalPrice;
  return (
    <div>
      <Card>
        <h1 className="text-6xl font-bold text-center">
          {/* Your Total amount is {amount} */}
        </h1>

        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubCurrency(amount),
            currency: "usd",
          }}
        >
          <CheckoutPage amount={amount} />
        </Elements>
      </Card>
    </div>
  );
};

export default StripePayment;
