"use client"
import { fetchCountryStates } from '@/app/api/country-states';
import { useQuery } from '@tanstack/react-query';

export const useCountryStates = () => {
  const queryKey = ['country-states'];

  const queryResult = useQuery({
    queryKey,
    queryFn: () => fetchCountryStates(),
    staleTime: 5 * 1000,
  });

  return queryResult;
};
