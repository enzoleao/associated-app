"use server";

import { cookies } from "next/headers";

export async function logoutAction() {
  const cookieStore = cookies();

  (await cookieStore).delete("token");
  (await cookieStore).delete("user");
}
