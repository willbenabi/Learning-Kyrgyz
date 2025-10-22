import * as React from "react"
import { type LucideIcon } from "lucide-react"
import { Link, usePage } from "@inertiajs/react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    activePattern?: string  // Optional: custom pattern for matching active state
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const { url } = usePage()

  return (
    <SidebarGroup {...props}>
      <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            // Use custom activePattern if provided, otherwise default to URL matching
            const pattern = item.activePattern || item.url
            const isActive = url.startsWith(pattern)

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title} isActive={isActive}>
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
