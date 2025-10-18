import * as React from "react"
import {
  LayoutDashboardIcon,
  UserIcon,
  UsersIcon,
  SettingsIcon,
  LogOutIcon,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface User {
  id: number
  name: string
  email: string
  role: string
  super_admin: boolean
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: User
  variant?: "sidebar" | "floating" | "inset"
}

export function AppSidebar({ user, variant = "sidebar", ...props }: AppSidebarProps) {
  const navMain = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: UserIcon,
    },
  ]

  // Add admin panel link for super admins
  if (user.super_admin) {
    navMain.push({
      title: "Super Admin Panel",
      url: "/admin/dashboard",
      icon: UsersIcon,
    })
  }

  const navSecondary = [
    {
      title: "Settings",
      url: "/settings",
      icon: SettingsIcon,
    },
  ]

  return (
    <Sidebar collapsible="icon" variant={variant} {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
                <LayoutDashboardIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Starter App</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
