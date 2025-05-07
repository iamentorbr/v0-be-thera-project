"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TherapistOnboardingChecklist } from "@/components/onboarding/therapist-onboarding-checklist"
import { ProfileCompletionCard } from "@/components/onboarding/profile-completion-card"
import { OnboardingTips } from "@/components/onboarding/onboarding-tips"
import { StartTourButton } from "@/components/onboarding/start-tour-button"

export default function TherapistDashboardPage() {
  const [isNewUser, setIsNewUser] = useState(true)

  // Verificar se é um novo usuário
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem("therapist-onboarding-completed")
    if (hasCompletedOnboarding === "true") {
      setIsNewUser(false)
    }
  }, [])

  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <StartTourButton userType="therapist" />
        </div>
        <p className="text-muted-foreground">
          Bem-vindo ao seu dashboard. Aqui você pode gerenciar seus clientes, sessões e muito mais.
        </p>
      </div>

      {isNewUser && (
        <div className="space-y-6">
          <TherapistOnboardingChecklist />
          <ProfileCompletionCard userType="therapist" />
          <OnboardingTips userType="therapist" />
        </div>
      )}

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="upcoming">Próximas Sessões</TabsTrigger>
          <TabsTrigger value="clients">Clientes Recentes</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 no último mês</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sessões Realizadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+8 no último mês</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Confirmação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">+5% em relação ao mês anterior</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
                <CardDescription>Suas últimas ações na plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Sessão agendada com Maria Silva</p>
                      <p className="text-sm text-muted-foreground">Hoje às 14:30</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Nota adicionada para João Pereira</p>
                      <p className="text-sm text-muted-foreground">Ontem às 16:45</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Novo cliente adicionado: Ana Costa</p>
                      <p className="text-sm text-muted-foreground">2 dias atrás</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Próximas Sessões</CardTitle>
                <CardDescription>Sessões agendadas para os próximos dias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Maria Silva</p>
                      <p className="text-sm text-muted-foreground">Hoje às 14:30</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">João Pereira</p>
                      <p className="text-sm text-muted-foreground">Amanhã às 10:00</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Ana Costa</p>
                      <p className="text-sm text-muted-foreground">Quinta-feira às 16:00</p>
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
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Maria Silva</p>
                    <p className="text-sm text-muted-foreground">Hoje às 14:30</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">João Pereira</p>
                    <p className="text-sm text-muted-foreground">Amanhã às 10:00</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Ana Costa</p>
                    <p className="text-sm text-muted-foreground">Quinta-feira às 16:00</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Clientes Recentes</CardTitle>
              <CardDescription>Seus clientes mais recentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Ana Costa</p>
                    <p className="text-sm text-muted-foreground">Adicionado há 2 dias</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Carlos Mendes</p>
                    <p className="text-sm text-muted-foreground">Adicionado há 1 semana</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Fernanda Lima</p>
                    <p className="text-sm text-muted-foreground">Adicionado há 2 semanas</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
