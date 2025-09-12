
import { DashboardHome } from "./components/DashboardHome"


export const metadata = {
  title: `Dashboard | ${process.env.PUBLIC_APPLICATION_NAME}`,
  description: `Página de dashboard do ${process.env.PUBLIC_APPLICATION_NAME}`,
}


export default function Page() {
  return <DashboardHome />
}
