"use client";
import { useQuery } from "@tanstack/react-query";

export const useAssociateById = (associatedId?: string) => {
  return useQuery({
    queryKey: ["associate-by-id", associatedId],
    queryFn: async () => {
      const res = await fetch(`/api/associates/${associatedId}`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Falha ao buscar associado");
      }
      return res.json();
    },
    enabled: !!associatedId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,

  });
};
