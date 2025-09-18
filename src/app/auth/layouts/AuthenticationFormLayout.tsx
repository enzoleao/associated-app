"use client";

import { ReactNode, useEffect, useState } from "react";
import { FooterLinks } from "./components/footer-links";
import { useLoading } from "@/contexts/LoadingContext";
import { usePathname } from "next/navigation";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthenticationFormLayout({ children }: AuthLayoutProps) {
  const [mounted, setMounted] = useState(false); // para evitar mismatch SSR
  const { showLoading, hideLoading } = useLoading();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true); // componente montou
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (!mounted) return;

    const isTenantLoginRoute = /^\/auth\/login\/[^/]+$/.test(pathname);
    if (isTenantLoginRoute) {
      showLoading();
      return () => hideLoading();
    } else {
      hideLoading();
    }
  }, [mounted, pathname, showLoading, hideLoading]);

  // Evita renderização no servidor
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <a href="/">
            <h1 className="text-3xl text-blue-600 text-center">Associa App</h1>
          </a>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
            {children}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full py-6">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} AssociaApp. Todos os direitos reservados.
        </p>
        <span className="flex gap-3 mt-2">
          <FooterLinks href="FooterLinks" name="Privacidade" />
          <FooterLinks href="FooterLinks" name="Termos" />
          <FooterLinks href="FooterLinks" name="Ajuda" />
        </span>
      </div>
    </div>
  );
}
