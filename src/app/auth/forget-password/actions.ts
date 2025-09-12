"use server";

import { cookies } from "next/headers";

interface LoginParams {
  email: string;
}

interface LoginResponse {
  success?: boolean;
  user?: any;
  error?: string;
  messages?: []
}

export async function forgetPassword({ email }: LoginParams): Promise<LoginResponse> {
  try {
    const res = await fetch(`${process.env.API_URL}/auth/forget-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      return { error: errorData.error, messages: errorData.messages };
    }

    const data = await res.json();

  

    return { messages: data.message};
  } catch (err) {
    console.error("Erro no login:", err);
    return { error: "Erro ao conectar com o servidor. Tente novamente." };
  }
}
