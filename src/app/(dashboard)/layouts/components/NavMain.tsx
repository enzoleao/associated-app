"use client"

import { usePathname } from "next/navigation"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Icon } from "@tabler/icons-react"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url?: string
    icon?: Icon
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarMenu className="flex flex-col gap-2">
        {items.map((item) => {
          const isActive = item.url === pathname 
          return (
            <SidebarMenuItem key={item.title}>
              <Link href={item.url || "#"} className="w-full">
                <SidebarMenuButton
                  tooltip={item.title}
                  className={`flex items-center gap-3 px-3 py-2 w-full rounded-md h-12 cursor-pointer ${
                    isActive
                      ? 'text-blue-600 hover:text-blue-600 bg-blue-50 hover:bg-blue-50 active:text-blue-500 active:bg-blue-100'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon && <item.icon  />}
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
