import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DocumentSettings } from "@/components/settings/document-settings"

export default function DocumentSettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações de Documentos</CardTitle>
        <CardDescription>Gerencie modelos de documentos e configurações de assinatura</CardDescription>
      </CardHeader>
      <CardContent>
        <DocumentSettings />
      </CardContent>
    </Card>
  )
}
