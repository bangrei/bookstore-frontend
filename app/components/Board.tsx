"use client";

import React from "react";
import BookCollection from "./BookCollection";

function Board() {
  return (
    <div className="w-full h-full flex flex-col gap-12 bg-white">
      <BookCollection />
    </div>
  );
}

export default Board;
