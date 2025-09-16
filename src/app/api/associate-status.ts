"use server"

import { cookies } from "next/headers";

export const fetchAssociateStatus = async (): Promise<any> => {
  await new Promise(resolve => setTimeout(resolve, 500)); 

  const token = (await cookies()).get("token")?.value;

  const response = await fetch(`${process.env.API_URL}/associate-status`, {
    method: "GET",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, 
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error('Falha ao buscar status de associados');
  }

  const associateStatus: any = await response.json();
  return associateStatus;
};
