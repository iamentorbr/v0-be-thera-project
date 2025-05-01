"use client"

import { useState } from "react"
import { format, startOfWeek, endOfWeek, eachDayOfInterval, addDays, isSameDay, addWeeks, subWeeks } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ChevronLeft, ChevronRight, Plus, Clock, Video, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreateSessionDialog } from "@/components/scheduling/create-session-dialog"
import { AvailabilityDialog } from "@/components/scheduling/availability-dialog"
import { ViewSessionDialog } from "@/components/scheduling/view-session-dialog"

// Dados simulados de sessões
const mockSessions = [
  {
    id: "1",
    client: {
      id: "1",
      name: "Maria Santos",
      avatar: "/abstract-ms-artwork.png",
    },
    date: new Date(2024, 4, 15),
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
      avatar: "/abstract-geometric-jo.png",
    },
    date: new Date(2024, 4, 16),
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
      avatar: "/abstract-geometric-as.png",
    },
    date: new Date(2024, 4, 17),
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
      avatar: "/abstract-geometric-cm.png",
    },
    date: new Date(2024, 4, 18),
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
      avatar: "/abstract-interlocking-shapes.png",
    },
    date: new Date(2024, 4, 19),
    startTime: "14:00",
    endTime: "15:00",
    type: "video",
    status: "confirmed",
    notes: "Sessão de acompanhamento",
  },
]

