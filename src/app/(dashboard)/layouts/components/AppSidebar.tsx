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
import { useTenantInformations } from "@/hooks/useTenantInformations"
import { useEffect } from "react"

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



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar()
  const [tenantId, setTenantId] = React.useState<string | null>(null)


  const { data: tenantInformationsData, isLoading: isLoadingTenantInformations } = useTenantInformations(tenantId || "");
  useEffect(() => {
    const storedTenantId = localStorage.getItem("identification")
    setTenantId(storedTenantId)
  }, [])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex flex-col justify-center items-center gap-4">
            {isLoadingTenantInformations ? (
  <Skeleton className="h-[60px] w-[60px] rounded-full" />
            ) : tenantInformationsData?.logo_image ? (
              <Image 
                src={tenantInformationsData.logo_image}
                height={60}
                width={60}
                alt="logo"
              />
            ) : (
              <Skeleton className="h-[60px] w-[60px] rounded-full" /> 
            )}

            {open && (
              isLoadingTenantInformations ? (
                <Skeleton className="h-4 w-48 rounded-full" />
              ) : (
                <span className="text-center font-medium">{tenantInformationsData?.name}</span>
              )
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="pt-4">
        {isLoadingTenantInformations ? (
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
