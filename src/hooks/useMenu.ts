"use client"
import { useQuery } from "@tanstack/react-query";

export const useMenus = () => {
  const queryKey = ["menus"];

  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      const res = await fetch("/api/menus", {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Falha ao buscar menus");
      }

      return res.json();
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return queryResult;
};
