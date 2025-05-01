import { ClientPayments } from "@/components/payments/client-payments"

export default function PaymentClientsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Clientes e Pagamentos</h1>
      <ClientPayments />
    </div>
  )
}
