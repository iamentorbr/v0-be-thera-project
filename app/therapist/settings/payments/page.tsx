import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PaymentSettings } from "@/components/settings/payment-settings"

export default function PaymentSettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações de Pagamento</CardTitle>
        <CardDescription>Gerencie seus métodos de recebimento e dados bancários</CardDescription>
      </CardHeader>
      <CardContent>
        <PaymentSettings />
      </CardContent>
    </Card>
  )
}
