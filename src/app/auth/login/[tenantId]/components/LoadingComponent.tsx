"use client";

import { useRouter } from "next/navigation";
import { useEffect, use } from "react";

interface TenantRedirectPageProps {
  params: Promise<{ tenantId: string }>;
}

export function TenantRedirectPage({ params }: TenantRedirectPageProps) {
  const router = useRouter();
  const { tenantId } = use(params); 

  useEffect(() => {
    const loadTenant = async () => {
      try {
        const res = await fetch(`/api/tenant-informations/${tenantId}`);
        if (!res.ok) {
          router.replace("/auth/login");
          return;
        }
        const tenant = await res.json();
        localStorage.setItem("tenantId", tenant.id);
        localStorage.setItem("identification", tenant.identification);
        router.replace("/auth/login");
      } catch (err) {
        console.error(err);
        router.replace("/auth/login");
      }
    };

    loadTenant();
  }, [tenantId, router]);

  return null;
}
