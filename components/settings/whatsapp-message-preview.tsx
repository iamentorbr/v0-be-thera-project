"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface WhatsAppMessagePreviewProps {
  defaultMessage?: string
}

export function WhatsAppMessagePreview({
  defaultMessage = "Olá {{nome}}, gostaria de confirmar sua sessão para {{data}} às {{hora}}. Por favor, responda SIM para confirmar ou NÃO para reagendar.",
}: WhatsAppMessagePreviewProps) {
  const [message, setMessage] = useState(defaultMessage)
  const [previewName, setPreviewName] = useState("Maria")
  const [previewDate, setPreviewDate] = useState("15/05/2023")
  const [previewTime, setPreviewTime] = useState("14:30")

  const previewMessage = message
    .replace("{{nome}}", previewName)
    .replace("{{data}}", previewDate)
    .replace("{{hora}}", previewTime)

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label htmlFor="message-template">Modelo de Mensagem</Label>
        <Textarea
          id="message-template"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite o modelo de mensagem..."
          className="min-h-[100px]"
        />
        <div className="text-sm text-muted-foreground">
          Use <code className="bg-muted p-1 rounded">{"{{nome}}"}</code>,{" "}
          <code className="bg-muted p-1 rounded">{"{{data}}"}</code> e{" "}
          <code className="bg-muted p-1 rounded">{"{{hora}}"}</code> como variáveis.
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="preview-name">Nome</Label>
          <Textarea
            id="preview-name"
            value={previewName}
            onChange={(e) => setPreviewName(e.target.value)}
            className="h-10"
          />
        </div>
        <div>
          <Label htmlFor="preview-date">Data</Label>
          <Textarea
            id="preview-date"
            value={previewDate}
            onChange={(e) => setPreviewDate(e.target.value)}
            className="h-10"
          />
        </div>
        <div>
          <Label htmlFor="preview-time">Hora</Label>
          <Textarea
            id="preview-time"
            value={previewTime}
            onChange={(e) => setPreviewTime(e.target.value)}
            className="h-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Visualização da Mensagem</Label>
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <Card className="bg-[#DCF8C6] border-0">
              <CardContent className="p-4">
                <div className="text-sm">{previewMessage}</div>
                <div className="text-xs text-right text-muted-foreground mt-1">14:45</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button>Salvar Modelo</Button>
      </div>
    </div>
  )
}
