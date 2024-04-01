"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <div className="bg-gray-700 w-screen h-14">
      <div className="w-full h-14 flex justify-between items-center">
        <div className="w-1/4 pl-2">
          <Image src="/icons/logo.svg" width={50} height={50} alt="Logo" />
        </div>
        <div className="pr-4 outline-none flex gap-x-5">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <IoMenu className="text-xl outline-none" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="h-60 w-48 flex flex-col items-center gap-y-5 bg-gray-900 rounded-xl border-0">
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {" "}
                <Link
                  href="/"
                  className={`hover:text-blue-500 text-lg font-semibold transition-all duration-300 ease-in-out ${
                    pathname === "/" ? "text-blue-500" : "text-white"
                  }`}
                >
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/healthAI"
                  className={`hover:text-blue-500 font-semibold text-lg transition-all duration-300 ease-in-out ${
                    pathname === "/healthAI" ? "text-blue-500" : "text-white"
                  }`}
                >
                  AI Health
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/healthNews"
                  className={`hover:text-blue-500 font-semibold transition-all text-lg duration-300 ease-in-out ${
                    pathname === "/healthNews" ? "text-blue-500" : "text-white"
                  }`}
                >
                  News
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        <UserButton/>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
