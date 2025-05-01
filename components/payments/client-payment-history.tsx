"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export function ClientPaymentHistory() {
  const [filter, setFilter] = useState("all")

  // Dados de exemplo - em uma aplicação real, estes viriam de uma API
  const payments = [
    {
      id: "PAY-001",
      date: "10/04/2023",
      amount: "R$ 250,00",
      method: "Cartão de Crédito",
      description: "Sessão de Terapia - Abril",
      status: "confirmado",
    },
    {
      id: "PAY-002",
      date: "10/03/2023",
      amount: "R$ 250,00",
      method: "Cartão de Crédito",
      description: "Sessão de Terapia - Março",
      status: "confirmado",
    },
    {
      id: "PAY-003",
      date: "10/02/2023",
      amount: "R$ 250,00",
      method: "Transferência Bancária",
      description: "Sessão de Terapia - Fevereiro",
      status: "confirmado",
    },
    {
      id: "PAY-004",
      date: "15/05/2023",
      amount: "R$ 250,00",
      method: "Pendente",
      description: "Sessão de Terapia - Maio",
      status: "pendente",
    },
  ]

  const filteredPayments = filter === "all" ? payments : payments.filter((payment) => payment.status === filter)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmado":
        return <Badge variant="success">Confirmado</Badge>
      case "pendente":
        return <Badge variant="warning">Pendente</Badge>
      case "falhou":
        return <Badge variant="destructive">Falhou</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Histórico de Pagamentos</CardTitle>
          <CardDescription>Visualize todos os seus pagamentos</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="confirmado">Confirmados</SelectItem>
              <SelectItem value="pendente">Pendentes</SelectItem>
              <SelectItem value="falhou">Falhos</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Método</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Recibo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.id}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.description}</TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>{getStatusBadge(payment.status)}</TableCell>
                <TableCell className="text-right">
                  {payment.status === "confirmado" && (
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Baixar
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
