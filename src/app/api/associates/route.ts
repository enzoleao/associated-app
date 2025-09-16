import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    const token = (await cookies()).get("token")?.value;

    const { searchParams } = new URL(request.url);
    const search_term = searchParams.get("search_term") || "";
    const associate_status_id = searchParams.get("associate_status_id") || "";

    const queryParams = new URLSearchParams();
    if (search_term) queryParams.append("search_term", search_term);
    if (associate_status_id) queryParams.append("associate_status_id", associate_status_id);

    const res = await fetch(
      `${process.env.API_URL}/associates?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { message: "Falha ao buscar associados" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Erro inesperado", error: error.message },
      { status: 500 }
    );
  }
}
