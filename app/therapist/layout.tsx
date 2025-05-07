import type React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TherapistSidebar } from "@/components/therapist-sidebar"
import { FloatingHelpButton } from "@/components/help/floating-help-button"

export default function TherapistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <TherapistSidebar />
      <SidebarInset>
        {children}
        <FloatingHelpButton userType="therapist" />
      </SidebarInset>
    </SidebarProvider>
  )
}
