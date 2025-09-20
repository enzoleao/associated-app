import { TenantRedirectPage } from "./components/LoadingComponent";

interface TenantRedirectPageProps {
  params: Promise<{ tenantId: string }>;
}

export const metadata = {
  title: `Login | ${process.env.PUBLIC_APPLICATION_NAME}`,
  description: `Página de autenticação do ${process.env.PUBLIC_APPLICATION_NAME}`,
}

export default function LoginLoading({ params }: TenantRedirectPageProps) {
  return <TenantRedirectPage  params={params}/>;
}
