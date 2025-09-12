import { ForgetPasswordForm } from "../components"

export const metadata = {
  title: `Recuperar senha | ${process.env.PUBLIC_APPLICATION_NAME}`,
  description: `Página de recuperação de senha do ${process.env.PUBLIC_APPLICATION_NAME}`,
}


export default function ResetPasswordPage() {
    return <ForgetPasswordForm />
}