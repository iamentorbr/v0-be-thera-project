"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClientReminderSummary } from "@/components/reminders/client-reminder-summary"
import { Bell, Calendar, FileText, Settings } from "lucide-react"
import Link from "next/link"

// Dados simulados de cliente
const mockClient = {
  id: "1",
  name: "Maria Silva",
  email: "maria.silva@email.com",
  phone: "(11) 98765-4321",
  reminderPreferences: {
    enabled: true,
    preferredChannel: "email",
    reminderTimes: ["24h", "1h"],
    sessionReminders: true,
    exerciseReminders: true,
    paymentReminders: true,
    contentReminders: false,
  },
}

export default function ClientDetailsPage() {
  const params = useParams()
  const clientId = params.id as string
  const [client, setClient] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Aqui seria a chamada para a API para buscar os dados do cliente
    // Por enquanto, vamos apenas simular um atraso e usar dados mockados
    const fetchClient = async () => {
      setIsLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 500))
        setClient(mockClient)
      } catch (error) {
        console.error("Erro ao buscar dados do cliente:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchClient()
  }, [clientId])

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="h-8 w-64 animate-pulse rounded-md bg-muted"></div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="h-[200px] animate-pulse rounded-md bg-muted"></div>
          <div className="h-[200px] animate-pulse rounded-md bg-muted"></div>
          <div className="h-[200px] animate-pulse rounded-md bg-muted"></div>
        </div>
        <div className="h-[400px] animate-pulse rounded-md bg-muted"></div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">{client.name}</h2>
        <Button asChild>
          <Link href={`/therapist/clients/${clientId}/edit`}>
            <Settings className="mr-2 h-4 w-4" />
            Editar Perfil
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Informações de Contato</CardTitle>
            <CardDescription>Detalhes para contato</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-1">
            <div className="flex items-center justify-between">
              <span className="text-sm">Email</span>
              <span className="text-sm font-medium">{client.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Telefone</span>
              <span className="text-sm font-medium">{client.phone}</span>
            </div>
          </CardContent>
        </Card>

        <ClientReminderSummary clientId={clientId} clientName={client.name} preferences={client.reminderPreferences} />

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Próxima Sessão</CardTitle>
            <CardDescription>Detalhes da próxima sessão agendada</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-1">
            <div className="flex items-center justify-between">
              <span className="text-sm">Data</span>
              <span className="text-sm font-medium">10/05/2025</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Horário</span>
              <span className="text-sm font-medium">14:30</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Status</span>
              <span className="text-sm font-medium">Confirmada</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sessions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sessions" className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            Sessões
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Notas
          </TabsTrigger>
          <TabsTrigger value="reminders" className="flex items-center">
            <Bell className="mr-2 h-4 w-4" />
            Lembretes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="sessions">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Sessões</CardTitle>
              <CardDescription>Visualize todas as sessões anteriores e futuras.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Conteúdo do histórico de sessões */}
              <p className="text-sm text-muted-foreground">Histórico de sessões seria exibido aqui.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>Notas do Cliente</CardTitle>
              <CardDescription>Visualize e gerencie notas sobre este cliente.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Conteúdo das notas do cliente */}
              <p className="text-sm text-muted-foreground">Notas sobre o cliente seriam exibidas aqui.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reminders">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Lembretes</CardTitle>
                <CardDescription>Gerencie os lembretes enviados para este cliente.</CardDescription>
              </div>
              <Button asChild>
                <Link href={`/therapist/clients/${clientId}/reminders`}>
                  <Settings className="mr-2 h-4 w-4" />
                  Configurar Preferências
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {/* Histórico de lembretes enviados */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Histórico de Lembretes</h3>
                <div className="rounded-md border">
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground">Histórico de lembretes enviados seria exibido aqui.</p>
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
