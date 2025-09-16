"use server"

import { cookies } from "next/headers";

interface FetchAssociatesParams {
  search_term?: string;
  associate_status_id?: string;
}

export const fetchAssociates = async ({ search_term, associate_status_id }: FetchAssociatesParams): Promise<any> => {
  await new Promise(resolve => setTimeout(resolve, 500)); 

  const token = (await cookies()).get("token")?.value;

  // Construindo a query string dinamicamente
  const queryParams = new URLSearchParams();
  if (search_term) queryParams.append("search_term", search_term);
  if (associate_status_id) queryParams.append("associate_status_id", associate_status_id);

  const response = await fetch(`${process.env.API_URL}/associates?${queryParams.toString()}`, {
    method: "GET",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, 
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error('Falha ao buscar associados');
  }

  const associates: any = await response.json();
  return associates;
};

export const fetchAssociateReport = async (): Promise<any> => {
  await new Promise(resolve => setTimeout(resolve, 500)); 

  const token = (await cookies()).get("token")?.value;

  const response = await fetch(`${process.env.API_URL}/associates/associate-report`, {
    method: "GET",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, 
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error('Falha ao buscar associados');
  }

  const associates: any = await response.json();
  return associates;
};

