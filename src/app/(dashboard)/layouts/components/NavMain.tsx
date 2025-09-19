"use client"

import { usePathname } from "next/navigation"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import {
  IconUsers,
  IconSettings,
  IconReceiptDollar,
  IconChartBar,
  IconLayoutDashboard,
  IconCircle,
} from "@tabler/icons-react"
import React from "react"

type Permission = {
  name: string
  method: string
}

type RawItem = {
  id: number
  name: string
  path: string
  icon: string
  subMenus: RawItem[]
  resource: {
    permissions: Permission[]
  }
}

type NavItem = {
  title: string
  url?: string
  icon: React.ComponentType<any>
  permissions?: Permission[]
  subMenus?: NavItem[]
}

const iconMap: Record<string, React.ComponentType<any>> = {
  IconUsers,
  IconSettings,
  IconReceiptDollar,
  IconChartBar,
  IconLayoutDashboard,
}

export function NavMain({ items }: { items?: RawItem[] }) {
  const pathname = usePathname()

  const getIconComponent = (iconName: string): React.ComponentType<any> => {
    return iconMap[iconName] || IconCircle
  }

  const mapRawToNavItem = (item: RawItem): NavItem => ({
    title: item.name,
    url: item.path,
    icon: getIconComponent(item.icon),
    permissions: item.resource?.permissions,
    subMenus: item.subMenus?.map(mapRawToNavItem),
  })

  const rawItems = Array.isArray(items) ? items : []
  const navItems: NavItem[] = rawItems.map(mapRawToNavItem)

  return (
    <SidebarGroup>
      <SidebarMenu className="flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = item.url === pathname
          return (
            <SidebarMenuItem key={item.title}>
              <Link href={item.url || "#"} className="w-full">
                <SidebarMenuButton
                  tooltip={item.title}
                  className={`flex items-center gap-3 px-3 py-2 w-full rounded-md h-12 cursor-pointer ${
                    isActive
                      ? "text-blue-600 hover:text-blue-600 bg-blue-50 hover:bg-blue-50 active:text-blue-500 active:bg-blue-100"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {React.createElement(item.icon, { size: 20 })}
                  <span className="font-medium">{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
