import type React from "react"
import { TherapistSidebar } from "@/components/therapist-sidebar"
import { OnboardingNotification } from "@/components/onboarding/onboarding-notification"
import { GuidedTour } from "@/components/onboarding/guided-tour"

export default function TherapistLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <TherapistSidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
        <OnboardingNotification userType="therapist" />
        <GuidedTour userType="therapist" />
      </main>
    </div>
  )
}
