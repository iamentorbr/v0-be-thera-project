"use client"

import { useState, useEffect } from "react"
import { Check, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ChecklistItem {
  id: string
  title: string
  description: string
  completed: boolean
  link: string
}

export function ClientOnboardingChecklist() {
  const [isVisible, setIsVisible] = useState(true)
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    {
      id: "profile",
      title: "Complete seu perfil",
      description: "Adicione suas informações pessoais e foto",
      completed: false,
      link: "/client/settings",
    },
    {
      id: "session",
      title: "Agende sua primeira sessão",
      description: "Marque um horário com seu terapeuta",
      completed: false,
      link: "/client/sessions/new",
    },
    {
      id: "payment",
      title: "Configure método de pagamento",
      description: "Adicione um cartão ou outro método de pagamento",
      completed: false,
      link: "/client/payments",
    },
  ])

  // Check local storage for completed items
  useEffect(() => {
    const storedChecklist = localStorage.getItem("client-onboarding-checklist")
    if (storedChecklist) {
      setChecklist(JSON.parse(storedChecklist))
    }

    const checklistHidden = localStorage.getItem("client-onboarding-checklist-hidden")
    if (checklistHidden === "true") {
      setIsVisible(false)
    }
  }, [])

  const toggleItem = (id: string) => {
    const updatedChecklist = checklist.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    setChecklist(updatedChecklist)
    localStorage.setItem("client-onboarding-checklist", JSON.stringify(updatedChecklist))
  }

  const hideChecklist = () => {
    setIsVisible(false)
    localStorage.setItem("client-onboarding-checklist-hidden", "true")
  }

  const resetChecklist = () => {
    const resetItems = checklist.map((item) => ({ ...item, completed: false }))
    setChecklist(resetItems)
    localStorage.setItem("client-onboarding-checklist", JSON.stringify(resetItems))
    setIsVisible(true)
    localStorage.removeItem("client-onboarding-checklist-hidden")
  }

  if (!isVisible) return null

  const completedCount = checklist.filter((item) => item.completed).length
  const progress = (completedCount / checklist.length) * 100

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Primeiros passos</CardTitle>
          <Button variant="ghost" size="icon" onClick={hideChecklist}>
            <X className="h-4 w-4" />
            <span className="sr-only">Fechar</span>
          </Button>
        </div>
        <CardDescription>Complete estas tarefas para começar sua jornada</CardDescription>
        <div className="mt-2 h-2 w-full rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          {completedCount} de {checklist.length} tarefas concluídas
        </p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {checklist.map((item) => (
            <li key={item.id} className="flex items-start">
              <div
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                  item.completed ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"
                }`}
                onClick={() => toggleItem(item.id)}
              >
                {item.completed && <Check className="h-3 w-3" />}
              </div>
              <div className="ml-3 space-y-1">
                <div className="flex items-center">
                  <p className={`text-sm font-medium ${item.completed ? "line-through text-muted-foreground" : ""}`}>
                    {item.title}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">{item.description}</p>
                <Button variant="link" className="h-auto p-0 text-xs" asChild>
                  <Link href={item.link}>Ir para {item.title.toLowerCase()}</Link>
                </Button>
              </div>
            </li>
          ))}
        </ul>
        {completedCount === checklist.length && (
          <div className="mt-4 rounded-lg bg-muted p-3 text-center">
            <p className="text-sm font-medium">Parabéns! Você concluiu todas as tarefas iniciais.</p>
            <Button variant="link" className="h-auto p-0 text-xs" onClick={resetChecklist}>
              Reiniciar checklist
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
