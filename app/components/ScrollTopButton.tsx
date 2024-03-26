"use client";

import React, { useEffect, useState } from "react";
import { useMainStore } from "@/store/MainStore";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

function ScrollTopButton() {
  const [loading] = useMainStore((state) => [state.loading]);
  const [showButton, setShowButton] = useState(false);

  const isBrowser = () => typeof window !== "undefined";
  const scrollToTop = () => {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!isBrowser()) return;
    return window.addEventListener("scroll", () => {
      var pos = window.scrollY;
      var windowHeight = window.innerHeight;
      setShowButton(pos > windowHeight);
    });
  }, []);

  if (loading || !showButton) {
    return <div></div>;
  }

  return (
    <div
      onClick={scrollToTop}
      className="fixed bottom-[100px] cursor-pointer z-50 right-4 w-[50px] h-[50px] rounded-full border-2 bg-white border-slate-300 flex items-center justify-center"
    >
      <ChevronUpIcon
        width={30}
        height={30}
        className="text-slate-400 font-thin"
      />
    </div>
  );
}

export default ScrollTopButton;
