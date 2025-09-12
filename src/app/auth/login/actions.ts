"use server";

import { cookies } from "next/headers";

interface LoginParams {
  email: string;
  password: string;
}

interface LoginResponse {
  success?: boolean;
  user?: any;
  error?: string;
  messages?: []
}

export async function login({ email, password }: LoginParams): Promise<LoginResponse> {
  try {
    const res = await fetch(`${process.env.API_URL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      return { error: errorData.error, messages: errorData.messages };
    }

    const data = await res.json();

    const cookieStore = cookies();
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
      path: "/",
    };

    (await cookieStore).set("user", JSON.stringify(data.user), cookieOptions);
    (await cookieStore).set("token", JSON.stringify(data.authorization.token), cookieOptions);

    return { success: true, user: data.user };
  } catch (err) {
    console.error("Erro no login:", err);
    return { error: "Erro ao conectar com o servidor. Tente novamente." };
  }
}
