"use client";
import { useQuery } from "@tanstack/react-query";

export const useDependentsAssociated = (associatedId?: string) => {
  return useQuery({
    queryKey: ["dependents-associated", associatedId],
    queryFn: async () => {
      if (!associatedId) return [];
      const res = await fetch(`/api/dependents/${associatedId}`, {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Falha ao buscar dependentes");
      }
      return res.json();
    },
    enabled: !!associatedId, // só busca se tiver ID
    staleTime: 5 * 60 * 1000,
  });
};
