"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Search, Filter, Eye } from "lucide-react"

// Dados de exemplo para o histórico de lembretes
const reminderHistoryData = [
  {
    id: "rem-001",
    client: "Maria Oliveira",
    paymentId: "PAY-003",
    amount: "R$ 250,00",
    dueDate: "18/04/2023",
    sentDate: "15/04/2023",
    template: "Lembrete Prévio",
    channel: "email",
    status: "delivered",
  },
  {
    id: "rem-002",
    client: "Maria Oliveira",
    paymentId: "PAY-003",
    amount: "R$ 250,00",
    dueDate: "18/04/2023",
    sentDate: "18/04/2023",
    template: "Vencimento Hoje",
    channel: "email",
    status: "delivered",
  },
  {
    id: "rem-003",
    client: "Maria Oliveira",
    paymentId: "PAY-003",
    amount: "R$ 250,00",
    dueDate: "18/04/2023",
    sentDate: "21/04/2023",
    template: "Pagamento Atrasado",
    channel: "email",
    status: "delivered",
  },
  {
    id: "rem-004",
    client: "Carlos Mendes",
    paymentId: "PAY-004",
    amount: "R$ 350,00",
    dueDate: "22/04/2023",
    sentDate: "19/04/2023",
    template: "Lembrete Prévio",
    channel: "email",
    status: "delivered",
  },
  {
    id: "rem-005",
    client: "Carlos Mendes",
    paymentId: "PAY-004",
    amount: "R$ 350,00",
    dueDate: "22/04/2023",
    sentDate: "22/04/2023",
    template: "Vencimento Hoje",
    channel: "sms",
    status: "delivered",
  },
  {
    id: "rem-006",
    client: "Carlos Mendes",
    paymentId: "PAY-004",
    amount: "R$ 350,00",
    dueDate: "22/04/2023",
    sentDate: "25/04/2023",
    template: "Pagamento Atrasado",
    channel: "email",
    status: "delivered",
  },
  {
    id: "rem-007",
    client: "Carlos Mendes",
    paymentId: "PAY-004",
    amount: "R$ 350,00",
    dueDate: "22/04/2023",
    sentDate: "29/04/2023",
    template: "Segundo Aviso",
    channel: "email",
    status: "delivered",
  },
  {
    id: "rem-008",
    client: "Roberto Alves",
    paymentId: "PAY-006",
    amount: "R$ 300,00",
    dueDate: "28/04/2023",
    sentDate: "25/04/2023",
    template: "Lembrete Prévio",
    channel: "email",
    status: "delivered",
  },
  {
    id: "rem-009",
    client: "Roberto Alves",
    paymentId: "PAY-006",
    amount: "R$ 300,00",
    dueDate: "28/04/2023",
    sentDate: "28/04/2023",
    template: "Vencimento Hoje",
    channel: "email",
    status: "failed",
  },
  {
    id: "rem-010",
    client: "Pedro Souza",
    paymentId: "PAY-008",
    amount: "R$ 350,00",
    dueDate: "05/05/2023",
    sentDate: "02/05/2023",
    template: "Lembrete Prévio",
    channel: "sms",
    status: "delivered",
  },
]

export function ReminderHistoryTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [channelFilter, setChannelFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

  // Filtrar lembretes com base nos filtros aplicados
  const filteredReminders = reminderHistoryData.filter((reminder) => {
    // Filtro de pesquisa
    const matchesSearch =
      reminder.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reminder.paymentId.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtro de canal
    const matchesChannel = channelFilter === "all" || reminder.channel === channelFilter

    // Filtro de status
    const matchesStatus = statusFilter === "all" || reminder.status === statusFilter

    return matchesSearch && matchesChannel && matchesStatus
  })

  // Função para obter a cor do badge com base no status
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "delivered":
        return "success"
      case "failed":
        return "destructive"
      case "pending":
        return "warning"
      default:
        return "default"
    }
  }

  // Função para obter o texto do status em português
  const getStatusText = (status: string) => {
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
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por cliente ou ID..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Select value={channelFilter} onValueChange={setChannelFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Canal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os canais</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="sms">SMS</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="delivered">Entregue</SelectItem>
              <SelectItem value="failed">Falhou</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <DatePicker date={startDate} setDate={setStartDate} placeholder="Data inicial" />
            <span className="text-muted-foreground">até</span>
            <DatePicker date={endDate} setDate={setEndDate} placeholder="Data final" />
          </div>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Pagamento</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Vencimento</TableHead>
            <TableHead>Enviado em</TableHead>
            <TableHead>Template</TableHead>
            <TableHead>Canal</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredReminders.map((reminder) => (
            <TableRow key={reminder.id}>
              <TableCell className="font-medium">{reminder.id}</TableCell>
              <TableCell>{reminder.client}</TableCell>
              <TableCell>{reminder.paymentId}</TableCell>
              <TableCell>{reminder.amount}</TableCell>
              <TableCell>{reminder.dueDate}</TableCell>
              <TableCell>{reminder.sentDate}</TableCell>
              <TableCell>{reminder.template}</TableCell>
              <TableCell>
                <Badge variant="outline">{reminder.channel === "email" ? "Email" : "SMS"}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={getStatusBadgeVariant(reminder.status)}>{getStatusText(reminder.status)}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
