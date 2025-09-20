"use client";
import { useQuery } from "@tanstack/react-query";

interface UseAssociatesProps {
  search_term?: string;
  associate_status_id?: string;
  page?: number;
  per_page?: number;
}

interface AssociateResponse {
  data: any[];
  meta: {
    page: number;
    per_page: number;
    total_items: number;
    total_pages: number;
    next_page: number | null;
    previous_page: number | null;
  };
}

export const useAssociates = ({
  search_term,
  associate_status_id,
  page = 1,
  per_page = 10,
}: UseAssociatesProps) => {
  const queryKey = ["associates", search_term, associate_status_id, page, per_page];

  return useQuery<AssociateResponse, Error>({
    queryKey,
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (search_term) queryParams.append("search_term", search_term);
      if (associate_status_id) queryParams.append("associate_status_id", associate_status_id);
      queryParams.append("page", page.toString());
      queryParams.append("per_page", per_page.toString());

      const res = await fetch(`/api/associates?${queryParams.toString()}`, {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Falha ao buscar associados");
      }

      return res.json();
    },
    staleTime: 5 * 60 * 1000,
    placeholderData: (previousData) => previousData, 

  });
};
