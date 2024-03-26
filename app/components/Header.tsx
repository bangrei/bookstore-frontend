"use client";

import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import logo from "../images/logo-amazon.png";
import Image from "next/image";
import { useMainStore } from "@/store/MainStore";
import { useRouter } from "next/navigation";

function Header() {
  const [focused, setFocused] = useState(false);
  const [cart, customer, searchKey, setSearchKey] = useMainStore((state) => [
    state.cart,
    state.customer,
    state.searchKey,
    state.setSearchKey,
  ]);
  const router = useRouter();
  const gotoOrder = () => {
    router.push("/order");
  }
  const _setFocused = () => {
    setFocused(true);
    goHome();
  };
  const gotoCart = () => {
    router.push("/cart");
  };
  const login = () => {
    router.push("/login");
  };
  const goHome = () => {
    router.push("/");
  };
  return (
    <div
      className="border-b
      flex 
      flex-col
      gap-4
      w-full
      md:flex-row
      md:gap-0
      items-center
      justify-between p-4
      text-white bg-slate-700
      "
    >
      <div className="flex items-center flex-col gap-2 w-full max-w-[960px] mx-auto">
        <div className="text-sm font-light flex items-center gap-3 justify-between w-full">
          <div className="text-sm font-light flex items-center gap-3 pl-4 md:pl-0">
            <Image
              src={logo}
              alt={"logo"}
              className="max-h-[30px] w-[auto] cursor-pointer hover:opacity-80"
              onClick={() => goHome()}
            />
          </div>

          <div className="group flex">
            <div
              className={`px-4 py-2 flex items-center gap-2 border-[3px] bg-white rounded-md ml-6 relative ${
                focused ? "border-primary" : "border-white"
              }`}
            >
              <input
                onFocus={() => _setFocused()}
                onBlur={() => setFocused(false)}
                onChange={(e) => setSearchKey(e.target.value)}
                type="search"
                placeholder="Search book"
                className="font-light text-sm text-black outline-none bg-transparent border-none min-w-[50px] md:min-w-[250px]"
              />
              <MagnifyingGlassIcon
                width={20}
                height={20}
                color="rgb(0,0,0,0.5)"
                className="cursor-pointer"
              />
            </div>
          </div>

          <div className="text-sm font-light flex items-center gap-2 text-white">
            <div className="flex flex-col md:flex-row md:gap-3">
              {customer && <div>Hi, {customer.firstName}</div>}
              {!customer && (
                <div
                  onClick={() => login()}
                  className="md:font-semibold underline md:no-underline cursor-pointer whitespace-nowrap hover:opacity-70 text-xs md:text-md"
                >
                  Sign in
                </div>
              )}
              <div className="hidden w-2 md:flex justify-center">|</div>
              {customer && (
                <div className="flex items-center gap-2">
                  <div className="md:font-semibold underline md:no-underline cursor-pointer whitespace-nowrap hover:opacity-70 text-xs md:text-md">
                    <span onClick={() => gotoOrder()}>Orders</span>
                  </div>
                  <div className="hidden w-2 md:flex justify-center">|</div>
                </div>
              )}
            </div>
            <div
              onClick={() => gotoCart()}
              className="font-semibold cursor-pointer whitespace-nowrap hover:opacity-70 flex items-center gap-2 relative"
            >
              <ShoppingCartIcon
                width={24}
                height={24}
                color="rgb(255,255,255)"
                className="cursor-pointer"
              />
              {cart && cart.totalQty && (
                <div className="p-2 top-[-10px] left-[10px] rounded-full w-[10px] h-[10px] bg-secondary text-white text-xs flex items-center justify-center absolute">
                  {cart?.totalQty}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
