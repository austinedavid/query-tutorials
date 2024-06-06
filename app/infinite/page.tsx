"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import React, { useEffect } from "react";
interface Idetails {
  id: number;
  name: string;
  desc: string;
}

const page = () => {
  const { ref, inView } = useInView();
  // function to get data
  const getUser = async ({ pageParam }: { pageParam: number }) => {
    const response = await fetch(`api/infinite?cursor=${pageParam}`);
    const result = await response.json();
    return result;
  };
  // make use of infinitequery
  const {
    data,
    status,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: getUser,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      const nextPage = lastPage.length !== 0 ? allPage.length + 1 : undefined;
      return nextPage;
    },
  });
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  //   check if pending
  if (status === "pending") {
    return <p>loading...</p>;
  }
  // check for errors
  if (status === "error") {
    return <p>{error.message}</p>;
  }
  // render the page
  const FlattedUser = data.pages.flat();

  return (
    <div className=" w-full  flex items-center flex-col gap-3">
      {FlattedUser.map((item: Idetails, index) => (
        <div className=" px-2 py-6 rounded-md bg-green-600">
          <p>{item.id}</p>
          <p>{item.name}</p>
          <p>{item.desc}</p>
        </div>
      ))}
      <button ref={ref}>
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </button>
    </div>
  );
};

export default page;
