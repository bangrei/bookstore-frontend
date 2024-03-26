"use client";

import React, { useEffect } from "react";
import BookCard from "./BookCard";
import { useInView } from "react-intersection-observer";
import { useMainStore } from "@/store/MainStore";
import { useInfiniteQuery } from "@tanstack/react-query";

function BookCollection() {
	const { ref, inView } = useInView();
	const [loading, page, fetching, searchKey, books, retrieveBooks, setPage] = useMainStore(
    (state) => [
			state.loading,
			state.page,
			state.fetching,
			state.searchKey,
			state.books,
      state.retrieveBooks,
      state.setPage,
    ]
	);
	const filteredBooks = () => {
		if (searchKey) return books.filter((book: Book) => { return book.title.toLowerCase().indexOf(searchKey) > -1 });
		return books;
	}
	const loadMore = ({ pageParam }: { pageParam: number }) => {
    setPage(pageParam);
    retrieveBooks();
  };
	const {
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["books"],
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
    <div className="flex w-full items-start px-4 max-w-[960px] mx-auto gap-4 flex-col relative pt-24">
      <div className="w-full flex flex-col flex-2 gap-2 md:min-w-[240px]">
        <span className="font-bold text-3xl">Best Seller</span>
        <span className="text-sm text-slate-400">Books 2024</span>
      </div>
      <div className="w-full flex">
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {filteredBooks().map((book: Book, i) => {
            const rows = filteredBooks().length / page;
            const idx = (i + 1) / page;
            if (idx == rows)
              return (
                <BookCard book={book} key={`${book.id}-${i}`} innerRef={ref} />
              );
            return <BookCard book={book} key={`${book.id}-${i}`} />;
          })}
        </div>
        {fetching && (
          <div className="text-primary fixed bottom-10 font-bold w-full flex items-center justify-center">
            Load More...
          </div>
        )}
      </div>
    </div>
  );
}

export default BookCollection;
