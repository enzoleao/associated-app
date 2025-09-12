import { AssociatesHome } from "./components/AssociatesHome"

export const metadata = {
  title: `Associados | ${process.env.PUBLIC_APPLICATION_NAME}`,
  description: `Página de associados do ${process.env.PUBLIC_APPLICATION_NAME}`,
}

export default function AssociatesPage(){
    return <AssociatesHome />
}