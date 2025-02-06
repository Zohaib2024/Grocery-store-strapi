"use client";
import LoginForm2 from "@/components/ui/Signup";
import Header from "../component/Header";
export default function Page() {
  return (
    <div>
      <Header />
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm2 />
        </div>
      </div>
    </div>
  );
}
