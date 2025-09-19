"use client"
import { useQuery } from "@tanstack/react-query";

export const useStates = (options?: {enabled?: boolean}) => {
  const queryKey = ["country-states"];

  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      const res = await fetch("/api/country-states", {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Falha ao buscar estados");
      }

      return res.json();
    },
    staleTime: 5 * 1000,
    ...options,
  });

  return queryResult;
};
