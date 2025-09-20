import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request, context: { params: { associatedId: string } }) {
  try {
    const { associatedId } = await context.params;

    const token = (await cookies()).get("token")?.value;

    console.log("associatedId:", associatedId);

    const externalResponse = await fetch(`${process.env.API_URL}/associates/pdf-report/${associatedId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token ?? ''}`, 
      },
    });

    if (!externalResponse.ok) {
      return NextResponse.json(
        { error: 'Erro na API externa' },
        { status: externalResponse.status }
      );
    }

    const dataBuffer = await externalResponse.arrayBuffer();

    return new NextResponse(Buffer.from(dataBuffer), {
      status: 200,
      headers: {
        'Content-Disposition': 'attachment; filename="arquivo.pdf"', // Ajuste a extensão conforme o arquivo
        'Content-Type': externalResponse.headers.get('content-type') || 'application/octet-stream',
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erro interno no servidor' },
      { status: 500 }
    );
  }
}
