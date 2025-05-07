"use client"

import { useEffect } from "react"
import { TourStepComponent } from "./tour-step"
import { useTour } from "@/hooks/use-tour"

const clientDashboardSteps = [
  {
    target: ".dashboard-header",
    title: "Bem-vindo ao seu Dashboard",
    content: "Esta é a sua central de informações. Aqui você pode ver suas próximas sessões e pagamentos.",
    position: "bottom",
  },
  {
    target: ".next-session-card",
    title: "Próxima Sessão",
    content: "Veja detalhes da sua próxima sessão agendada com seu terapeuta.",
    position: "bottom",
  },
  {
    target: ".payment-card",
    title: "Pagamentos",
    content: "Acompanhe seus pagamentos pendentes e realize-os facilmente.",
    position: "bottom",
  },
  {
    target: ".sessions-history",
    title: "Histórico de Sessões",
    content: "Veja todas as suas sessões anteriores e próximas.",
    position: "top",
  },
  {
    target: ".sidebar-sessions",
    title: "Menu de Navegação",
    content: "Use este menu para navegar entre as diferentes seções da plataforma.",
    position: "right",
  },
]

export function ClientDashboardTour() {
  const { isOpen, currentStep, hasCompletedTour, startTour, nextStep, prevStep, closeTour, completeTour } = useTour(
    clientDashboardSteps,
    "client-dashboard",
  )

  // Auto-start the tour if it hasn't been completed
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasCompletedTour) {
        startTour()
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [hasCompletedTour, startTour])

  if (!isOpen) return null

  return (
    <TourStepComponent
      steps={clientDashboardSteps}
      currentStep={currentStep}
      onNext={nextStep}
      onPrev={prevStep}
      onClose={closeTour}
      onComplete={completeTour}
    />
  )
}
