"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface BrandPreviewProps {
  primaryColor: string
  secondaryColor: string
  accentColor: string
  borderRadius: number
  logoUrl?: string | null
}

export function BrandPreview({ primaryColor, secondaryColor, accentColor, borderRadius, logoUrl }: BrandPreviewProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader
        className="flex flex-row items-center gap-2 p-4"
        style={{ backgroundColor: primaryColor, color: "#ffffff" }}
      >
        {logoUrl && <img src={logoUrl || "/placeholder.svg"} alt="Logo" className="h-8 w-auto object-contain" />}
        <h3 className="font-medium">Portal do Cliente</h3>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4 space-y-2">
          <h4 className="text-sm font-medium">Próxima Sessão</h4>
          <div
            className="rounded-md p-3"
            style={{
              backgroundColor: secondaryColor,
              borderRadius: `${borderRadius}px`,
            }}
          >
            <p className="text-sm">Terapia Cognitivo-Comportamental</p>
            <p className="text-xs text-muted-foreground">Quinta-feira, 10:00</p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Ações</h4>
          <div className="flex gap-2">
            <Button
              style={{
                backgroundColor: accentColor,
                borderRadius: `${borderRadius}px`,
              }}
              className="text-white"
            >
              Agendar
            </Button>
            <Button variant="outline" style={{ borderRadius: `${borderRadius}px` }}>
              Ver exercícios
            </Button>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium">Exercícios Recentes</h4>
          <div className="space-y-2">
            <div className="rounded-md border p-3" style={{ borderRadius: `${borderRadius}px` }}>
              <p className="text-sm font-medium">Técnica de Respiração</p>
              <p className="text-xs text-muted-foreground">Atribuído há 2 dias</p>
            </div>
            <div className="rounded-md border p-3" style={{ borderRadius: `${borderRadius}px` }}>
              <p className="text-sm font-medium">Diário de Gratidão</p>
              <p className="text-xs text-muted-foreground">Atribuído há 1 semana</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
