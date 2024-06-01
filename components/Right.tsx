"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Right = () => {
  const [title, settitle] = useState<string>();
  const [desc, setdesc] = useState<string>();
  const [newMessage, setmessage] = useState<{ show: boolean; item: string }>({
    show: false,
    item: "",
  });

  //   instance of client
  const queryClient = useQueryClient();
  //   creating a post using mutation
  const mutation = useMutation({
    mutationKey: ["post"],
    mutationFn: async () => {
      const result = await fetch("/api", {
        method: "POST",
        body: JSON.stringify({ title, desc }),
      });
      return result;
    },
    onSuccess: async (result) => {
      setdesc("");
      settitle("");
      queryClient.invalidateQueries({ queryKey: ["todo"] });
      //   manage error states
      if (!result.ok) {
        const erroMessage = await result.json();
        setmessage({ show: true, item: erroMessage.message });
      }
      setTimeout(() => {
        setmessage({ show: false, item: "" });
      }, 3000);
    },
  });
  const handleSubmit = () => {
    mutation.mutate();
  };
  return (
    <div className=" flex-1 flex flex-col gap-3 text-black">
      <input value={title} onChange={(e) => settitle(e.target.value)} />
      <input value={desc} onChange={(e) => setdesc(e.target.value)} />
      <button onClick={handleSubmit} className=" px-3 py-1 bg-green-500">
        submit todo
      </button>
      <div
        className={` absolute bottom-0 right-0 transform transition-all ease-in-out duration-300 ${
          newMessage.show ? "translate-x-0" : "translate-x-full"
        } bg-red-500 text-white px-3 py-2 rounded-md`}
      >
        {newMessage.item}
      </div>
    </div>
  );
};

export default Right;
