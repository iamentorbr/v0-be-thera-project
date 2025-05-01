"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Download } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ConfirmationRateChart } from "@/components/analytics/confirmation-rate-chart"
import { PeriodFilter } from "@/components/analytics/period-filter"

// Dados simulados
const clientsData = {
  "1": { id: "1", name: "Maria Silva", email: "maria.silva@example.com" },
  "2": { id: "2", name: "João Santos", email: "joao.santos@example.com" },
  "3": { id: "3", name: "Ana Oliveira", email: "ana.oliveira@example.com" },
  "4": { id: "4", name: "Carlos Pereira", email: "carlos.pereira@example.com" },
}

const generateSessionsData = (clientId: string) => {
  const sessions = []
  const now = new Date()

  for (let i = 1; i <= 15; i++) {
    const date = new Date(now)
    date.setDate(now.getDate() - Math.floor(Math.random() * 90))

    const confirmationStatus = ["confirmed", "declined", "no_response"][Math.floor(Math.random() * 3)]
    const responseTime = confirmationStatus !== "no_response" ? Math.floor(Math.random() * 48) + 1 : null

    sessions.push({
      id: `${clientId}-${i}`,
      date: date.toISOString(),
      type: ["Terapia", "Coaching", "Consulta Inicial"][Math.floor(Math.random() * 3)],
      confirmationStatus,
      responseTime,
      reminderSentAt: new Date(date.getTime() - (Math.floor(Math.random() * 72) + 24) * 3600000).toISOString(),
    })
  }

  return sessions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default function ClientAnalyticsPage() {
  const params = useParams()
  const clientId = params.id as string
  const client = clientsData[clientId as keyof typeof clientsData]
  const [startDate, setStartDate] = useState<Date>(new Date(new Date().setMonth(new Date().getMonth() - 1)))
  const [endDate, setEndDate] = useState<Date>(new Date())

  const handlePeriodChange = (start: Date, end: Date) => {
    setStartDate(start)
    setEndDate(end)
  }

  const sessionsData = generateSessionsData(clientId)

  const filteredSessions = sessionsData.filter((session) => {
    const sessionDate = new Date(session.date)
    return sessionDate >= startDate && sessionDate <= endDate
  })

  const getConfirmationStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-emerald-500">Confirmada</Badge>
      case "declined":
        return <Badge className="bg-destructive">Recusada</Badge>
      case "no_response":
        return <Badge variant="outline">Sem resposta</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Calcular estatísticas
  const totalSessions = filteredSessions.length
  const confirmedSessions = filteredSessions.filter((s) => s.confirmationStatus === "confirmed").length
  const declinedSessions = filteredSessions.filter((s) => s.confirmationStatus === "declined").length
  const noResponseSessions = filteredSessions.filter((s) => s.confirmationStatus === "no_response").length

  const confirmationRate = totalSessions ? Math.round((confirmedSessions / totalSessions) * 100) : 0
  const declineRate = totalSessions ? Math.round((declinedSessions / totalSessions) * 100) : 0
  const noResponseRate = totalSessions ? Math.round((noResponseSessions / totalSessions) * 100) : 0

  // Calcular tempo médio de resposta
  const responseTimes = filteredSessions
    .filter((s) => s.confirmationStatus !== "no_response" && s.responseTime)
    .map((s) => s.responseTime as number)

  const averageResponseTime = responseTimes.length
    ? Math.round(responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length)
    : 0

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/therapist/analytics">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Voltar</span>
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Análise de {client?.name || "Cliente"}</h2>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar Relatório
        </Button>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Filtros</CardTitle>
            <CardDescription>Selecione o período para análise</CardDescription>
          </CardHeader>
          <CardContent>
            <PeriodFilter onPeriodChange={handlePeriodChange} />
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Confirmação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{confirmationRate}%</div>
              <p className="text-xs text-muted-foreground">
                {confirmedSessions} de {totalSessions} sessões
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Recusa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{declineRate}%</div>
              <p className="text-xs text-muted-foreground">
                {declinedSessions} de {totalSessions} sessões
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sem Resposta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{noResponseRate}%</div>
              <p className="text-xs text-muted-foreground">
                {noResponseSessions} de {totalSessions} sessões
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tempo Médio de Resposta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageResponseTime} horas</div>
              <p className="text-xs text-muted-foreground">Após envio do lembrete</p>
            </CardContent>
          </Card>
        </div>

        <ConfirmationRateChart clientId={clientId} clientName={client?.name} />

        <Card>
          <CardHeader>
            <CardTitle>Histórico de Sessões</CardTitle>
            <CardDescription>Detalhes de confirmação para cada sessão</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Lembrete Enviado</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tempo de Resposta</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSessions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      Nenhuma sessão encontrada no período selecionado.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>{format(parseISO(session.date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}</TableCell>
                      <TableCell>{session.type}</TableCell>
                      <TableCell>
                        {format(parseISO(session.reminderSentAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                      </TableCell>
                      <TableCell>{getConfirmationStatusBadge(session.confirmationStatus)}</TableCell>
                      <TableCell>
                        {session.responseTime ? (
                          `${session.responseTime} horas`
                        ) : (
                          <span className="text-muted-foreground">N/A</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
