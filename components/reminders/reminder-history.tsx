"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, MessageSquare, Search, ChevronLeft, ChevronRight, Eye } from "lucide-react"
import { ViewReminderDialog } from "@/components/reminders/view-reminder-dialog"

// Dados simulados de histórico de lembretes
const mockReminderHistory = [
  {
    id: "1",
    client: {
      id: "1",
      name: "Maria Santos",
    },
    session: {
      id: "101",
      date: new Date(2024, 4, 15),
      time: "14:00",
    },
    type: "session-reminder",
    channel: "email",
    sentAt: new Date(2024, 4, 14, 14, 0),
    status: "delivered",
    template: "Lembrete de Sessão Padrão",
  },
  {
    id: "2",
    client: {
      id: "2",
      name: "João Oliveira",
    },
    session: {
      id: "102",
      date: new Date(2024, 4, 16),
      time: "10:00",
    },
    type: "session-reminder",
    channel: "sms",
    sentAt: new Date(2024, 4, 15, 10, 0),
    status: "delivered",
    template: "Lembrete de Sessão Padrão",
  },
  {
    id: "3",
    client: {
      id: "3",
      name: "Ana Silva",
    },
    session: {
      id: "103",
      date: new Date(2024, 4, 17),
      time: "16:30",
    },
    type: "session-reminder",
    channel: "email",
    sentAt: new Date(2024, 4, 16, 16, 30),
    status: "delivered",
    template: "Lembrete de Sessão Formal",
  },
  {
    id: "4",
    client: {
      id: "4",
      name: "Carlos Mendes",
    },
    session: {
      id: "104",
      date: new Date(2024, 4, 10),
      time: "13:00",
    },
    type: "missed-session",
    channel: "email",
    sentAt: new Date(2024, 4, 10, 13, 15),
    status: "delivered",
    template: "Sessão Perdida",
  },
  {
    id: "5",
    client: {
      id: "5",
      name: "Lúcia Ferreira",
    },
    session: {
      id: "105",
      date: new Date(2024, 4, 12),
      time: "14:00",
    },
    type: "cancelled-session",
    channel: "email",
    sentAt: new Date(2024, 4, 11, 9, 30),
    status: "delivered",
    template: "Sessão Cancelada",
  },
  {
    id: "6",
    client: {
      id: "1",
      name: "Maria Santos",
    },
    session: {
      id: "106",
      date: new Date(2024, 4, 8),
      time: "14:00",
    },
    type: "session-reminder",
    channel: "sms",
    sentAt: new Date(2024, 4, 7, 14, 0),
    status: "failed",
    template: "Lembrete de Sessão Padrão",
  },
]

export function ReminderHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [channelFilter, setChannelFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewReminder, setViewReminder] = useState<any | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)

  // Filtrar lembretes com base nos filtros aplicados
  const filteredReminders = mockReminderHistory.filter((reminder) => {
    const matchesSearch =
      reminder.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      format(reminder.session.date, "dd/MM/yyyy").includes(searchTerm) ||
      reminder.template.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "all" || reminder.type === typeFilter
    const matchesChannel = channelFilter === "all" || reminder.channel === channelFilter
    const matchesStatus = statusFilter === "all" || reminder.status === statusFilter

    return matchesSearch && matchesType && matchesChannel && matchesStatus
  })

  const handleViewReminder = (reminder: any) => {
    setViewReminder(reminder)
    setIsViewOpen(true)
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "session-reminder":
        return "Lembrete de Sessão"
      case "missed-session":
        return "Sessão Perdida"
      case "cancelled-session":
        return "Sessão Cancelada"
      default:
        return type
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "delivered":
        return "default"
      case "failed":
        return "destructive"
      case "pending":
        return "outline"
      default:
        return "default"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "delivered":
        return "Entregue"
      case "failed":
        return "Falhou"
      case "pending":
        return "Pendente"
      default:
        return status
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por cliente, data ou template..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <div className="flex flex-1 gap-2">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              <SelectItem value="session-reminder">Lembrete de Sessão</SelectItem>
              <SelectItem value="missed-session">Sessão Perdida</SelectItem>
              <SelectItem value="cancelled-session">Sessão Cancelada</SelectItem>
            </SelectContent>
          </Select>
          <Select value={channelFilter} onValueChange={setChannelFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Canal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os canais</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="sms">SMS</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="delivered">Entregue</SelectItem>
              <SelectItem value="failed">Falhou</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Sessão</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Canal</TableHead>
              <TableHead>Enviado em</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReminders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                  Nenhum lembrete encontrado com os filtros aplicados.
                </TableCell>
              </TableRow>
            ) : (
              filteredReminders.map((reminder) => (
                <TableRow key={reminder.id}>
                  <TableCell>{reminder.client.name}</TableCell>
                  <TableCell>
                    {format(reminder.session.date, "dd/MM/yyyy", { locale: ptBR })} às {reminder.session.time}
                  </TableCell>
                  <TableCell>{getTypeLabel(reminder.type)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {reminder.channel === "email" ? (
                        <Mail className="mr-1 h-4 w-4" />
                      ) : (
                        <MessageSquare className="mr-1 h-4 w-4" />
                      )}
                      {reminder.channel === "email" ? "Email" : "SMS"}
                    </div>
                  </TableCell>
                  <TableCell>{format(reminder.sentAt, "dd/MM/yyyy HH:mm", { locale: ptBR })}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(reminder.status)}>{getStatusLabel(reminder.status)}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleViewReminder(reminder)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Mostrando {filteredReminders.length} de {mockReminderHistory.length} lembretes
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>
          <Button variant="outline" size="sm" disabled>
            Próximo
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Diálogo para visualizar detalhes do lembrete */}
      {viewReminder && <ViewReminderDialog open={isViewOpen} onOpenChange={setIsViewOpen} reminder={viewReminder} />}
    </div>
  )
}
