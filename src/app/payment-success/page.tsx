"use client"; // Ensure this is a client component in Next.js 13+

import { Card } from "@/components/ui/card";
import Header from "../component/Header";

interface IParams {
  searchParams: {
    amount: number;
  };
}

const PaymentSuccess = ({ searchParams }: IParams) => {
  const handleRedirect = () => {
    window.location.href = "/"; // Redirects to the home page
  };

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
        <Card className="p-8 rounded-2xl shadow-2xl text-center max-w-md w-full animate-fade-in">
          <h1 className="text-4xl font-bold">🎉 Thank You! 🎉</h1>
          <p className="text-lg mt-4">
            Your payment of
            <span className="text-green-600 font-semibold px-1">
              Rs {searchParams.amount}
            </span>
            was successful!
          </p>
          <div className="mt-6">
            <button
              onClick={handleRedirect}
              className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all"
            >
              Go to Home
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccess;
