"use client"

import * as React from "react"
import {
  IconUsers,
  IconSettings,
  IconReceiptDollar,
  IconChartBar,
  IconLayoutDashboard
} from "@tabler/icons-react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { NavMain } from "./NavMain"
import Image from "next/image"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: IconLayoutDashboard,
    },
    {
      title: "Associados",
      url: "/associates",
      icon:   IconUsers,
    },
    {
      title: "Pagamentos",
      url: "/payments",
      icon: IconReceiptDollar,
    },
    {
      title: "Relatórios",
      url: "/reports",
      icon: IconChartBar,
    },
    {
      title: "Configurações",
      url: "/settings",
      icon: IconSettings,
    },
  ],

}
const tenant = {
  name: 'INSTITUTO DE DEFESA, AMPARO JURÍDICO E SOCIAL DO ESTADO DO PARÁ'
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

    const { open } = useSidebar()
   
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex flex-col justify-center items-center gap-4">
            <Image 
              src="https://bucket-production-eaf6.up.railway.app/associated-production/public%2Flogos%2Flogo_idea_2025.png"
              height={100}
              width={60}
              alt="logo"
            />
            {open && (
              // <Tooltip>
              //   <TooltipTrigger asChild>
              //     <span className="text-base font-medium block w-full truncate">
              //       {tenant.name}
              //     </span>
              //   </TooltipTrigger>
              //   <TooltipContent>
              //     {tenant.name}
              //   </TooltipContent>
              // </Tooltip>
              <span className="text-center font-medium">{tenant.name}</span>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="pt-4">
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  )
}
