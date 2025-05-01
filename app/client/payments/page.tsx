import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClientPaymentHistory } from "@/components/payments/client-payment-history"
import { ClientPaymentMethods } from "@/components/payments/client-payment-methods"
import { ClientInvoiceList } from "@/components/payments/client-invoice-list"
import { ClientPaymentSummary } from "@/components/payments/client-payment-summary"

export default function ClientPaymentsPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Pagamentos</h2>
            <p className="text-muted-foreground">Gerencie suas faturas e métodos de pagamento</p>
          </div>
        </div>

        <ClientPaymentSummary />

        <Tabs defaultValue="invoices" className="space-y-4">
          <TabsList>
            <TabsTrigger value="invoices">Faturas</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="methods">Métodos de Pagamento</TabsTrigger>
          </TabsList>
          <TabsContent value="invoices" className="space-y-4">
            <ClientInvoiceList />
          </TabsContent>
          <TabsContent value="history" className="space-y-4">
            <ClientPaymentHistory />
          </TabsContent>
          <TabsContent value="methods" className="space-y-4">
            <ClientPaymentMethods />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
