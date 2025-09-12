import { ReactNode } from "react";
import { FooterLinks } from "./components/footer-links";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthenticationFormLayout({ children }: AuthLayoutProps) {
  const year = new Date()
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Conteúdo centralizado */}
      <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <a href="">
            <h1 className="text-3xl text-blue-600 text-center">
              Associa App
            </h1>
          </a>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
            {children}
          </div>
        </div>
      </div>

      {/* Footer fixado no fim do layout */}
      <div className="flex flex-col justify-center items-center w-full py-6">
        <p className="text-sm text-gray-600">
          © {year.getFullYear()} AssociaApp. Todos os direitos reservados.
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
