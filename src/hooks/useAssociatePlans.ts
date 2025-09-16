"use client"
import { fetchAssociatePlans } from '@/app/api/associate-plans';
import { useQuery } from '@tanstack/react-query';

export const useAssociatePlans = () => {
  const queryKey = ['associate-plans'];

  const queryResult = useQuery({
    queryKey,
    queryFn: () => fetchAssociatePlans(),
    staleTime: 5 * 1000,
  });

  return queryResult;
};
