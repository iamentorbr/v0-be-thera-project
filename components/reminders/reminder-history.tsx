"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Mail, MessageSquare, Search, RefreshCw, Eye } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

// Dados de exemplo
const mockHistory = [
  {
    id: "1",
    clientName: "João Silva",
    templateName: "Lembrete de Sessão Padrão",
    type: "session-reminder",
    channel: "email",
    sentAt: new Date(2023, 4, 15, 9, 30),
    status: "delivered",
  },
  {
    id: "2",
    clientName: "Maria Oliveira",
    templateName: "Lembrete de Sessão Padrão",
    type: "session-reminder",
    channel: "sms",
    sentAt: new Date(2023, 4, 15, 10, 0),
    status: "delivered",
  },
  {
    id: "3",
    clientName: "Pedro Santos",
    templateName: "Lembrete de Sessão Perdida",
    type: "missed-session",
    channel: "email",
    sentAt: new Date(2023, 4, 14, 15, 45),
    status: "failed",
  },
  {
    id: "4",
    clientName: "Ana Costa",
    templateName: "Lembrete de Sessão Cancelada",
    type: "cancelled-session",
    channel: "email",
    sentAt: new Date(2023, 4, 14, 11, 20),
    status: "delivered",
  },
  {
    id: "5",
    clientName: "Carlos Ferreira",
    templateName: "Lembrete de Sessão Padrão",
    type: "session-reminder",
    channel: "sms",
    sentAt: new Date(2023, 4, 13, 16, 10),
    status: "pending",
  },
]

export function ReminderHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [channelFilter, setChannelFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredHistory = mockHistory.filter((item) => {
    const matchesSearch =
      item.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.templateName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || item.type === typeFilter
    const matchesChannel = channelFilter === "all" || item.channel === channelFilter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter

    return matchesSearch && matchesType && matchesChannel && matchesStatus
  })

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-500">Entregue</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pendente</Badge>
      case "failed":
        return <Badge className="bg-red-500">Falhou</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "email":
        return <Mail className="h-4 w-4 mr-1" />
      case "sms":
        return <MessageSquare className="h-4 w-4 mr-1" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Label htmlFor="search" className="sr-only">
            Buscar
          </Label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Buscar por cliente ou template..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <Label htmlFor="type-filter" className="sr-only">
              Tipo
            </Label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger id="type-filter" className="w-full">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="session-reminder">Lembrete de Sessão</SelectItem>
                <SelectItem value="missed-session">Sessão Perdida</SelectItem>
                <SelectItem value="cancelled-session">Sessão Cancelada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="channel-filter" className="sr-only">
              Canal
            </Label>
            <Select value={channelFilter} onValueChange={setChannelFilter}>
              <SelectTrigger id="channel-filter" className="w-full">
                <SelectValue placeholder="Canal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os canais</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="status-filter" className="sr-only">
              Status
            </Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger id="status-filter" className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="delivered">Entregue</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="failed">Falhou</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Canal</TableHead>
              <TableHead>Data de Envio</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredHistory.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  Nenhum lembrete encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filteredHistory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.clientName}</p>
                      <p className="text-xs text-muted-foreground">{item.templateName}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeLabel(item.type)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {getChannelIcon(item.channel)}
                      <span className="capitalize">{item.channel}</span>
                    </div>
                  </TableCell>
                  <TableCell>{format(item.sentAt, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Ver detalhes</span>
                      </Button>
                      {item.status === "failed" && (
                        <Button variant="ghost" size="icon">
                          <RefreshCw className="h-4 w-4" />
                          <span className="sr-only">Reenviar</span>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
