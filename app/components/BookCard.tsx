"use client";

import React from "react";
import { useMainStore } from "@/store/MainStore";

interface BookProps {
  book: Book;
  innerRef?: (node?: Element | null | undefined) => void;
}

const BookCard: React.FC<BookProps> = ({ book, innerRef }) => {
	const [cart, addToCart] = useMainStore((state) => [
		state.cart,
		state.addToCart,
	]);
	const _addToCart = () => {
		addToCart(book, 1);
	}
	const _addedToCart = (book: Book) => {
		if (!cart?.items) return 0;
		const item = cart.items.find((it: CartItem) => { return it.book.id == book.id });
		return item?.qty || 0;
	}
  const currency = (value: any) => {
    if (value != null) {
      value = value.toFixed(2);
      let curr = "";
      let positiveValue = value.toString().split(".")[0];
      let decimalValue =
        value.toString().split(".").length > 1
          ? value.toString().split(".")[1]
          : "00";
      let currRev = positiveValue.toString().split("").reverse().join("");
      for (let i = 0; i < currRev.length; i++) {
        if (i % 3 == 0) {
          curr += currRev.substr(i, 3) + ",";
        }
      }

      let totalString = curr
        .split("", curr.length - 1)
        .reverse()
        .join("");
      return `${totalString} ${decimalValue > 0 ? "." + decimalValue : ""}`;
    }
  };
  return (
    <React.Fragment>
      <div className="w-full flex flex-col relative gap-4" ref={innerRef}>
        <div className="rounded-md overflow-hidden relative">
          <img src={book.image} alt={book.title} className="w-full" />
        </div>
        <div className="block line-clamp-2 mt-2 text-ellipsis overflow-hidden break-words font-bold">
          {book.title}
        </div>
        <div className="block line-clamp-2 text-ellipsis overflow-hidden break-words">
          {book.writer}
        </div>
        <div className="w-full flex gap-1 items-center justify-between font-semibold mt-2">
          <div className="flex items-center">
            <span className="text-xs text-secondary font-bold">$</span>
            <span>{currency(book.point)}</span>
          </div>
          <div
            className="flex relative items-center text-xs font-normal bg-primary text-white rounded-xl py-2 px-4 cursor-pointer"
            onClick={() => _addToCart()}
          >
            {_addedToCart(book)! > 0 && (
              <span className="flex items-center justify-center p-2 absolute left-[-5px] top-[-5px] bg-secondary text-white w-[15px] h-[15px] rounded-full text-[7px] font-bold">
                {_addedToCart(book)}
              </span>
            )}
            <span> Add to Cart</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {book.tags.map((tag: string) => {
            return (
              <span
                key={tag}
                className="p-1 text-secondary text-[9px] bg-red-200/20"
              >
                {tag}
              </span>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
}

export default BookCard;
