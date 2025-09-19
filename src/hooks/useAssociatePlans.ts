"use client"
import { useQuery } from "@tanstack/react-query";

export const useAssociatePlans = (options?: {enabled?: boolean}) => {
  const queryKey = ["associate-plans"];

  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      const res = await fetch("/api/associate-plans", {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Falha ao buscar planos");
      }

      return res.json();
    },
    staleTime: 5 * 1000,
    enabled: options?.enabled ?? true,
  });

  return queryResult;
};
