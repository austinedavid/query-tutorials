"use client";

import React from "react";
import { useQuery, useQueries } from "@tanstack/react-query";

interface Iuser {
  id: number;
  email: string;
}

const ParallelLayout = () => {
  const { data: user } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch("/api/users");
      const result = await response.json();
      return result;
    },
  });
  if (user) {
    // trying parallel query using usequeries
    const data = useQueries({
      queries: user.map((user: any) => {
        return {
          queryKey: ["userProduct", user.id],
          queryFn: async () => {
            const response = await fetch(`/api/users/${user.id}`);
            const result = await response.json();
            return result;
          },
        };
      }),
    });
  }

  return (
    <div>
      <p>here </p>
    </div>
  );
};

export default ParallelLayout;