// Dados simulados de disponibilidade
const mockAvailability = [
  { day: 1, startTime: "09:00", endTime: "12:00" }, // Segunda
  { day: 1, startTime: "14:00", endTime: "18:00" }, // Segunda
  { day: 2, startTime: "09:00", endTime: "12:00" }, // Terça
  { day: 2, startTime: "14:00", endTime: "18:00" }, // Terça
  { day: 3, startTime: "09:00", endTime: "12:00" }, // Quarta
  { day: 3, startTime: "14:00", endTime: "18:00" }, // Quarta
  { day: 4, startTime: "09:00", endTime: "12:00" }, // Quinta
  { day: 4, startTime: "14:00", endTime: "18:00" }, // Quinta
  { day: 5, startTime: "09:00", endTime: "12:00" }, // Sexta
  { day: 5, startTime: "14:00", endTime: "17:00" }, // Sexta
]

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [view, setView] = useState<"week" | "day">("week")
  const [createSessionOpen, setCreateSessionOpen] = useState(false)
  const [availabilityOpen, setAvailabilityOpen] = useState(false)
  const [viewSessionOpen, setViewSessionOpen] = useState(false)
  const [selectedSession, setSelectedSession] = useState<any>(null)

  // Calcular dias da semana atual
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 }) // Semana começa na segunda
  const endOfCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 1 })
  const daysOfWeek = eachDayOfInterval({
    start: startOfCurrentWeek,
    end: endOfCurrentWeek,
  })

  // Navegar para a semana anterior
  const previousWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1))
  }

  // Navegar para a próxima semana
  const nextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1))
  }

  // Filtrar sessões para o dia selecionado
  const sessionsForSelectedDate = mockSessions.filter((session) => isSameDay(session.date, selectedDate))

  // Verificar se um dia tem sessões
  const hasSessionsOnDay = (day: Date) => {
    return mockSessions.some((session) => isSameDay(session.date, day))
  }

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

  // Função para verificar se um horário está dentro da disponibilidade
  const isTimeAvailable = (day: Date, time: string) => {
    const dayOfWeek = day.getDay() || 7 // 0 é domingo, queremos 7 para domingo
    return mockAvailability.some((slot) => slot.day === dayOfWeek && slot.startTime <= time && slot.endTime > time)
  }

  // Função para gerar horários do dia (de 30 em 30 minutos)
  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 8; hour < 20; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`)
      slots.push(`${hour.toString().padStart(2, "0")}:30`)
    }
    return slots
  }

  const timeSlots = generateTimeSlots()

  // Função para abrir o diálogo de visualização de sessão
  const handleViewSession = (session: any) => {
    setSelectedSession(session)
    setViewSessionOpen(true)
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Agenda</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => setAvailabilityOpen(true)}>
              <Clock className="mr-2 h-4 w-4" />
              Disponibilidade
            </Button>
            <Button onClick={() => setCreateSessionOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nova Sessão
            </Button>
          </div>
        </div>

        <Tabs defaultValue="calendar" className="space-y-4">
          <TabsList>
            <TabsTrigger value="calendar">Calendário</TabsTrigger>
            <TabsTrigger value="list">Lista</TabsTrigger>
          </TabsList>
          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" onClick={previousWeek}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="font-medium">
                      {format(startOfCurrentWeek, "dd 'de' MMMM", { locale: ptBR })} -{" "}
                      {format(endOfCurrentWeek, "dd 'de' MMMM, yyyy", { locale: ptBR })}
                    </div>
                    <Button variant="outline" size="icon" onClick={nextWeek}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant={view === "week" ? "default" : "outline"} size="sm" onClick={() => setView("week")}>
                      Semana
                    </Button>
                    <Button variant={view === "day" ? "default" : "outline"} size="sm" onClick={() => setView("day")}>
                      Dia
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {view === "week" ? (
                  <div className="grid grid-cols-7 gap-2">
                    {/* Cabeçalho dos dias da semana */}
                    {daysOfWeek.map((day) => (
                      <div key={day.toString()} className="text-center font-medium p-2">
                        {format(day, "EEE", { locale: ptBR })}
                        <div
                          className={`text-xl rounded-full w-8 h-8 flex items-center justify-center mx-auto cursor-pointer ${
                            isSameDay(day, selectedDate)
                              ? "bg-primary text-primary-foreground"
                              : hasSessionsOnDay(day)
                                ? "bg-primary/10"
                                : ""
                          }`}
                          onClick={() => setSelectedDate(day)}
                        >
                          {format(day, "d")}
                        </div>
                      </div>
                    ))}

                    {/* Grade de horários */}
                    {daysOfWeek.map((day) => (
                      <div key={day.toString()} className="border rounded-md h-[500px] overflow-y-auto">
                        {timeSlots.map((time) => {
                          const isAvailable = isTimeAvailable(day, time)
                          const session = mockSessions.find((s) => isSameDay(s.date, day) && s.startTime === time)

                          return (
                            <div
                              key={`${day}-${time}`}
                              className={`p-1 border-b text-xs ${isAvailable ? "bg-primary/5" : "bg-muted/20"}`}
                            >
                              {time}
                              {session && (
                                <div
                                  className="mt-1 p-2 rounded-md bg-primary/10 cursor-pointer"
                                  onClick={() => handleViewSession(session)}
                                >
                                  <div className="flex items-center">
                                    <Avatar className="h-6 w-6 mr-1">
                                      <AvatarImage
                                        src={session.client.avatar || "/placeholder.svg"}
                                        alt={session.client.name}
                                      />
                                      <AvatarFallback>
                                        {session.client.name
                                          .split(" ")
                                          .map((n: string) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium truncate">{session.client.name}</span>
                                  </div>
                                  <div className="flex items-center mt-1">
                                    {session.type === "video" ? (
                                      <Video className="h-3 w-3 mr-1" />
                                    ) : (
                                      <MapPin className="h-3 w-3 mr-1" />
                                    )}
                                    <span>
                                      {session.startTime} - {session.endTime}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">
                        {format(selectedDate, "EEEE, dd 'de' MMMM", { locale: ptBR })}
                      </h3>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setSelectedDate(addDays(selectedDate, -1))}>
                          <ChevronLeft className="h-4 w-4 mr-1" /> Anterior
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setSelectedDate(addDays(selectedDate, 1))}>
                          Próximo <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-md">
                      {timeSlots.map((time) => {
                        const isAvailable = isTimeAvailable(selectedDate, time)
                        const session = mockSessions.find(
                          (s) => isSameDay(s.date, selectedDate) && s.startTime === time,
                        )

                        return (
                          <div
                            key={`${selectedDate}-${time}`}
                            className={`p-3 border-b flex items-center ${
                              isAvailable ? "bg-primary/5" : "bg-muted/20"
                            } ${session ? "min-h-[80px]" : "min-h-[50px]"}`}
                          >
                            <div className="w-16 font-medium">{time}</div>
                            {session ? (
                              <div
                                className="flex-1 ml-4 p-3 rounded-md bg-primary/10 cursor-pointer"
                                onClick={() => handleViewSession(session)}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <Avatar className="h-8 w-8 mr-2">
                                      <AvatarImage
                                        src={session.client.avatar || "/placeholder.svg"}
                                        alt={session.client.name}
                                      />
                                      <AvatarFallback>
                                        {session.client.name
                                          .split(" ")
                                          .map((n: string) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="font-medium">{session.client.name}</div>
                                      <div className="text-sm text-muted-foreground">
                                        {session.startTime} - {session.endTime}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    {session.type === "video" ? (
                                      <Video className="h-4 w-4" />
                                    ) : (
                                      <MapPin className="h-4 w-4" />
                                    )}
                                    <Badge variant={getStatusVariant(session.status)}>
                                      {getStatusText(session.status)}
                                    </Badge>
                                  </div>
                                </div>
                                {session.notes && (
                                  <div className="mt-2 text-sm text-muted-foreground">{session.notes}</div>
                                )}
                              </div>
                            ) : (
                              isAvailable && (
                                <Button
                                  variant="ghost"
                                  className="ml-4"
                                  onClick={() => {
                                    setSelectedDate(selectedDate)
                                    setCreateSessionOpen(true)
                                  }}
                                >
                                  <Plus className="h-4 w-4 mr-1" /> Agendar
                                </Button>
                              )
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="list" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Próximas Sessões</CardTitle>
                <CardDescription>Visualize e gerencie suas sessões agendadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockSessions.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                      Nenhuma sessão agendada. Clique em "Nova Sessão" para agendar.
                    </div>
                  ) : (
                    mockSessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center border-b pb-4 last:border-0 last:pb-0 cursor-pointer"
                        onClick={() => handleViewSession(session)}
                      >
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
                                  .map((n: string) => n[0])
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
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Diálogo para criar nova sessão */}
      <CreateSessionDialog open={createSessionOpen} onOpenChange={setCreateSessionOpen} selectedDate={selectedDate} />

      {/* Diálogo para definir disponibilidade */}
      <AvailabilityDialog open={availabilityOpen} onOpenChange={setAvailabilityOpen} availability={mockAvailability} />

      {/* Diálogo para visualizar sessão */}
      {selectedSession && (
        <ViewSessionDialog open={viewSessionOpen} onOpenChange={setViewSessionOpen} session={selectedSession} />
      )}
    </div>
  )
}
