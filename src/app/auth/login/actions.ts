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
  messages?: any[];
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
      return { error: errorData?.error || "Erro no login", messages: errorData?.messages || [] };
    }

    const data = await res.json();

    const cookieStore = cookies();

    const cookieOptions = {
      httpOnly: process.env.NODE_ENV === "production",
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" as const : "lax" as const,
      path: "/",
    };

    (await
      cookieStore).set("token", data.authorization.token, cookieOptions);

    (await
      cookieStore).set("user", JSON.stringify(data.user), { ...cookieOptions, httpOnly: false });

    return { success: true, user: data.user };
  } catch (err) {
    console.error("Erro no login:", err);
    return { error: "Erro ao conectar com o servidor. Tente novamente." };
  }
}
