"use client"

import { useState } from "react"
import { format, addDays, addHours, isBefore, isAfter, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, Filter, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ViewSessionDialog } from "@/components/scheduling/view-session-dialog"
import { CreateSessionDialog } from "@/components/scheduling/create-session-dialog"
import { SessionConfirmationStatus } from "@/components/scheduling/session-confirmation-status"

// Dados simulados
const generateMockSessions = () => {
  const now = new Date()
  const sessions = []

  // Sessões passadas
  for (let i = 1; i <= 5; i++) {
    const date = addDays(now, -i)
    sessions.push({
      id: `past-${i}`,
      clientName: `Cliente ${i}`,
      clientEmail: `cliente${i}@example.com`,
      date: date.toISOString(),
      duration: 50,
      location: "Consultório Online",
      status: "completed",
      notes: i % 2 === 0 ? "Cliente relatou melhora nos sintomas de ansiedade." : undefined,
      confirmationStatus: i % 3 === 0 ? "confirmed" : i % 3 === 1 ? "declined" : "no_response",
    })
  }

  // Sessões futuras
  for (let i = 1; i <= 10; i++) {
    const date = addHours(addDays(now, i % 3 === 0 ? i / 3 : i), i)
    sessions.push({
      id: `future-${i}`,
      clientName: `Cliente ${i + 5}`,
      clientEmail: `cliente${i + 5}@example.com`,
      date: date.toISOString(),
      duration: 50,
      location: i % 2 === 0 ? "Consultório Presencial" : "Consultório Online",
      status: "scheduled",
      notes: i % 3 === 0 ? "Primeira sessão com este cliente." : undefined,
      confirmationStatus:
        i % 4 === 0 ? "confirmed" : i % 4 === 1 ? "declined" : i % 4 === 2 ? "pending" : "no_response",
    })
  }

  return sessions
}

const mockSessions = generateMockSessions()

