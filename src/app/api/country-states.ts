"use server"

import { cookies } from "next/headers";

export const fetchCountryStates = async (): Promise<any> => {
  await new Promise(resolve => setTimeout(resolve, 500)); 

  const token = (await cookies()).get("token")?.value;

  const response = await fetch(`${process.env.API_URL}/country-states`, {
    method: "GET",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, 
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error('Falha ao buscar estados');
  }

  const countryStates: any = await response.json();
  return countryStates;
};
