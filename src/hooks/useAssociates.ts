"use client"
import { fetchAssociates } from '@/app/(dashboard)/associates/api';
import { useQuery } from '@tanstack/react-query';

export const useAssociates = ({search_term, associate_status_id, initialData}: {search_term?: string; associate_status_id?: string; initialData?: any}) => {
  const queryKey = ['associates', search_term, associate_status_id];

  const queryResult = useQuery({
    queryKey,
    queryFn: () => fetchAssociates({ search_term, associate_status_id }),
    initialData,
    staleTime: 5 * 1000,
  });

  return queryResult;
};
