"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Link } from "lucide-react";
import Image from "next/image";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in cookies
        Cookies.set("jwt", data.jwt, { expires: 7, secure: true });
        Cookies.set("user", JSON.stringify(data.user), {
          expires: 7,
          secure: true,
        });

        router.push("/"); // Redirect to dashboard or another page
      } else {
        setError(data.error.message || "Authentication failed.");
      }
    } catch (err) {
      setError("An error occurred while logging in.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Login
              </Button>

              {error && (
                <div className="text-red-500 text-center mt-2">{error}</div>
              )}
            </div>
          </form>
          <Image
            src="/login.jpg"
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </CardContent>
      </Card>
      <div className="text-center">
        <span>Create new account? </span>
        <a href="/sign-up">Sign up</a>
      </div>
    </div>
  );
}
