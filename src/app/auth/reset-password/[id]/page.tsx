import { ResetPasswordForm } from "./components/ResetPasswordForm"

export const metadata = {
  title: `Resetar senha | ${process.env.PUBLIC_APPLICATION_NAME}`,
  description: `Página de resetar senha do ${process.env.PUBLIC_APPLICATION_NAME}`,
}


export default function ResetPasswordPage() {
    return <ResetPasswordForm />
}