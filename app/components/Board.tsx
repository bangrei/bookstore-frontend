"use client";

import React, { useEffect } from "react";
import BookCollection from "./BookCollection";
import { useMainStore } from "@/store/MainStore";

function Board() {
  const [resetPage] = useMainStore((state) => [state.resetPage]);
  useEffect(() => {
    resetPage();
  }, []);
  return (
    <div className="w-full h-full flex flex-col gap-12 bg-white">
      <BookCollection />
    </div>
  );
}

export default Board;
