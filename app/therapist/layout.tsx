import type React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TherapistSidebar } from "@/components/therapist-sidebar"

export default function TherapistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <TherapistSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
