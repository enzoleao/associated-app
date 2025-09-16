"use client"
import { useQuery } from "@tanstack/react-query";

export const useAssociateStatus = () => {
  const queryKey = ["associate-status"];

  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      const res = await fetch("/api/associate-status", {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Falha ao buscar status de associados");
      }

      return res.json();
    },
    staleTime: 5 * 1000,
  });

  return queryResult;
};
