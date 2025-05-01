"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"

interface EditReminderTemplateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  template: any
  onSave: (template: any) => void
}

export function EditReminderTemplateDialog({ open, onOpenChange, template, onSave }: EditReminderTemplateDialogProps) {
  const [name, setName] = useState("")
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [channels, setChannels] = useState<string[]>([])
  const [includeConfirmation, setIncludeConfirmation] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (template) {
      setName(template.name)
      setSubject(template.subject)
      setBody(template.body)
      setChannels(template.channels)
      setIncludeConfirmation(template.body?.includes("{{link_confirmacao}}") || false)
    }
  }, [template])

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Aqui seria a chamada para a API para atualizar o template
      // Por enquanto, vamos apenas simular um atraso
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const updatedTemplate = {
        ...template,
        name,
        subject,
        body,
        channels,
      }

      onSave(updatedTemplate)
      onOpenChange(false)
    } catch (error) {
      console.error("Erro ao atualizar template:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChannelChange = (channel: string, checked: boolean) => {
    if (checked) {
      setChannels((prev) => [...prev, channel])
    } else {
      setChannels((prev) => prev.filter((c) => c !== channel))
    }
  }

  const insertVariable = (variable: string) => {
    setBody((prev) => prev + `{{${variable}}}`)
  }

  const insertConfirmationLink = () => {
    setBody((prev) => prev + "\n\nPara confirmar sua presença, clique no link abaixo:\n{{link_confirmacao}}")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Editar Template</DialogTitle>
          <DialogDescription>
            Edite seu template de lembrete. Use variáveis como {"{{cliente}}"} para personalizar suas mensagens.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nome do Template</Label>
              <Input id="edit-name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-type">Tipo de Lembrete</Label>
              <Select value={template?.type} disabled>
                <SelectTrigger id="edit-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="session-reminder">Lembrete de Sessão</SelectItem>
                  <SelectItem value="missed-session">Sessão Perdida</SelectItem>
                  <SelectItem value="cancelled-session">Sessão Cancelada</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">O tipo de lembrete não pode ser alterado.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-subject">Assunto (para emails)</Label>
              <Input id="edit-subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-body">Mensagem</Label>
              <Textarea
                id="edit-body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="min-h-[150px]"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => insertVariable("cliente")}>
                  {"{{cliente}}"}
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => insertVariable("terapeuta")}>
                  {"{{terapeuta}}"}
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => insertVariable("data")}>
                  {"{{data}}"}
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => insertVariable("hora")}>
                  {"{{hora}}"}
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => insertVariable("local")}>
                  {"{{local}}"}
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => insertVariable("telefone")}>
                  {"{{telefone}}"}
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="edit-include-confirmation" className="cursor-pointer">
                Incluir link de confirmação
              </Label>
              <Switch
                id="edit-include-confirmation"
                checked={includeConfirmation}
                onCheckedChange={(checked) => {
                  setIncludeConfirmation(checked)
                  if (checked && !body.includes("{{link_confirmacao}}")) {
                    insertConfirmationLink()
                  }
                }}
              />
            </div>
            {includeConfirmation && (
              <p className="text-sm text-muted-foreground">
                Um link único será gerado para cada cliente confirmar sua presença diretamente pelo lembrete.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Canais</Label>
            <div className="flex items-start space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="edit-channel-email"
                  checked={channels.includes("email")}
                  onCheckedChange={(checked) => handleChannelChange("email", checked as boolean)}
                />
                <Label htmlFor="edit-channel-email">Email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="edit-channel-sms"
                  checked={channels.includes("sms")}
                  onCheckedChange={(checked) => handleChannelChange("sms", checked as boolean)}
                />
                <Label htmlFor="edit-channel-sms">SMS</Label>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
