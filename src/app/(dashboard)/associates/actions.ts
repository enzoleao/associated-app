"use server";

import { cookies } from "next/headers";

interface GetAddressByCEPParams {
  cep: string;
}
interface UploadProfileImageData {
  presign_url: string;
  file: File;
}

interface GetPresignProfileImage {
  content_type: string;
}

interface GetAddressResponse {
  message: string;
  success: boolean;
  data?: {
    cep: string;        
    logradouro: string;  
    complemento: string;
    unidade: string;     
    bairro: string;     
    localidade: string; 
    uf: string;           
    estado: string;       
    regiao: string;        
    ibge: string;     
    gia: string;    
    ddd: string;     
    siafi: string; 
  }
}
interface UploadProfileImageDataResponse {
  message: string;
  success: boolean;
  data?: {
    key: string;
    upload_url: string;
    public_url: string;
  }
}

interface CreateAssociatedData {
  email: string;
  name: string;
  cpf: string;
  phone: string;
  rg?: string;
  birthday?: string;
  profession_name: string;
  street: string;
  city: string;
  state_id: string;
  zip_code: string;
  payment_method_preference_id: string;
  number: string;
  neighborhood: string;
  membership_date?: string;
  payment_due_date: string;
  image_path?: string; 
  color: string
}

export async function getAddressByCEP({ cep }: GetAddressByCEPParams): Promise<GetAddressResponse> {
  try {
    const res = await fetch(`${process.env.ADDRESS_WEBSERVICE}/${cep}/json`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      return {message: 'Erro ao consultar o CEP', success: false};
    }

    const data = await res.json();

    return { message: "Consulta realizada com sucesso", data: data, success: true };
  } catch (err) {
    console.error("Erro ao receber o address:", err);
    return {message: 'Erro ao consultar o CEP', success: false};
  }
}

export async function getPresignUrlProfileUpload(
  params: GetPresignProfileImage
): Promise<UploadProfileImageDataResponse> {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return {message: "Usuário não autenticado", success: false};
    }

    const url = new URL(`${process.env.API_URL}/associates/presign-profile-image`);
    url.search = new URLSearchParams(params as unknown as Record<string, string>).toString();

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      console.error("Erro na API:", errorData);
      return {message: "Erro ao receber url", success: false};
    }

    const data = await res.json();

    return { message: "Consulta realizada com sucesso", data, success: true };
  } catch (err) {
    console.error("Erro ao receber o presign URL:", err);
    return {message: "Erro ao receber url", success: false};
  }
}

export async function uploadProfileImage({presign_url, file}:UploadProfileImageData) {
  try {

    const res = await fetch(presign_url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });
  }catch(err){
    console.error(err)
  }
  
}

export async function createAssociated(params: CreateAssociatedData) {
  try {

    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return {message: "Usuário não autenticado", success: false};
    }

    
    const res = await fetch(`${process.env.API_URL}/associates`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
      body: JSON.stringify(params),
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      console.log(errorData)
      return { error: errorData?.error || "Erro ao cadastrar associadoss", messages: errorData?.messages || [], success: false };
    }

    const data = await res.json();

    return { success: true, user: data.user };
  } catch (err) {
    console.error("Erro no login:", err);
    return { error: "Erro ao conectar com o servidor. Tente novamente." };
  }
}