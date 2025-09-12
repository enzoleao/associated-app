"use client";

import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NavUser } from "./NavUser";

export function SiteHeader() {
  const pathname = usePathname();

  const titles: Record<string, string> = {
    "/": "Dashboard",
    "/associates": "Associados",
    "/payments": "Pagamentos",
    "/settings": "Configurações",
  };

  const title = titles[pathname] || "Dashboard";

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
  };

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) bg-white ">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        <div className="ml-auto flex items-center gap-2">
          <NavUser user={data.user} />
        </div>
      </div>
    </header>
  );
}
