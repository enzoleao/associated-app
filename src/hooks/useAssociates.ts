"use client"
import { useQuery } from "@tanstack/react-query";

export const useAssociates = ({
  search_term,
  associate_status_id,
  initialData,
}: {
  search_term?: string;
  associate_status_id?: string;
  initialData?: any;
}) => {
  const queryKey = ["associates", search_term, associate_status_id];

  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (search_term) queryParams.append("search_term", search_term);
      if (associate_status_id)
        queryParams.append("associate_status_id", associate_status_id);

      const res = await fetch(`/api/associates?${queryParams.toString()}`, {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Falha ao buscar associados");
      }

      return res.json();
    },
    initialData,
    staleTime: 5 * 1000,
  });

  return queryResult;
};
