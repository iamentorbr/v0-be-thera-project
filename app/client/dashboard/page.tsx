"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClientOnboardingChecklist } from "@/components/onboarding/client-onboarding-checklist"
import { ProfileCompletionCard } from "@/components/onboarding/profile-completion-card"
import { OnboardingTips } from "@/components/onboarding/onboarding-tips"
import { StartTourButton } from "@/components/onboarding/start-tour-button"

export default function ClientDashboardPage() {
  const [isNewUser, setIsNewUser] = useState(true)

  // Verificar se é um novo usuário
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem("client-onboarding-completed")
    if (hasCompletedOnboarding === "true") {
      setIsNewUser(false)
    }
  }, [])

  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <StartTourButton userType="client" />
        </div>
        <p className="text-muted-foreground">
          Bem-vindo ao seu dashboard. Aqui você pode gerenciar suas sessões, pagamentos e muito mais.
        </p>
      </div>

      {isNewUser && (
        <div className="space-y-6">
          <ClientOnboardingChecklist />
          <ProfileCompletionCard userType="client" />
          <OnboardingTips userType="client" />
        </div>
      )}

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="upcoming">Próximas Sessões</TabsTrigger>
          <TabsTrigger value="payments">Pagamentos</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Sessões</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">+3 no último mês</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Exercícios Concluídos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+5 no último mês</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pagamentos Pendentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">Vencimento em 5 dias</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Próxima Sessão</CardTitle>
                <CardDescription>Detalhes da sua próxima sessão agendada</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Dr. Ricardo Souza</p>
                      <p className="text-sm text-muted-foreground">Amanhã às 15:00</p>
                      <p className="text-sm text-muted-foreground">Sessão de Terapia - 50 minutos</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Exercícios Recentes</CardTitle>
                <CardDescription>Exercícios atribuídos pelo seu terapeuta</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Diário de Gratidão</p>
                      <p className="text-sm text-muted-foreground">Atribuído há 2 dias</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Técnicas de Respiração</p>
                      <p className="text-sm text-muted-foreground">Atribuído há 1 semana</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Próximas Sessões</CardTitle>
              <CardDescription>Sessões agendadas para os próximos dias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Dr. Ricardo Souza</p>
                    <p className="text-sm text-muted-foreground">Amanhã às 15:00</p>
                    <p className="text-sm text-muted-foreground">Sessão de Terapia - 50 minutos</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Dr. Ricardo Souza</p>
                    <p className="text-sm text-muted-foreground">Próxima semana - Segunda às 15:00</p>
                    <p className="text-sm text-muted-foreground">Sessão de Terapia - 50 minutos</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pagamentos Pendentes</CardTitle>
              <CardDescription>Faturas que precisam ser pagas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Sessão de Terapia - 15/05/2023</p>
                    <p className="text-sm text-muted-foreground">Vencimento em 5 dias</p>
                  </div>
                  <div className="text-sm font-medium">R$ 150,00</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Pagamentos</CardTitle>
              <CardDescription>Seus pagamentos recentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Sessão de Terapia - 08/05/2023</p>
                    <p className="text-sm text-muted-foreground">Pago em 10/05/2023</p>
                  </div>
                  <div className="text-sm font-medium">R$ 150,00</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Sessão de Terapia - 01/05/2023</p>
                    <p className="text-sm text-muted-foreground">Pago em 03/05/2023</p>
                  </div>
                  <div className="text-sm font-medium">R$ 150,00</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
