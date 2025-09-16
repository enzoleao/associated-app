"use client"
import { useQuery } from "@tanstack/react-query";

export const usePaymentMethods = () => {
  const queryKey = ["payment-methods"];

  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      const res = await fetch("/api/payment-methods", {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Falha ao buscar métodos de pagamentos");
      }

      return res.json();
    },
    staleTime: 5 * 1000,
  });

  return queryResult;
};
