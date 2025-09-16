"use client"
import { fetchAssociateReport } from '@/app/(dashboard)/associates/api';
import { useQuery } from '@tanstack/react-query';

export const useAssociateReport = () => {
  const queryKey = ['associate-report'];

  const queryResult = useQuery({
    queryKey,
    queryFn: () => fetchAssociateReport(),
    staleTime: 5 * 1000,
  });

  return queryResult;
};
