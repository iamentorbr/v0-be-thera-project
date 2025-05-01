import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BrandCustomization } from "@/components/settings/brand-customization"

export default function BrandingSettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personalização de Marca</CardTitle>
        <CardDescription>Personalize cores e logo para manter sua identidade visual</CardDescription>
      </CardHeader>
      <CardContent>
        <BrandCustomization />
      </CardContent>
    </Card>
  )
}
