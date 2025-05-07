"use client"

import { useEffect } from "react"
import { TourStepComponent } from "./tour-step"
import { useTour } from "@/hooks/use-tour"

const therapistDashboardSteps = [
  {
    target: ".dashboard-header",
    title: "Bem-vindo ao seu Dashboard",
    content:
      "Esta é a sua central de controle. Aqui você pode ver uma visão geral de seus clientes, sessões e pagamentos.",
    position: "bottom",
  },
  {
    target: ".clients-card",
    title: "Seus Clientes",
    content: "Veja o número total de clientes e adicione novos clientes facilmente.",
    position: "bottom",
  },
  {
    target: ".sessions-card",
    title: "Sessões Agendadas",
    content: "Acompanhe suas próximas sessões e gerencie seu calendário.",
    position: "bottom",
  },
  {
    target: ".notes-card",
    title: "Anotações",
    content: "Acesse suas anotações de sessões anteriores e crie novas anotações.",
    position: "left",
  },
  {
    target: ".payments-card",
    title: "Pagamentos",
    content: "Gerencie pagamentos pendentes e veja o histórico financeiro.",
    position: "left",
  },
  {
    target: ".sidebar-clients",
    title: "Menu de Navegação",
    content: "Use este menu para navegar entre as diferentes seções da plataforma.",
    position: "right",
  },
]

export function TherapistDashboardTour() {
  const { isOpen, currentStep, hasCompletedTour, startTour, nextStep, prevStep, closeTour, completeTour } = useTour(
    therapistDashboardSteps,
    "therapist-dashboard",
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
      steps={therapistDashboardSteps}
      currentStep={currentStep}
      onNext={nextStep}
      onPrev={prevStep}
      onClose={closeTour}
      onComplete={completeTour}
    />
  )
}
