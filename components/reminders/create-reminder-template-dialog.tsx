"use client"

import { useState } from "react"
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
import { toast } from "@/components/ui/use-toast"

interface CreateReminderTemplateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateReminderTemplateDialog({ open, onOpenChange }: CreateReminderTemplateDialogProps) {
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [channels, setChannels] = useState<string[]>(["email"])
  const [includeConfirmation, setIncludeConfirmation] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!name || !type || !subject || !body || channels.length === 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Aqui seria a chamada para a API para salvar o template
      // Por enquanto, vamos apenas simular um atraso
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Template criado",
        description: `O template "${name}" foi criado com sucesso.`,
      })

      onOpenChange(false)
      resetForm()
    } catch (error) {
      toast({
        title: "Erro ao criar template",
        description: "Ocorreu um erro ao criar o template. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setName("")
    setType("")
    setSubject("")
    setBody("")
    setChannels(["email"])
    setIncludeConfirmation(false)
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
          <DialogTitle>Criar Novo Template</DialogTitle>
          <DialogDescription>
            Crie um novo template para seus lembretes automáticos. Use variáveis como {"{{cliente}}"} para personalizar
            suas mensagens.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Template</Label>
              <Input
                id="name"
                placeholder="Ex: Lembrete de Sessão Amigável"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Lembrete</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Selecione o tipo de lembrete" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="session-reminder">Lembrete de Sessão</SelectItem>
                  <SelectItem value="missed-session">Sessão Perdida</SelectItem>
                  <SelectItem value="cancelled-session">Sessão Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Assunto (para emails)</Label>
              <Input
                id="subject"
                placeholder="Ex: Lembrete: Sua sessão está agendada para amanhã"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="body">Mensagem</Label>
              <Textarea
                id="body"
                placeholder="Digite a mensagem do lembrete..."
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
              <Label htmlFor="include-confirmation" className="cursor-pointer">
                Incluir link de confirmação
              </Label>
              <Switch
                id="include-confirmation"
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
                  id="channel-email"
                  checked={channels.includes("email")}
                  onCheckedChange={(checked) => handleChannelChange("email", checked as boolean)}
                />
                <Label htmlFor="channel-email">Email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="channel-sms"
                  checked={channels.includes("sms")}
                  onCheckedChange={(checked) => handleChannelChange("sms", checked as boolean)}
                />
                <Label htmlFor="channel-sms">SMS</Label>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Criando..." : "Criar Template"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