export default function SessionsPage() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [selectedSession, setSelectedSession] = useState<any | null>(null)
  const [viewSessionOpen, setViewSessionOpen] = useState(false)
  const [createSessionOpen, setCreateSessionOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string[]>(["scheduled", "completed"])
  const [confirmationFilter, setConfirmationFilter] = useState<string[]>([
    "confirmed",
    "declined",
    "pending",
    "no_response",
  ])

  const handleViewSession = (session: any) => {
    setSelectedSession(session)
    setViewSessionOpen(true)
  }

  const filteredSessions = mockSessions.filter((session) => {
    const matchesSearch = session.clientName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter.includes(session.status)
    const matchesDate = !date || format(parseISO(session.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    const matchesConfirmation = confirmationFilter.includes(session.confirmationStatus || "no_response")

    return matchesSearch && matchesStatus && matchesDate && matchesConfirmation
  })

  const upcomingSessions = filteredSessions.filter(
    (session) => session.status === "scheduled" && isAfter(parseISO(session.date), new Date()),
  )

  const pastSessions = filteredSessions.filter(
    (session) => session.status === "completed" || isBefore(parseISO(session.date), new Date()),
  )

  const formatSessionDate = (dateString: string) => {
    const date = parseISO(dateString)
    return format(date, "EEEE, dd 'de' MMMM", { locale: ptBR })
  }

  const formatSessionTime = (dateString: string) => {
    const date = parseISO(dateString)
    return format(date, "HH:mm", { locale: ptBR })
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Sessões</h2>
        <Button onClick={() => setCreateSessionOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Agendar Sessão
        </Button>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <div className="md:w-2/3 space-y-4">
          <Card>
            <CardHeader className="space-y-1 pb-2">
              <CardTitle className="text-2xl">Filtros</CardTitle>
              <CardDescription>Filtre as sessões por data, status ou cliente</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "dd/MM/yyyy") : "Selecionar data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <Filter className="mr-2 h-4 w-4" />
                      Status
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Filtrar por status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={statusFilter.includes("scheduled")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setStatusFilter([...statusFilter, "scheduled"])
                        } else {
                          setStatusFilter(statusFilter.filter((s) => s !== "scheduled"))
                        }
                      }}
                    >
                      Agendadas
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={statusFilter.includes("completed")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setStatusFilter([...statusFilter, "completed"])
                        } else {
                          setStatusFilter(statusFilter.filter((s) => s !== "completed"))
                        }
                      }}
                    >
                      Concluídas
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <Filter className="mr-2 h-4 w-4" />
                      Confirmação
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Filtrar por confirmação</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={confirmationFilter.includes("confirmed")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setConfirmationFilter([...confirmationFilter, "confirmed"])
                        } else {
                          setConfirmationFilter(confirmationFilter.filter((s) => s !== "confirmed"))
                        }
                      }}
                    >
                      Confirmadas
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={confirmationFilter.includes("pending")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setConfirmationFilter([...confirmationFilter, "pending"])
                        } else {
                          setConfirmationFilter(confirmationFilter.filter((s) => s !== "pending"))
                        }
                      }}
                    >
                      Aguardando
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={confirmationFilter.includes("declined")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setConfirmationFilter([...confirmationFilter, "declined"])
                        } else {
                          setConfirmationFilter(confirmationFilter.filter((s) => s !== "declined"))
                        }
                      }}
                    >
                      Recusadas
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={confirmationFilter.includes("no_response")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setConfirmationFilter([...confirmationFilter, "no_response"])
                        } else {
                          setConfirmationFilter(confirmationFilter.filter((s) => s !== "no_response"))
                        }
                      }}
                    >
                      Sem resposta
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="sm:col-span-2 lg:col-span-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por cliente"
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="sm:col-span-2 lg:col-span-1">
                {date && (
                  <Button variant="ghost" onClick={() => setDate(undefined)} className="h-10">
                    Limpar data
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="upcoming" className="space-y-4">
            <TabsList>
              <TabsTrigger value="upcoming">Próximas Sessões</TabsTrigger>
              <TabsTrigger value="past">Sessões Passadas</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="space-y-4">
              {upcomingSessions.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                    <CalendarIcon className="h-10 w-10 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium">Nenhuma sessão encontrada</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Não há sessões agendadas que correspondam aos filtros selecionados.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                upcomingSessions.map((session) => (
                  <Card
                    key={session.id}
                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => handleViewSession(session)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle>{session.clientName}</CardTitle>
                        <SessionConfirmationStatus status={session.confirmationStatus || "no_response"} />
                      </div>
                      <CardDescription>{session.clientEmail}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-sm font-medium">Data</p>
                          <p className="text-sm">{formatSessionDate(session.date)}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Horário</p>
                          <p className="text-sm">{formatSessionTime(session.date)}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Duração</p>
                          <p className="text-sm">{session.duration} minutos</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Local</p>
                          <p className="text-sm">{session.location}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      {session.notes && (
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">Observações:</span> {session.notes}
                        </p>
                      )}
                    </CardFooter>
                  </Card>
                ))
              )}
            </TabsContent>
            <TabsContent value="past" className="space-y-4">
              {pastSessions.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                    <CalendarIcon className="h-10 w-10 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium">Nenhuma sessão encontrada</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Não há sessões passadas que correspondam aos filtros selecionados.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                pastSessions.map((session) => (
                  <Card
                    key={session.id}
                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => handleViewSession(session)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle>{session.clientName}</CardTitle>
                        <Badge variant="secondary">Concluída</Badge>
                      </div>
                      <CardDescription>{session.clientEmail}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-sm font-medium">Data</p>
                          <p className="text-sm">{formatSessionDate(session.date)}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Horário</p>
                          <p className="text-sm">{formatSessionTime(session.date)}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Duração</p>
                          <p className="text-sm">{session.duration} minutos</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Local</p>
                          <p className="text-sm">{session.location}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      {session.notes && (
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">Observações:</span> {session.notes}
                        </p>
                      )}
                    </CardFooter>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Resumo</CardTitle>
              <CardDescription>Visão geral das suas sessões</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Sessões Hoje</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">3</span>
                  <Badge variant="outline">2 confirmadas</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Próxima Sessão</p>
                <div className="text-sm">
                  <p className="font-medium">Cliente 6</p>
                  <p className="text-muted-foreground">Hoje às 14:30</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Status de Confirmação</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                    <span className="text-sm">Confirmadas: 4</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                    <span className="text-sm">Aguardando: 2</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-destructive"></div>
                    <span className="text-sm">Recusadas: 1</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-muted"></div>
                    <span className="text-sm">Sem resposta: 3</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedSession && (
        <ViewSessionDialog open={viewSessionOpen} onOpenChange={setViewSessionOpen} session={selectedSession} />
      )}

      <CreateSessionDialog open={createSessionOpen} onOpenChange={setCreateSessionOpen} />
    </div>
  )
}
