"use client";

import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper/modules";

import CollectionCard from "./CollectionCard";

interface Props {
  collections: any[];
}

function Collections(props: Props) {
  const collections = props.collections;
  return (
    <div className="w-full flex flex-col gap-12 max-w-[960px] mx-auto">
      {collections.map((col: any) => {
        return (
          <div
            className="flex w-full items-start px-4 max-w-[960px] mx-auto gap-4 flex-col md:flex-row relative"
            key={col.id}
          >
            <div className="w-full flex flex-col gap-2 flex-2 md:min-w-[240px]">
              <span className="text-xl font-bold">{col.title}</span>
              <span className="text-xs text-slate-400">{col.subtitle}</span>
            </div>
            <div className="w-full swiper-parent hidden md:flex">
              <Swiper
                navigation={true}
                modules={[Navigation, Autoplay]}
                spaceBetween={10}
                slidesPerView={4}
                loop={col.items.length > 4}
                autoplay={{ delay: 4000 }}
                className="w-full collection"
              >
                {col.items.map((item: any) => {
                  return (
                    <SwiperSlide className="w-full" key={item.key}>
                      <CollectionCard item={item} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <div className="w-full flex md:hidden">
              <div className="w-full grid grid-cols-2 gap-4">
                {col.items.map((item: any) => {
                  return <CollectionCard item={item} key={item.entityId} />;
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Collections;
