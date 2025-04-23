"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Calendar,
  Settings,
  LogOut,
  CreditCard,
  MessageSquare,
  FileAudio,
  BookOpen,
  Sparkles,
  Video,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MoonStar } from "lucide-react"
import { ComingSoonBadge } from "@/components/ui/coming-soon-badge"

export function ClientSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <MoonStar className="h-6 w-6" />
          <span className="font-bold">BETHERA</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/client/dashboard"}>
              <Link href="/client/dashboard">
                <Sparkles className="mr-2 h-4 w-4" />
                <span>Minha Jornada</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/client/sessions"}>
              <Link href="/client/sessions">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Sessões</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/client/video"}>
              <Link href="/client/video">
                <Video className="mr-2 h-4 w-4" />
                <span>Sessões Online</span>
              </Link>
            </SidebarMenuButton>
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <ComingSoonBadge size="sm" />
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/client/content"}>
              <Link href="/client/content">
                <FileAudio className="mr-2 h-4 w-4" />
                <span>Meu Conteúdo</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/client/exercises"}>
              <Link href="/client/exercises">
                <BookOpen className="mr-2 h-4 w-4" />
                <span>Exercícios</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/client/journal"}>
              <Link href="/client/journal">
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>Diário</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/client/payments"}>
              <Link href="/client/payments">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Pagamentos</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/client/settings"}>
              <Link href="/client/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="Usuário" />
              <AvatarFallback>MS</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Maria Santos</p>
              <p className="text-xs text-muted-foreground">Cliente</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
