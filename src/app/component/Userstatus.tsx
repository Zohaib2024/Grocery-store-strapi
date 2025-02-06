"use client";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function UserStatus() {
  const [user, setUser] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [AdminStatus, setAdminStatus] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userData = Cookies.get("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      // Check if the user is an admin
      if (parsedUser.email === "") {
        setAdminStatus(true);
      }
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    Cookies.remove("jwt");
    Cookies.remove("user");
    window.location.reload();
  };

  return (
    <div className="relative">
      {user ? (
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaUserCircle size={40} />
        </div>
      ) : (
        <Link href="/sign-in" className="text-blue-500">
          <Button variant="green">Login</Button>
        </Link>
      )}

      {isOpen && (
        <Card
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-40 border border-gray-200 shadow-lg rounded-md"
        >
          <div>
            <span className="block w-full text-left px-4 py-2">
              {user.username}
            </span>

            {/* Show Dashboard for Admins, User Panel for Normal Users */}
            <Link
              href={AdminStatus ? "/admin" : "/orderHistory"}
              className="block w-full text-left px-4 py-2 text-green-600 hover:bg-green-100"
            >
              {AdminStatus ? "AdminPanel" : "Orders"}
            </Link>

            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
            >
              Logout
            </button>
          </div>
        </Card>
      )}
    </div>
  );
}
