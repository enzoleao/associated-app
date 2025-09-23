"use client"
import { useQuery } from "@tanstack/react-query";

export const useAssociateStatus = (options?: { enabled?: boolean }) => {
  const queryKey = ["associate-status"];

  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      const res = await fetch("/api/associate-status", {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Falha ao buscar status de associados");
      }

      return res.json();
    },
    staleTime: 5 * 60 * 1000,
    enabled: options?.enabled ?? true,
    refetchOnWindowFocus: false,

  });

  return queryResult;
};
