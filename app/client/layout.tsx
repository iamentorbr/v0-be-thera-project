import type React from "react"
import { ClientSidebar } from "@/components/client-sidebar"
import { OnboardingNotification } from "@/components/onboarding/onboarding-notification"
import { GuidedTour } from "@/components/onboarding/guided-tour"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { FloatingHelpButton } from "@/components/help/floating-help-button"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <ClientSidebar />
        <SidebarInset className="flex-1 overflow-y-auto">
          {children}
          <OnboardingNotification userType="client" />
          <GuidedTour userType="client" />
          <FloatingHelpButton userType="client" />
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
