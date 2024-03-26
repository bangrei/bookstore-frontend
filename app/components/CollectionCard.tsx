"use client";

import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface Props {
  item: any;
}

function CollectionCard(props: Props) {
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

  const price =
    props.item.publication.priceInfo.price ||
    props.item.publication.priceInfo.couponDiscountPrice ||
    props.item.publication.priceInfo.discountPrice;
  const rate =
    props.item.publication.priceInfo.discountRate ||
    props.item.publication.priceInfo.couponDiscountRate;
  return (
    <div className="w-full flex flex-col relative gap-4">
      <div className="rounded-md overflow-hidden relative">
        <img
          src={props.item.publication.media[0].uri}
          alt={props.item.publication.productName}
        />
        <div className="flex items-center gap-2 absolute bottom-1 left-1">
          {props.item.publication.tagsOnImage.map((tag: any) => {
            return (
              <span
                key={tag}
                className="p-1 bg-badge text-white text-xs rounded-sm"
              >
                {tag}
              </span>
            );
          })}
        </div>
      </div>
      <div className="min-h-[42px] h-[42px] block line-clamp-2 mt-2 text-ellipsis overflow-hidden break-words">
        {props.item.publication.productName}
      </div>
      <div className="flex gap-1 items-center font-semibold mt-2">
        {rate > 0 && <div className="text-secondary">{rate}%</div>}

        <div className="flex items-center">
          <span>{currency(price)}</span>
          <span className="text-xs font-thin">원</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {props.item.publication.tagsOnDesc.map((tag: any) => {
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
      <div className="flex items-center py-2">
        <StarIcon width={14} height={14} className="pb-1" />
        <span className="text-xs font-normal">
          {props.item.publication.rating}
        </span>
      </div>
      {props.item.publication.preface &&
        props.item.publication.prefaceIconUrl && (
          <div className="flex items-center px-2 py-1 rounded-sm gap-1 border border-slate-200 max-w-fit">
            <Image
              src={props.item.publication.prefaceIconUrl}
              width={16}
              height={16}
              alt={props.item.publication.preface}
            />
            <span className="text-xs font-normal">
              {props.item.publication.preface}
            </span>
          </div>
        )}
    </div>
  );
}

export default CollectionCard;
