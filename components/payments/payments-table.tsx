"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"
import { SendReminderDialog } from "./send-reminder-dialog"

// Tipos para os pagamentos
interface Payment {
  id: string
  client: string
  date: string
  amount: string
  status: string
  method: string
  invoice: string
}

interface PaymentsTableProps {
  payments: Payment[]
  showStatus?: boolean
}

export function PaymentsTable({ payments, showStatus = true }: PaymentsTableProps) {
  // Função para obter a cor do badge com base no status
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "paid":
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
      case "paid":
        return "Pago"
      case "pending":
        return "Pendente"
      case "overdue":
        return "Atrasado"
      default:
        return status
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Valor</TableHead>
          {showStatus && <TableHead>Status</TableHead>}
          <TableHead>Método</TableHead>
          <TableHead>Fatura</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell className="font-medium">{payment.id}</TableCell>
            <TableCell>{payment.client}</TableCell>
            <TableCell>{payment.date}</TableCell>
            <TableCell>{payment.amount}</TableCell>
            {showStatus && (
              <TableCell>
                <Badge variant={getStatusBadgeVariant(payment.status)}>{getStatusText(payment.status)}</Badge>
              </TableCell>
            )}
            <TableCell>{payment.method}</TableCell>
            <TableCell>{payment.invoice}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Abrir menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                  {payment.status === "pending" && (
                    <>
                      <SendReminderDialog
                        clientName={payment.client}
                        paymentId={payment.id}
                        amount={payment.amount}
                        dueDate={payment.date}
                      >
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Enviar lembrete</DropdownMenuItem>
                      </SendReminderDialog>
                      <DropdownMenuItem>Marcar como pago</DropdownMenuItem>
                    </>
                  )}
                  {payment.status === "overdue" && (
                    <>
                      <SendReminderDialog
                        clientName={payment.client}
                        paymentId={payment.id}
                        amount={payment.amount}
                        dueDate={payment.date}
                      >
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Enviar lembrete</DropdownMenuItem>
                      </SendReminderDialog>
                      <DropdownMenuItem>Marcar como pago</DropdownMenuItem>
                      <DropdownMenuItem>Renegociar</DropdownMenuItem>
                    </>
                  )}
                  {payment.status === "paid" && (
                    <>
                      <DropdownMenuItem>Baixar recibo</DropdownMenuItem>
                      <DropdownMenuItem>Enviar recibo por email</DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
