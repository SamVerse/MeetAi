"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";


export const HomeView = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.greeting.queryOptions({ name: "Sameer" }));
  return (
    <div>
      {data?.message}
    </div>
  )
}