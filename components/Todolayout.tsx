import React from "react";
import Left from "./Left";
import Right from "./Right";

const Todolayout = () => {
  return (
    <div className=" relative w-full h-screen flex gap-4 overflow-x-hidden">
      <Left />
      <Right />
    </div>
  );
};

export default Todolayout;
