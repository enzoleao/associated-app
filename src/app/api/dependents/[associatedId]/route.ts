import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request, context: { params: Promise<{ associatedId: string }> }) {
  const { associatedId } = await context.params;

  if (!associatedId) {
    return NextResponse.json({ message: "associatedId é obrigatório" }, { status: 400 });
  }

  try {
    const token = (await cookies()).get("token")?.value;

    const res = await fetch(`${process.env.API_URL}/dependents/associate/${associatedId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ message: "Falha ao buscar dependentes" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: "Erro inesperado", error: error.message }, { status: 500 });
  }
}
