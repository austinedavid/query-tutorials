"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";

const Left = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["todo"],
    queryFn: async () => {
      const response = await fetch("/api");
      const result = await response.json();
      return result;
    },
  });
  //   if is loading
  if (isLoading) {
    return <div className=" flex-1">loading...</div>;
  }
  // if is error
  if (isError) {
    return <div className=" flex-1">{error.message}</div>;
  }
  // then our data
  return (
    <div className=" flex-1">
      {Array.isArray(data) &&
        data.map((item: any) => (
          <div className=" flex gap-1">
            <p>{item.id}</p>
            <p>{item.title}</p>
            <p>{item.desc}</p>
          </div>
        ))}
    </div>
  );
};

export default Left;
