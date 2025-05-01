"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Eye, CreditCard } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function ClientInvoiceList() {
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null)

  // Dados de exemplo - em uma aplicação real, estes viriam de uma API
  const invoices = [
    {
      id: "INV-001",
      description: "Sessão de Terapia - Abril",
      date: "01/04/2023",
      dueDate: "15/04/2023",
      amount: "R$ 250,00",
      status: "pago",
      paidDate: "10/04/2023",
      paymentMethod: "Cartão de Crédito",
    },
    {
      id: "INV-002",
      description: "Sessão de Terapia - Maio",
      date: "01/05/2023",
      dueDate: "15/05/2023",
      amount: "R$ 250,00",
      status: "pendente",
      paidDate: null,
      paymentMethod: null,
    },
    {
      id: "INV-003",
      description: "Pacote de Sessões - Junho",
      date: "01/06/2023",
      dueDate: "15/06/2023",
      amount: "R$ 450,00",
      status: "agendado",
      paidDate: null,
      paymentMethod: null,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pago":
        return <Badge variant="success">Pago</Badge>
      case "pendente":
        return <Badge variant="warning">Pendente</Badge>
      case "agendado":
        return <Badge variant="outline">Agendado</Badge>
      case "atrasado":
        return <Badge variant="destructive">Atrasado</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Faturas</CardTitle>
          <CardDescription>Visualize e gerencie suas faturas</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fatura</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Data de Emissão</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.description}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => setSelectedInvoice(invoice)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      {invoice.status === "pago" && (
                        <Button variant="outline" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                      {invoice.status === "pendente" && (
                        <Button size="sm">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Pagar
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!selectedInvoice} onOpenChange={() => setSelectedInvoice(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Detalhes da Fatura</DialogTitle>
            <DialogDescription>Informações completas sobre a fatura {selectedInvoice?.id}</DialogDescription>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Número da Fatura</p>
                  <p>{selectedInvoice.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <p>{getStatusBadge(selectedInvoice.status)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Data de Emissão</p>
                  <p>{selectedInvoice.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Data de Vencimento</p>
                  <p>{selectedInvoice.dueDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Valor</p>
                  <p className="font-bold">{selectedInvoice.amount}</p>
                </div>
                {selectedInvoice.paidDate && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Data de Pagamento</p>
                    <p>{selectedInvoice.paidDate}</p>
                  </div>
                )}
                {selectedInvoice.paymentMethod && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Método de Pagamento</p>
                    <p>{selectedInvoice.paymentMethod}</p>
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Descrição</p>
                <p>{selectedInvoice.description}</p>
              </div>
              <div className="flex justify-end gap-2">
                {selectedInvoice.status === "pago" && (
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Baixar Recibo
                  </Button>
                )}
                {selectedInvoice.status === "pendente" && (
                  <Button>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pagar Agora
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
