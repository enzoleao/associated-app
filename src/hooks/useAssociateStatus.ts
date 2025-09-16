"use client"
import { fetchAssociateStatus } from '@/app/api/associate-status';
import { useQuery } from '@tanstack/react-query';

export const useAssociateStatus = () => {
  const queryKey = ['associate-status'];

  const queryResult = useQuery({
    queryKey,
    queryFn: () => fetchAssociateStatus(),
    staleTime: 5 * 1000,
  });

  return queryResult;
};
