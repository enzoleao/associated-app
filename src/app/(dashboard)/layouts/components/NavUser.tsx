"use client";

import * as React from "react";
import {
  IconChevronDown,
  IconCreditCard,
  IconLogout,
  IconNotification,
  IconSettings,
  IconUser,
  IconUserCircle,
} from "@tabler/icons-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar } from "./Avatar";
import { useUser } from "@/contexts/UserContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";


export function NavUser() {
  
  const { isMobile } = useSidebar();

  const { user, logout, isLoading } = useUser()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className=" flex items-center justify-center cursor-pointer"
            >
              {isLoading ? (
                <Skeleton className="h-10 w-10 rounded-full" />
              ) : (
                <div className="flex gap-3 p-2 items-center min-w-[165px] justify-between select-none">
                  <div className="flex gap-3 items-center">
                    <Avatar initials={user?.initials} color={user?.color} />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">{user?.name.split(" ")[0]}</span>
                      <span className="text-xs text-gray-500">{user?.role.name}</span>
                    </div>
                  </div>
                  <IconChevronDown size={16}/>
                </div>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "bottom"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <div className="grid flex-1 text-left text-sm leading-tight gap-1.5">
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user?.name}</span>
                    <span className="text-muted-foreground truncate text-xs">
                      {user?.email}
                    </span>
                  </div>
                  <Badge className="h-5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">Administrador</Badge>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {/* <DropdownMenuItem>
                <IconUserCircle />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconCreditCard />
                Billing
              </DropdownMenuItem> */}
              <DropdownMenuItem>
                <IconUser />
                Minha Conta
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} variant="destructive">
              <IconLogout />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
