import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  request: NextRequest,
  context: any 
) {
  const { associatedId } = context.params as { associatedId: string };

  try {
    const token = (await cookies()).get("token")?.value;

    const externalResponse = await fetch(
      `${process.env.API_URL}/associates/pdf-report/${associatedId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token ?? ""}`,
        },
      }
    );

    if (!externalResponse.ok) {
      return NextResponse.json(
        { error: "Erro na API externa" },
        { status: externalResponse.status }
      );
    }

    const dataBuffer = await externalResponse.arrayBuffer();

    return new NextResponse(Buffer.from(dataBuffer), {
      status: 200,
      headers: {
        "Content-Disposition": 'attachment; filename="arquivo.pdf"',
        "Content-Type":
          externalResponse.headers.get("content-type") ||
          "application/octet-stream",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
