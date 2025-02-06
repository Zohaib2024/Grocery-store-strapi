import Image from "next/image";
//
import { IoSearchOutline } from "react-icons/io5";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/Dark-mode";
import { Input } from "@/components/ui/input";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { UserStatus } from "./Userstatus";
// import { client } from "@/sanity/lib/client";
//

interface Product {
  title: string;
}

export default async function Header() {
  return (
    <div className="shadow-md">
      <div className="flex flex-row justify-between items-center mx-5 my-2">
        <div className="flex flex-row gap-1 md:gap-10 justify-between items-center">
          <Link href="/">
            <div className="flex flex-col justify-center items-center w-[50px]  md:w-[200px] ml-5 ">
              <div>
                <Image
                  src="/Fruits.png"
                  width={10}
                  height={500}
                  alt="Logo"
                  unoptimized
                  className=" flex  w-[50px] md:w-[100px] "
                />
              </div>
              <div>
                <h1 className="text-center text-xs md:text-2xl font-extrabold">
                  <span className="text-green-700">O</span>rganic
                  <span className="text-orange-700"> Store</span>
                </h1>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex flex-row gap-5 justify-center items-center">
          <div className="hidden md:block">
            {/* <div className="relative  px-1 md:px-4 py-1 md:py-3 rounded-full flex flex-row items-center gap-2">
              <IoSearchOutline size={20} />
              <Input
                type="text"
                placeholder="Search"
                className="h-8 md:h-10 items-center w-32 md:w-auto px-2"
                value=""
              />
            </div> */}
          </div>

          <div className="space-x-5 flex flex-row justify-center items-center h-auto">
            <ModeToggle />

            <UserStatus />
          </div>
        </div>
      </div>
    </div>
  );
}
