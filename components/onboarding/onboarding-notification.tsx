"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

interface OnboardingNotificationProps {
  userType: "therapist" | "client"
}

export function OnboardingNotification({ userType }: OnboardingNotificationProps) {
  const { toast } = useToast()
  const [hasShownNotification, setHasShownNotification] = useState(false)

  useEffect(() => {
    // Verificar se já mostrou notificação nesta sessão
    if (hasShownNotification) return

    // Verificar se o usuário já completou o onboarding
    const hasCompletedOnboarding = localStorage.getItem(`${userType}-onboarding-completed`) === "true"
    if (hasCompletedOnboarding) return

    // Verificar itens pendentes
    const checklistKey = `${userType}-onboarding-checklist`
    const storedChecklist = localStorage.getItem(checklistKey)

    if (storedChecklist) {
      const checklist = JSON.parse(storedChecklist)
      const pendingItems = checklist.filter((item: any) => !item.completed)

      if (pendingItems.length > 0) {
        // Mostrar notificação após um pequeno delay
        const timer = setTimeout(() => {
          toast({
            title: "Tarefas pendentes",
            description: (
              <div className="mt-2 flex flex-col space-y-2">
                <p>
                  Você ainda tem {pendingItems.length} {pendingItems.length === 1 ? "tarefa" : "tarefas"} para
                  completar.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href={userType === "therapist" ? "/therapist/dashboard" : "/client/dashboard"}>
                    Ver tarefas
                  </Link>
                </Button>
              </div>
            ),
            duration: 10000,
          })
          setHasShownNotification(true)
        }, 5000)

        return () => clearTimeout(timer)
      }
    }
  }, [userType, toast, hasShownNotification])

  return null // Este componente não renderiza nada, apenas mostra notificações
}
