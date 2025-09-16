"use client"
import { fetchPaymentMethods } from '@/app/api/payment-methods';
import { useQuery } from '@tanstack/react-query';

export const usePaymentMethods = () => {
  const queryKey = ['payment-methods'];

  const queryResult = useQuery({
    queryKey,
    queryFn: () => fetchPaymentMethods(),
    staleTime: 5 * 1000,
  });

  return queryResult;
};
