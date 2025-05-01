import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AccountSettings } from "@/components/settings/account-settings"

export default function AccountSettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações da Conta</CardTitle>
        <CardDescription>Gerencie suas credenciais e segurança da conta</CardDescription>
      </CardHeader>
      <CardContent>
        <AccountSettings />
      </CardContent>
    </Card>
  )
}
