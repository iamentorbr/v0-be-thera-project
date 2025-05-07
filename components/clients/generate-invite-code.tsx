"use client"

import { useState } from "react"
import { Copy, Check, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

export function GenerateInviteCode() {
  const [inviteCode, setInviteCode] = useState("CLIENT-" + Math.random().toString(36).substring(2, 8).toUpperCase())
  const [copied, setCopied] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [clientEmail, setClientEmail] = useState("")
  const [clientName, setClientName] = useState("")

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteCode)
    setCopied(true)
    toast({
      title: "Código copiado!",
      description: "O código de convite foi copiado para a área de transferência.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const generateNewCode = () => {
    setIsGenerating(true)
    // Simulando uma chamada à API para gerar um novo código
    setTimeout(() => {
      setInviteCode("CLIENT-" + Math.random().toString(36).substring(2, 8).toUpperCase())
      setIsGenerating(false)
    }, 500)
  }

  const sendInvite = () => {
    if (!clientEmail) {
      toast({
        title: "E-mail obrigatório",
        description: "Por favor, informe o e-mail do cliente para enviar o convite.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Convite enviado!",
      description: `Um e-mail com o código de convite foi enviado para ${clientEmail}.`,
    })

    // Limpar os campos após enviar
    setClientName("")
    setClientEmail("")
    generateNewCode()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerar Código de Convite</CardTitle>
        <CardDescription>
          Crie um código de convite para que seu cliente possa se cadastrar na plataforma
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="client-name">Nome do Cliente (opcional)</Label>
          <Input
            id="client-name"
            placeholder="Nome do cliente"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="client-email">E-mail do Cliente</Label>
          <Input
            id="client-email"
            type="email"
            placeholder="email@cliente.com"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="invite-code">Código de Convite</Label>
          <div className="flex space-x-2">
            <Input id="invite-code" value={inviteCode} readOnly className="font-mono" />
            <Button variant="outline" size="icon" onClick={copyToClipboard} title="Copiar código">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={generateNewCode}
              disabled={isGenerating}
              title="Gerar novo código"
            >
              <RefreshCw className={`h-4 w-4 ${isGenerating ? "animate-spin" : ""}`} />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Este código é válido por 7 dias e pode ser usado apenas uma vez.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={sendInvite} className="w-full">
          Enviar Convite por E-mail
        </Button>
      </CardFooter>
    </Card>
  )
}
