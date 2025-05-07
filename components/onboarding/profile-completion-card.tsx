"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { UserCircle, FileText, Calendar, CreditCard } from "lucide-react"
import Link from "next/link"

interface ProfileCompletionCardProps {
  userType: "therapist" | "client"
}

interface ProfileItem {
  id: string
  title: string
  description: string
  completed: boolean
  icon: React.ReactNode
  link: string
}

export function ProfileCompletionCard({ userType }: ProfileCompletionCardProps) {
  const [profileItems, setProfileItems] = useState<ProfileItem[]>([])

  useEffect(() => {
    // Definir itens com base no tipo de usuário
    if (userType === "therapist") {
      setProfileItems([
        {
          id: "personal",
          title: "Informações pessoais",
          description: "Nome, especialidade, biografia",
          completed: false,
          icon: <UserCircle className="h-5 w-5" />,
          link: "/therapist/settings/account",
        },
        {
          id: "professional",
          title: "Informações profissionais",
          description: "Formação, experiência, abordagem",
          completed: false,
          icon: <FileText className="h-5 w-5" />,
          link: "/therapist/settings/account",
        },
        {
          id: "availability",
          title: "Disponibilidade",
          description: "Horários de atendimento",
          completed: false,
          icon: <Calendar className="h-5 w-5" />,
          link: "/therapist/settings/scheduling",
        },
        {
          id: "payment",
          title: "Informações de pagamento",
          description: "Métodos de pagamento, valores",
          completed: false,
          icon: <CreditCard className="h-5 w-5" />,
          link: "/therapist/settings/payments",
        },
      ])
    } else {
      setProfileItems([
        {
          id: "personal",
          title: "Informações pessoais",
          description: "Nome, contato, data de nascimento",
          completed: false,
          icon: <UserCircle className="h-5 w-5" />,
          link: "/client/settings",
        },
        {
          id: "preferences",
          title: "Preferências de comunicação",
          description: "Como você prefere ser contatado",
          completed: false,
          icon: <FileText className="h-5 w-5" />,
          link: "/client/settings",
        },
        {
          id: "payment",
          title: "Métodos de pagamento",
          description: "Adicione um método de pagamento",
          completed: false,
          icon: <CreditCard className="h-5 w-5" />,
          link: "/client/payments",
        },
      ])
    }

    // Verificar itens completados no localStorage
    const storedItems = localStorage.getItem(`${userType}-profile-items`)
    if (storedItems) {
      setProfileItems(JSON.parse(storedItems))
    }
  }, [userType])

  // Calcular progresso
  const completedCount = profileItems.filter((item) => item.completed).length
  const progress = profileItems.length > 0 ? (completedCount / profileItems.length) * 100 : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Complete seu perfil</CardTitle>
        <CardDescription>Um perfil completo ajuda a melhorar sua experiência na plataforma</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Progresso do perfil</span>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="space-y-4">
          {profileItems.map((item) => (
            <div key={item.id} className="flex items-start space-x-3">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  item.completed ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {item.icon}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{item.title}</p>
                  {item.completed ? (
                    <span className="text-xs text-green-600">Concluído</span>
                  ) : (
                    <Button variant="link" size="sm" className="h-auto p-0" asChild>
                      <Link href={item.link}>Completar</Link>
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
