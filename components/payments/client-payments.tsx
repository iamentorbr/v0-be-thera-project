"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, UserPlus } from "lucide-react"

// Dados de exemplo para clientes e seus pagamentos
const clientsData = [
  {
    id: "1",
    name: "Maria Oliveira",
    email: "maria@email.com",
    totalPaid: "R$ 750,00",
    pendingAmount: "R$ 0,00",
    lastPayment: "10/04/2023",
    status: "active",
  },
  {
    id: "2",
    name: "João Silva",
    email: "joao@email.com",
    totalPaid: "R$ 300,00",
    pendingAmount: "R$ 0,00",
    lastPayment: "15/04/2023",
    status: "active",
  },
  {
    id: "3",
    name: "Ana Santos",
    email: "ana@email.com",
    totalPaid: "R$ 0,00",
    pendingAmount: "R$ 250,00",
    lastPayment: "-",
    status: "pending",
  },
  {
    id: "4",
    name: "Carlos Mendes",
    email: "carlos@email.com",
    totalPaid: "R$ 0,00",
    pendingAmount: "R$ 350,00",
    lastPayment: "-",
    status: "overdue",
  },
  {
    id: "5",
    name: "Fernanda Lima",
    email: "fernanda@email.com",
    totalPaid: "R$ 200,00",
    pendingAmount: "R$ 0,00",
    lastPayment: "25/04/2023",
    status: "active",
  },
  {
    id: "6",
    name: "Roberto Alves",
    email: "roberto@email.com",
    totalPaid: "R$ 0,00",
    pendingAmount: "R$ 300,00",
    lastPayment: "-",
    status: "pending",
  },
  {
    id: "7",
    name: "Luciana Costa",
    email: "luciana@email.com",
    totalPaid: "R$ 250,00",
    pendingAmount: "R$ 0,00",
    lastPayment: "02/05/2023",
    status: "active",
  },
  {
    id: "8",
    name: "Pedro Souza",
    email: "pedro@email.com",
    totalPaid: "R$ 0,00",
    pendingAmount: "R$ 350,00",
    lastPayment: "-",
    status: "pending",
  },
]

export function ClientPayments() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filtrar clientes com base na pesquisa
  const filteredClients = clientsData.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Função para obter a cor do badge com base no status
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "success"
      case "pending":
        return "warning"
      case "overdue":
        return "destructive"
      default:
        return "default"
    }
  }

  // Função para obter o texto do status em português
  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Em dia"
      case "pending":
        return "Pendente"
      case "overdue":
        return "Atrasado"
      default:
        return status
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Clientes e Pagamentos</CardTitle>
            <CardDescription>Gerencie os pagamentos de seus clientes</CardDescription>
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Novo Cliente
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por cliente ou email..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Total Pago</TableHead>
              <TableHead>Pendente</TableHead>
              <TableHead>Último Pagamento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.totalPaid}</TableCell>
                <TableCell>{client.pendingAmount}</TableCell>
                <TableCell>{client.lastPayment}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(client.status)}>{getStatusText(client.status)}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    Ver Histórico
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
