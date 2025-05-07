"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Lightbulb, X } from "lucide-react"

interface OnboardingTipsProps {
  userType: "therapist" | "client"
}

export function OnboardingTips({ userType }: OnboardingTipsProps) {
  const [currentTipIndex, setCurrentTipIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const therapistTips = [
    {
      title: "Adicione seus clientes",
      description:
        "Comece adicionando seus clientes na plataforma. Isso permitirá que você agende sessões e compartilhe conteúdos com eles.",
    },
    {
      title: "Configure sua disponibilidade",
      description:
        "Defina seus horários de disponibilidade para que seus clientes possam agendar sessões nos momentos mais convenientes para você.",
    },
    {
      title: "Crie conteúdos personalizados",
      description:
        "Utilize a biblioteca de conteúdos para criar materiais personalizados para seus clientes, como exercícios, leituras e atividades.",
    },
    {
      title: "Acompanhe o progresso",
      description:
        "Use as ferramentas de análise para acompanhar o progresso de seus clientes e ajustar suas abordagens conforme necessário.",
    },
    {
      title: "Configure lembretes automáticos",
      description:
        "Configure lembretes automáticos para reduzir faltas e cancelamentos de última hora, melhorando sua taxa de comparecimento.",
    },
  ]

  const clientTips = [
    {
      title: "Agende suas sessões",
      description:
        "Você pode agendar sessões diretamente pela plataforma, escolhendo os horários disponíveis do seu terapeuta.",
    },
    {
      title: "Acesse seus exercícios",
      description:
        "Seu terapeuta pode compartilhar exercícios e atividades para você realizar entre as sessões. Acesse-os na seção de Exercícios.",
    },
    {
      title: "Mantenha um diário",
      description: "Use a função de diário para registrar seus pensamentos, sentimentos e progressos entre as sessões.",
    },
    {
      title: "Gerencie seus pagamentos",
      description: "Visualize e pague suas faturas diretamente pela plataforma, com total segurança e praticidade.",
    },
    {
      title: "Configure lembretes",
      description: "Configure lembretes para suas sessões e exercícios para não perder nenhuma atividade importante.",
    },
  ]

  const tips = userType === "therapist" ? therapistTips : clientTips
  const currentTip = tips[currentTipIndex]

  const handlePrevTip = () => {
    setCurrentTipIndex((prev) => (prev > 0 ? prev - 1 : tips.length - 1))
  }

  const handleNextTip = () => {
    setCurrentTipIndex((prev) => (prev < tips.length - 1 ? prev + 1 : 0))
  }

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem(`${userType}-tips-dismissed`, "true")
  }

  if (!isVisible) return null

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            <CardTitle>Dicas para começar</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={handleDismiss}>
            <X className="h-4 w-4" />
            <span className="sr-only">Fechar</span>
          </Button>
        </div>
        <CardDescription>Dicas úteis para ajudar você a aproveitar ao máximo a plataforma</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <h3 className="font-medium">{currentTip.title}</h3>
          <p className="text-sm text-muted-foreground">{currentTip.description}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-3">
        <div className="text-xs text-muted-foreground">
          Dica {currentTipIndex + 1} de {tips.length}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={handlePrevTip}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Dica anterior</span>
          </Button>
          <Button variant="outline" size="icon" onClick={handleNextTip}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próxima dica</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
