import { NewPaymentForm } from "@/components/payments/new-payment-form"

export default function NewPaymentPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Criar Novo Pagamento</h1>
      <NewPaymentForm />
    </div>
  )
}
