"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DatePicker } from "@/components/ui/date-picker"
import { PaymentsTable } from "@/components/payments/payments-table"
import { Calendar, CreditCard, Download, FileText, Filter, MoreHorizontal, Plus, Search, Users } from "lucide-react"
import Link from "next/link"

// Dados de exemplo para pagamentos
const paymentData = [
  {
    id: "PAY-001",
    client: "Maria Oliveira",
    date: "10/04/2023",
    amount: "R$ 250,00",
    status: "paid",
    method: "Cartão de Crédito",
    invoice: "INV-2023-001",
  },
  {
    id: "PAY-002",
    client: "João Silva",
    date: "15/04/2023",
    amount: "R$ 300,00",
    status: "paid",
    method: "PIX",
    invoice: "INV-2023-002",
  },
  {
    id: "PAY-003",
    client: "Ana Santos",
    date: "18/04/2023",
    amount: "R$ 250,00",
    status: "pending",
    method: "Boleto",
    invoice: "INV-2023-003",
  },
  {
    id: "PAY-004",
    client: "Carlos Mendes",
    date: "22/04/2023",
    amount: "R$ 350,00",
    status: "overdue",
    method: "Transferência",
    invoice: "INV-2023-004",
  },
  {
    id: "PAY-005",
    client: "Fernanda Lima",
    date: "25/04/2023",
    amount: "R$ 200,00",
    status: "paid",
    method: "Cartão de Crédito",
    invoice: "INV-2023-005",
  },
  {
    id: "PAY-006",
    client: "Roberto Alves",
    date: "28/04/2023",
    amount: "R$ 300,00",
    status: "pending",
    method: "PIX",
    invoice: "INV-2023-006",
  },
  {
    id: "PAY-007",
    client: "Luciana Costa",
    date: "02/05/2023",
    amount: "R$ 250,00",
    status: "paid",
    method: "Cartão de Débito",
    invoice: "INV-2023-007",
  },
  {
    id: "PAY-008",
    client: "Pedro Souza",
    date: "05/05/2023",
    amount: "R$ 350,00",
    status: "pending",
    method: "Boleto",
    invoice: "INV-2023-008",
  },
]

// Dados de exemplo para o resumo financeiro
const financialSummary = {
  totalReceived: "R$ 1.350,00",
  pendingPayments: "R$ 900,00",
  overduePayments: "R$ 350,00",
  totalClients: 8,
  averageTicket: "R$ 281,25",
}

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

  // Filtrar pagamentos com base nos filtros aplicados
  const filteredPayments = paymentData.filter((payment) => {
    // Filtro de pesquisa
    const matchesSearch =
      payment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtro de status
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter

    return matchesSearch && matchesStatus
  })

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
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Pagamentos</h2>
          <div className="flex items-center space-x-2">
            <Button asChild variant="outline">
              <Link href="/therapist/payments/reminders">Lembretes</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/therapist/payments/reports">
                <Download className="mr-2 h-4 w-4" />
                Relatórios
              </Link>
            </Button>
            <Button asChild>
              <Link href="/therapist/payments/new">
                <Plus className="mr-2 h-4 w-4" />
                Novo Pagamento
              </Link>
            </Button>
          </div>
        </div>

        {/* Resumo financeiro */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Recebido</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{financialSummary.totalReceived}</div>
              <p className="text-xs text-muted-foreground">No período selecionado</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pagamentos Pendentes</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">{financialSummary.pendingPayments}</div>
              <p className="text-xs text-muted-foreground">Aguardando pagamento</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pagamentos Atrasados</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{financialSummary.overduePayments}</div>
              <p className="text-xs text-muted-foreground">Necessitam atenção</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes Pagantes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{financialSummary.totalClients}</div>
              <p className="text-xs text-muted-foreground">Clientes ativos</p>
              <Button variant="link" size="sm" className="px-0 mt-2" asChild>
                <Link href="/therapist/payments/clients">Ver todos</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{financialSummary.averageTicket}</div>
              <p className="text-xs text-muted-foreground">Por sessão</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="paid">Pagos</TabsTrigger>
            <TabsTrigger value="pending">Pendentes</TabsTrigger>
            <TabsTrigger value="overdue">Atrasados</TabsTrigger>
          </TabsList>

          <div className="flex flex-col space-y-4">
            {/* Filtros e pesquisa */}
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
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="paid">Pagos</SelectItem>
                    <SelectItem value="pending">Pendentes</SelectItem>
                    <SelectItem value="overdue">Atrasados</SelectItem>
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

            {/* Tabela de pagamentos */}
            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Pagamentos</CardTitle>
                  <CardDescription>Visualize e gerencie todos os pagamentos de seus clientes.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Método</TableHead>
                        <TableHead>Fatura</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.id}</TableCell>
                          <TableCell>{payment.client}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>{payment.amount}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadgeVariant(payment.status)}>
                              {getStatusText(payment.status)}
                            </Badge>
                          </TableCell>
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
                                    <DropdownMenuItem>Enviar lembrete</DropdownMenuItem>
                                    <DropdownMenuItem>Marcar como pago</DropdownMenuItem>
                                  </>
                                )}
                                {payment.status === "overdue" && (
                                  <>
                                    <DropdownMenuItem>Enviar lembrete</DropdownMenuItem>
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
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="paid" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pagamentos Realizados</CardTitle>
                  <CardDescription>Visualize todos os pagamentos já realizados.</CardDescription>
                </CardHeader>
                <CardContent>
                  <PaymentsTable
                    payments={filteredPayments.filter((payment) => payment.status === "paid")}
                    showStatus={false}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Pagamentos Pendentes</CardTitle>
                      <CardDescription>Visualize e gerencie pagamentos que ainda não foram realizados.</CardDescription>
                    </div>
                    <Button asChild>
                      <Link href="/therapist/payments/reminders">Enviar Lembretes</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <PaymentsTable
                    payments={filteredPayments.filter((payment) => payment.status === "pending")}
                    showStatus={false}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="overdue" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Pagamentos Atrasados</CardTitle>
                      <CardDescription>Visualize e gerencie pagamentos que estão atrasados.</CardDescription>
                    </div>
                    <Button asChild variant="destructive">
                      <Link href="/therapist/payments/reminders">Enviar Lembretes Urgentes</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <PaymentsTable
                    payments={filteredPayments.filter((payment) => payment.status === "overdue")}
                    showStatus={false}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
