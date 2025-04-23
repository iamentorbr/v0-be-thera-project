"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Clock, Video, FileText, MapPin, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ptBR } from "date-fns/locale"
// Corrigir a importação do ComingSoonBadge
import { ComingSoonBadge } from "@/components/ui/coming-soon-badge"

// Dados simulados de sessões
const mockSessions = [
  {
    id: "1",
    client: {
      id: "1",
      name: "Maria Santos",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: new Date(2024, 3, 12),
    startTime: "14:00",
    endTime: "15:00",
    type: "video",
    status: "confirmed",
    notes: "Sessão de acompanhamento mensal",
  },
  {
    id: "2",
    client: {
      id: "2",
      name: "João Oliveira",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: new Date(2024, 3, 17),
    startTime: "10:00",
    endTime: "11:00",
    type: "inperson",
    status: "confirmed",
    notes: "Primeira consulta",
  },
  {
    id: "3",
    client: {
      id: "3",
      name: "Ana Silva",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: new Date(2024, 3, 15),
    startTime: "16:30",
    endTime: "17:30",
    type: "video",
    status: "pending",
    notes: "Sessão de tarô",
  },
  {
    id: "4",
    client: {
      id: "4",
      name: "Carlos Mendes",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: new Date(2024, 3, 22),
    startTime: "13:00",
    endTime: "14:00",
    type: "video",
    status: "confirmed",
    notes: "Sessão de coaching",
  },
  {
    id: "5",
    client: {
      id: "5",
      name: "Lúcia Ferreira",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: new Date(2024, 3, 5),
    startTime: "14:00",
    endTime: "15:00",
    type: "video",
    status: "completed",
    notes: "Sessão de acompanhamento",
  },
  {
    id: "6",
    client: {
      id: "2",
      name: "João Oliveira",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: new Date(2024, 3, 3),
    startTime: "10:00",
    endTime: "11:00",
    type: "inperson",
    status: "completed",
    notes: "Sessão de acompanhamento",
  },
  {
    id: "7",
    client: {
      id: "4",
      name: "Carlos Mendes",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: new Date(2024, 3, 8),
    startTime: "13:00",
    endTime: "14:00",
    type: "video",
    status: "completed",
    notes: "Sessão de coaching",
  },
  {
    id: "8",
    client: {
      id: "3",
      name: "Ana Silva",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: new Date(2024, 2, 10),
    startTime: "15:30",
    endTime: "16:30",
    type: "video",
    status: "cancelled",
    notes: "Sessão cancelada pelo cliente",
  },
]

export default function SessionsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  // Filtrar sessões para a data selecionada
  const sessionsForSelectedDate = selectedDate
    ? mockSessions.filter(
        (session) =>
          session.date.getDate() === selectedDate.getDate() &&
          session.date.getMonth() === selectedDate.getMonth() &&
          session.date.getFullYear() === selectedDate.getFullYear(),
      )
    : []

  // Filtrar sessões futuras
  const upcomingSessions = mockSessions
    .filter((session) => session.status !== "completed" && session.status !== "cancelled" && session.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())

  // Filtrar sessões passadas
  const pastSessions = mockSessions
    .filter((session) => session.status === "completed" || session.status === "cancelled" || session.date < new Date())
    .sort((a, b) => b.date.getTime() - a.date.getTime())

  // Função para obter o texto do status em português
  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmada"
      case "pending":
        return "Pendente"
      case "completed":
        return "Concluída"
      case "cancelled":
        return "Cancelada"
      default:
        return status
    }
  }

  // Função para obter a variante do badge baseado no status
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default"
      case "pending":
        return "outline"
      case "completed":
        return "secondary"
      case "cancelled":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Sessões</h2>
          <div className="flex items-center space-x-2">
            <Link href="/therapist/sessions/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nova Sessão
              </Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Próximas</TabsTrigger>
            <TabsTrigger value="past">Passadas</TabsTrigger>
            <TabsTrigger value="calendar">Calendário</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Próximas Sessões</CardTitle>
                <CardDescription>Visualize e gerencie suas sessões agendadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {upcomingSessions.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                      Nenhuma sessão agendada. Clique em "Nova Sessão" para agendar.
                    </div>
                  ) : (
                    upcomingSessions.map((session) => (
                      <div key={session.id} className="flex items-center border-b pb-4 last:border-0 last:pb-0">
                        <div className="w-[80px] text-center">
                          <div className="text-xl font-bold">{session.date.getDate()}</div>
                          <div className="text-xs text-muted-foreground">
                            {session.date.toLocaleString("pt-BR", { month: "short" }).toUpperCase()}
                          </div>
                        </div>
                        <div className="ml-4 space-y-1 flex-1">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage
                                src={session.client.avatar || "/placeholder.svg"}
                                alt={session.client.name}
                              />
                              <AvatarFallback>
                                {session.client.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <p className="text-sm font-medium leading-none">{session.client.name}</p>
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="mr-1 h-3 w-3" />
                            {session.startTime} - {session.endTime}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            {session.type === "video" ? (
                              <Video className="mr-1 h-3 w-3" />
                            ) : (
                              <MapPin className="mr-1 h-3 w-3" />
                            )}
                            {session.type === "video" ? "Videochamada" : "Presencial"}
                          </div>
                        </div>
                        <div className="mr-4">
                          <Badge variant={getStatusVariant(session.status)}>{getStatusText(session.status)}</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <FileText className="mr-2 h-4 w-4" />
                            Preparar
                          </Button>
                          {session.type === "video" && (
                            <Button size="sm" asChild>
                              <Link href="/therapist/video">
                                <Video className="mr-2 h-4 w-4" />
                                Entrar
                                <ComingSoonBadge size="sm" className="ml-2" />
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="past" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sessões Passadas</CardTitle>
                <CardDescription>Revise suas sessões concluídas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {pastSessions.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">Nenhuma sessão passada encontrada.</div>
                  ) : (
                    pastSessions.map((session) => (
                      <div key={session.id} className="flex items-center border-b pb-4 last:border-0 last:pb-0">
                        <div className="w-[80px] text-center">
                          <div className="text-xl font-bold">{session.date.getDate()}</div>
                          <div className="text-xs text-muted-foreground">
                            {session.date.toLocaleString("pt-BR", { month: "short" }).toUpperCase()}
                          </div>
                        </div>
                        <div className="ml-4 space-y-1 flex-1">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage
                                src={session.client.avatar || "/placeholder.svg"}
                                alt={session.client.name}
                              />
                              <AvatarFallback>
                                {session.client.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <p className="text-sm font-medium leading-none">{session.client.name}</p>
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="mr-1 h-3 w-3" />
                            {session.startTime} - {session.endTime}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            {session.type === "video" ? (
                              <Video className="mr-1 h-3 w-3" />
                            ) : (
                              <MapPin className="mr-1 h-3 w-3" />
                            )}
                            {session.type === "video" ? "Videochamada" : "Presencial"}
                          </div>
                        </div>
                        <div className="mr-4">
                          <Badge variant={getStatusVariant(session.status)}>{getStatusText(session.status)}</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <FileText className="mr-2 h-4 w-4" />
                            Ver Anotações
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Calendário de Sessões</CardTitle>
                <CardDescription>Visualize suas sessões em formato de calendário</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                      locale={ptBR}
                    />
                  </div>
                  <div className="md:w-1/2">
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          {selectedDate?.toLocaleDateString("pt-BR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </CardTitle>
                        <CardDescription>Sessões para a data selecionada</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {sessionsForSelectedDate.length === 0 ? (
                          <div className="text-center py-6 text-muted-foreground">
                            Nenhuma sessão agendada para esta data.
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {sessionsForSelectedDate.map((session) => (
                              <div
                                key={session.id}
                                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                    <Clock className="h-5 w-5 text-primary" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">{session.client.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {session.startTime} - {session.endTime}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                                      <DropdownMenuItem>Editar sessão</DropdownMenuItem>
                                      <DropdownMenuItem>Cancelar sessão</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
