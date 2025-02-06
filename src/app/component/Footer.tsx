"use client";
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

// import { usePathname } from "next/navigation";
import Cart from "./Cart";

export default function Footer() {
  // const pathname = usePathname();
  return (
    <div>
      <Cart />
      <footer className="bg-green-800 text-black pt-14 pb-3 ">
        {/* {pathname !== "/checkout" && <Cart />} */}

        {/* LEFT START */}
        <div className="flex justify-center items-center mb-5">
          {/* MENU START */}

          {/* MENU END */}

          {/* NORMAL MENU START */}
          <div className="flex justify-center items-center">
            {/* MENU START */}

            {/* MENU END */}

            {/* MENU START */}

            <div className=" ">
              <div className="flex gap-4 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer">
                  <FaFacebookF size={20} />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer">
                  <FaTwitter size={20} />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer">
                  <FaYoutube size={20} />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer">
                  <FaInstagram size={20} />
                </div>
              </div>
            </div>
            {/* MENU END */}
          </div>
          {/* NORMAL MENU END */}
        </div>
        {/* LEFT END */}

        {/* RIGHT START */}
        <div className="flex justify-center items-center   flex-col">
          <div className="text-[12px]  text-white pb-5 hover:text-white cursor-pointer text-center md:text-left">
            © 2024 Grocery store, Inc. All Rights Reserved
          </div>
          <div className="flex gap-2 md:gap-5 pb-5 text-center md:text-left flex-wrap justify-center">
            <div className="text-[12px] text-white hover:text-white cursor-pointer">
              Guides
            </div>
            <div className="text-[12px] text-white hover:text-white cursor-pointer">
              Terms of Sale
            </div>
            <div className="text-[12px] text-white hover:text-white cursor-pointer">
              Terms of Use
            </div>
            <div className="text-[12px] text-white hover:text-white cursor-pointer">
              Privacy Policy
            </div>
          </div>
        </div>
        {/* RIGHT END */}
      </footer>
    </div>
  );
}
