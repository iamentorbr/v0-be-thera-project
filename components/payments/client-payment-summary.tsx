"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Calendar, AlertCircle, CheckCircle } from "lucide-react"

export function ClientPaymentSummary() {
  // Dados de exemplo - em uma aplicação real, estes viriam de uma API
  const paymentData = {
    nextPayment: {
      amount: "R$ 250,00",
      date: "15/05/2023",
      status: "pendente",
    },
    lastPayment: {
      amount: "R$ 250,00",
      date: "15/04/2023",
      status: "pago",
    },
    pendingAmount: "R$ 250,00",
    totalPaid: "R$ 750,00",
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Próximo Pagamento</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{paymentData.nextPayment.amount}</div>
          <p className="text-xs text-muted-foreground">Vencimento em {paymentData.nextPayment.date}</p>
          <div className="mt-2 flex items-center text-xs">
            {paymentData.nextPayment.status === "pendente" ? (
              <AlertCircle className="mr-1 h-3 w-3 text-amber-500" />
            ) : (
              <CheckCircle className="mr-1 h-3 w-3 text-green-500" />
            )}
            <span className={paymentData.nextPayment.status === "pendente" ? "text-amber-500" : "text-green-500"}>
              {paymentData.nextPayment.status === "pendente" ? "Aguardando pagamento" : "Pago"}
            </span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Último Pagamento</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{paymentData.lastPayment.amount}</div>
          <p className="text-xs text-muted-foreground">Pago em {paymentData.lastPayment.date}</p>
          <div className="mt-2 flex items-center text-xs text-green-500">
            <CheckCircle className="mr-1 h-3 w-3" />
            <span>Confirmado</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Valor Pendente</CardTitle>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{paymentData.pendingAmount}</div>
          <p className="text-xs text-muted-foreground">Total a pagar</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Pago</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{paymentData.totalPaid}</div>
          <p className="text-xs text-muted-foreground">Histórico completo</p>
        </CardContent>
      </Card>
    </div>
  )
}
