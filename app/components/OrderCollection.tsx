"use client";

import React, { useEffect } from "react";
import OrderCard from "./OrderCard";
import { useInView } from "react-intersection-observer";
import { useMainStore } from "@/store/MainStore";
import { useInfiniteQuery } from "@tanstack/react-query";

function OrderCollection() {
  const { ref, inView } = useInView();
  const [loading, page, fetching, searchKey, orders, retrieveOrders, setPage] =
    useMainStore((state) => [
      state.loading,
      state.page,
      state.fetching,
      state.searchKey,
      state.orders,
      state.retrieveOrders,
      state.setPage,
    ]);
  const filteredOrders = () => {
    if (searchKey)
      return orders.filter((order: Order) => {
        return order.id.toString().indexOf(searchKey) > -1;
      });
    return orders;
  };
  const loadMore = ({ pageParam }: { pageParam: number }) => {
    setPage(pageParam);
    retrieveOrders();
  };
  const { fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["orders"],
    queryFn: loadMore,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      //const nextPage = lastPage.length === 10 ? allPages.length * 10 : undefined;
      const nextPage = allPages.length + 1;
      return nextPage;
    },
  });
  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, fetchNextPage, hasNextPage]);

  if (loading) {
    return (
      <div className="w-full h-full p-4 flex flex-col items-center justify-center">
        Loading...
      </div>
    );
  }
  return (
    <div className="flex w-full items-start px-4 max-w-[500px] mx-auto gap-4 flex-col relative pt-24">
      <div className="w-full flex">
        <div className="w-full flex flex-col gap-8">
          {filteredOrders().map((order: Order, i) => {
            const rows = filteredOrders().length / page;
            const idx = (i + 1) / page;
            if (idx == rows)
              return (
                <OrderCard
                  order={order}
                  key={`${order.id}-${i}`}
                  innerRef={ref}
                />
              );
            return <OrderCard order={order} key={`${order.id}-${i}`} />;
          })}
        </div>
        {fetching && (
          <div className="text-primary fixed bottom-10 font-bold w-full flex items-center justify-center">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderCollection;
