"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

interface ContactSupportFormProps {
  userType: "therapist" | "client"
}

export function ContactSupportForm({ userType }: ContactSupportFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulação de envio
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Mensagem enviada",
      description: "Entraremos em contato em breve.",
    })

    setIsSubmitting(false)

    // Limpar formulário
    const form = e.target as HTMLFormElement
    form.reset()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Assunto</Label>
          <Select required>
            <SelectTrigger id="subject">
              <SelectValue placeholder="Selecione um assunto" />
            </SelectTrigger>
            <SelectContent>
              {userType === "therapist" ? (
                <>
                  <SelectItem value="account">Conta e Perfil</SelectItem>
                  <SelectItem value="clients">Gerenciamento de Clientes</SelectItem>
                  <SelectItem value="sessions">Agendamento de Sessões</SelectItem>
                  <SelectItem value="payments">Pagamentos</SelectItem>
                  <SelectItem value="technical">Problemas Técnicos</SelectItem>
                  <SelectItem value="other">Outro</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="account">Conta e Perfil</SelectItem>
                  <SelectItem value="sessions">Sessões</SelectItem>
                  <SelectItem value="payments">Pagamentos</SelectItem>
                  <SelectItem value="technical">Problemas Técnicos</SelectItem>
                  <SelectItem value="other">Outro</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Mensagem</Label>
          <Textarea id="message" placeholder="Descreva sua dúvida ou problema em detalhes..." rows={6} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="attachment">Anexo (opcional)</Label>
          <Input id="attachment" type="file" />
          <p className="text-xs text-muted-foreground">
            Você pode anexar capturas de tela ou documentos relevantes (máx. 5MB)
          </p>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
      </Button>
    </form>
  )
}
