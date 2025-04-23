import type React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ClientSidebar } from "@/components/client-sidebar"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <ClientSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
