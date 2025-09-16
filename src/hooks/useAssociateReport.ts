"use client"
import { useQuery } from "@tanstack/react-query";

export const useAssociateReport = () => {
  const queryKey = ["associate-report"];

  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      const res = await fetch("/api/associates/associate-report", {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Falha ao buscar relatório de associados");
      }

      return res.json();
    },
    staleTime: 5 * 1000,
  });

  return queryResult;
};
