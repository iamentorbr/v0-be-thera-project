"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, ArrowRight, ArrowLeft } from "lucide-react"

interface TourStep {
  title: string
  description: string
  targetSelector: string
  position: "top" | "right" | "bottom" | "left"
  path?: string
}

interface GuidedTourProps {
  userType: "therapist" | "client"
}

export function GuidedTour({ userType }: GuidedTourProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const pathname = usePathname()

  // Definir passos do tour com base no tipo de usuário
  const therapistTourSteps: TourStep[] = [
    {
      title: "Dashboard",
      description: "Aqui você encontra uma visão geral da sua prática, incluindo próximas sessões e atividade recente.",
      targetSelector: "main",
      position: "top",
      path: "/therapist/dashboard",
    },
    {
      title: "Menu de navegação",
      description: "Use este menu para navegar entre as diferentes seções da plataforma.",
      targetSelector: "nav",
      position: "right",
      path: "/therapist/dashboard",
    },
    {
      title: "Clientes",
      description: "Gerencie seus clientes, adicione novos e veja detalhes de cada um.",
      targetSelector: "a[href='/therapist/clients']",
      position: "right",
      path: "/therapist/dashboard",
    },
    {
      title: "Sessões",
      description: "Agende, visualize e gerencie suas sessões com clientes.",
      targetSelector: "a[href='/therapist/sessions']",
      position: "right",
      path: "/therapist/dashboard",
    },
    {
      title: "Conteúdo",
      description: "Crie e compartilhe conteúdos com seus clientes, como artigos, vídeos e exercícios.",
      targetSelector: "a[href='/therapist/content']",
      position: "right",
      path: "/therapist/dashboard",
    },
  ]

  const clientTourSteps: TourStep[] = [
    {
      title: "Dashboard",
      description: "Aqui você encontra uma visão geral das suas atividades, incluindo próximas sessões e exercícios.",
      targetSelector: "main",
      position: "top",
      path: "/client/dashboard",
    },
    {
      title: "Menu de navegação",
      description: "Use este menu para navegar entre as diferentes seções da plataforma.",
      targetSelector: "nav",
      position: "right",
      path: "/client/dashboard",
    },
    {
      title: "Sessões",
      description: "Visualize e agende suas sessões com o terapeuta.",
      targetSelector: "a[href='/client/sessions']",
      position: "right",
      path: "/client/dashboard",
    },
    {
      title: "Exercícios",
      description: "Acesse os exercícios e atividades compartilhados pelo seu terapeuta.",
      targetSelector: "a[href='/client/exercises']",
      position: "right",
      path: "/client/dashboard",
    },
    {
      title: "Diário",
      description: "Mantenha um diário para registrar seus pensamentos e sentimentos entre as sessões.",
      targetSelector: "a[href='/client/journal']",
      position: "right",
      path: "/client/dashboard",
    },
  ]

  const tourSteps = userType === "therapist" ? therapistTourSteps : clientTourSteps
  const currentStep = tourSteps[currentStepIndex]

  // Verificar se o tour deve ser mostrado
  useEffect(() => {
    const tourStarted = localStorage.getItem(`${userType}-tour-started`) === "true"
    const tourCompleted = localStorage.getItem(`${userType}-tour-completed`) === "true"

    if (tourStarted && !tourCompleted) {
      setIsVisible(true)
    }
  }, [userType])

  // Verificar se estamos na página correta para o passo atual
  useEffect(() => {
    if (!isVisible) return

    // Se o passo atual tem um caminho específico e estamos em um caminho diferente, não mostrar
    if (currentStep.path && pathname !== currentStep.path) {
      setIsVisible(false)
      return
    }

    // Tentar encontrar o elemento alvo
    const targetElement = document.querySelector(currentStep.targetSelector)
    if (!targetElement) return

    // Posicionar o tooltip próximo ao elemento alvo
    const highlightElement = () => {
      targetElement.classList.add("relative", "z-50", "ring-2", "ring-primary", "ring-offset-2", "rounded")
    }

    highlightElement()

    return () => {
      targetElement.classList.remove("relative", "z-50", "ring-2", "ring-primary", "ring-offset-2", "rounded")
    }
  }, [isVisible, currentStep, pathname])

  const handleNext = () => {
    if (currentStepIndex < tourSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    } else {
      // Tour completo
      setIsVisible(false)
      localStorage.setItem(`${userType}-tour-completed`, "true")
    }
  }

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  const handleSkip = () => {
    setIsVisible(false)
    localStorage.setItem(`${userType}-tour-completed`, "true")
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80">
      <Card className="shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{currentStep.title}</CardTitle>
            <Button variant="ghost" size="icon" onClick={handleSkip}>
              <X className="h-4 w-4" />
              <span className="sr-only">Fechar</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-sm text-muted-foreground">{currentStep.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between pt-2">
          <div className="text-xs text-muted-foreground">
            {currentStepIndex + 1} de {tourSteps.length}
          </div>
          <div className="flex space-x-2">
            {currentStepIndex > 0 && (
              <Button variant="outline" size="sm" onClick={handlePrev}>
                <ArrowLeft className="mr-1 h-3 w-3" />
                Anterior
              </Button>
            )}
            <Button size="sm" onClick={handleNext}>
              {currentStepIndex < tourSteps.length - 1 ? (
                <>
                  Próximo
                  <ArrowRight className="ml-1 h-3 w-3" />
                </>
              ) : (
                "Concluir"
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
