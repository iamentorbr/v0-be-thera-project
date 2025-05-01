import { FinancialReport } from "@/components/payments/financial-report"

export default function PaymentReportsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Relatórios Financeiros</h1>
      <FinancialReport />
    </div>
  )
}
