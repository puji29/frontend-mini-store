"use client";
import { Button } from "@/components/ui/button";
import { CircleUserRound, LayoutGrid, Search, ShoppingBag } from "lucide-react";
import React, { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import GlobalApi from "@/lib/GlobalApi";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Header() {
  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter()

  let isLogin = false;

  useEffect(() => {
    isLogin = sessionStorage.getItem("jwt") ? true : false;
    getCategoryList();
  }, []);
  const getCategoryList = async () => {
    GlobalApi.getCategory().then((res) => {
      setCategoryList(res.data);
      
    });
  };

  const onSignOut=()=>{
    sessionStorage.clear()
    router.push('/sign-in')
  }
  return (
    <div className="p-5 shadow-sm flex justify-between">
      <div className="flex items-center gap-8">
        <img src="/logo.png" alt="logo" width={40} height={50} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h2
              className=" hidden md:flex gap-2 items-center 
            border rounded-full p-2 px-10 bg-slate-200 cursor-pointer
            "
            >
              <LayoutGrid className="h-5 w-5" /> Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browser Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categoryList.map((category, index) => (
              <Link key={index} href={"/product-category/" + category.name}>
                <DropdownMenuItem
                  key={category.id}
                  className="flex gap-4 items-center cursor-pointer"
                >
                  <img src={category?.url} alt="icon" width={30} height={30} />
                  <h2 className="text-lg">{category?.name}</h2>
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="md:flex gap-3 items-center border rounded-full p-2 px-5 hidden ">
          <Search />
          <input type="text" placeholder="Search.." className="outline-none" />
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <h2 className="flex gap-2 items-center text-lg">
          <ShoppingBag />0
        </h2>
        {isLogin ? 
          <Link href={"/sign-in"}>
            <Button>Login</Button>
          </Link>
         : 
          <DropdownMenu>
            <DropdownMenuTrigger asChild >
              <CircleUserRound className="bg-green-100 text-primary p-2 rounded-full cursor-pointer h-12 w-12" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>My Order</DropdownMenuItem>
              <DropdownMenuItem onClick={()=>onSignOut()}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      </div>
    </div>
  );
}

export default Header;
