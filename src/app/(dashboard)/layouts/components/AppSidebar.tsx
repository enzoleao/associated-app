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
import { Skeleton } from "@/components/ui/skeleton"
import { useUser } from "@/contexts/UserContext"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: IconLayoutDashboard,
    },
    {
      title: "Associados",
      url: "/associates",
      icon: IconUsers,
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
  const { isLoading } = useUser()


  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex flex-col justify-center items-center gap-4">
            {isLoading ? (
              <Skeleton className="h-[60px] w-[60px] rounded-full" />
            ) : (
              <Image 
                src="https://bucket-production-eaf6.up.railway.app/associated-production/public%2Flogos%2Flogo_idea_2025.png"
                height={60}
                width={60}
                alt="logo"
              />
            )}

            {open && (
              isLoading ? (
                <Skeleton className="h-4 w-48 rounded-full" />
              ) : (
                <span className="text-center font-medium">{tenant.name}</span>
              )
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="pt-4">
        {isLoading ? (
          <div className="flex flex-col gap-2 px-2">
            {data.navMain.map((_, idx) => (
              <Skeleton key={idx} className="h-10 w-full rounded" />
            ))}
          </div>
        ) : (
          <NavMain items={data.navMain} />
        )}
      </SidebarContent>
    </Sidebar>
  )
}
