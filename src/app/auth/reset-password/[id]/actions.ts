"use server";

import { cookies } from "next/headers";

interface ResetPassword {
  password: string;
  token: string;
}

interface ResetPasswordResponse {
  success?: boolean;
  user?: any;
  error?: string;
  messages?: []
}

export async function resetPassword({ password, token }: ResetPassword): Promise<ResetPasswordResponse> {
  try {
    const res = await fetch(`${process.env.API_URL}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      return { error: errorData.error, messages: errorData.messages };
    }

    const data = await res.json();

    return { success: true, user: data.messages };
  } catch (err) {
    console.error("Erro no login:", err);
    return { error: "Erro ao conectar com o servidor. Tente novamente." };
  }
}
