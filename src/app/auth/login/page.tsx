import { LoginForm } from "../components"

export const metadata = {
  title: `Login | ${process.env.PUBLIC_APPLICATION_NAME}`,
  description: `Página de autenticação do ${process.env.PUBLIC_APPLICATION_NAME}`,
}


export default function LoginPage() {
    return <LoginForm />
}