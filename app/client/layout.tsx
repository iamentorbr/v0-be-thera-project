import type React from "react"
import { ClientSidebar } from "@/components/client-sidebar"
import { OnboardingNotification } from "@/components/onboarding/onboarding-notification"
import { GuidedTour } from "@/components/onboarding/guided-tour"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <ClientSidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
        <OnboardingNotification userType="client" />
        <GuidedTour userType="client" />
      </main>
    </div>
  )
}
