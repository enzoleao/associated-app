"use client";
import { useQuery } from "@tanstack/react-query";

export const useTenantInformations = (information?: string) => {
  return useQuery({
    queryKey: ["tenant-informations", information],
    queryFn: async () => {
      if (!information) return [];
      const res = await fetch(`/api/tenant-informations/${information}`, {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Falha ao buscar tenant informations");
      }
      return res.json();
    },
    enabled: !!information, 
    staleTime: 5 * 60 * 1000,
  });
};
