"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EditReminderTemplateDialog } from "./edit-reminder-template-dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import { Mail, MessageSquare, Pencil, Trash2, Copy } from "lucide-react"

// Dados de exemplo
const mockTemplates = [
  {
    id: "1",
    name: "Lembrete de Sessão Padrão",
    type: "session-reminder",
    subject: "Lembrete: Sua sessão está agendada para amanhã",
    body: "Olá {{cliente}},\n\nEste é um lembrete de que você tem uma sessão agendada com {{terapeuta}} amanhã, {{data}} às {{hora}}.\n\nLocal: {{local}}\n\nPor favor, confirme sua presença ou entre em contato caso precise reagendar.\n\nAtenciosamente,\n{{terapeuta}}",
    channels: ["email", "sms"],
    isDefault: true,
  },
  {
    id: "2",
    name: "Lembrete de Sessão Perdida",
    type: "missed-session",
    subject: "Sobre sua sessão de hoje",
    body: "Olá {{cliente}},\n\nNotamos que você não compareceu à sessão agendada para hoje, {{data}} às {{hora}}.\n\nPor favor, entre em contato para reagendarmos sua sessão.\n\nAtenciosamente,\n{{terapeuta}}",
    channels: ["email"],
    isDefault: true,
  },
  {
    id: "3",
    name: "Lembrete de Sessão Cancelada",
    type: "cancelled-session",
    subject: "Sessão cancelada",
    body: "Olá {{cliente}},\n\nSua sessão agendada para {{data}} às {{hora}} foi cancelada.\n\nPor favor, entre em contato para reagendarmos.\n\nAtenciosamente,\n{{terapeuta}}",
    channels: ["email", "sms"],
    isDefault: true,
  },
]

export function ReminderTemplates() {
  const [templates, setTemplates] = useState(mockTemplates)
  const [editingTemplate, setEditingTemplate] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const handleEdit = (template: any) => {
    setEditingTemplate(template)
    setIsEditDialogOpen(true)
  }

  const handleSave = (updatedTemplate: any) => {
    setTemplates((prev) => prev.map((template) => (template.id === updatedTemplate.id ? updatedTemplate : template)))
    toast({
      title: "Template atualizado",
      description: `O template "${updatedTemplate.name}" foi atualizado com sucesso.`,
    })
  }

  const handleDelete = (id: string) => {
    setTemplates((prev) => prev.filter((template) => template.id !== id))
    toast({
      title: "Template excluído",
      description: "O template foi excluído com sucesso.",
    })
  }

  const handleDuplicate = (template: any) => {
    const newTemplate = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Cópia)`,
      isDefault: false,
    }
    setTemplates((prev) => [...prev, newTemplate])
    toast({
      title: "Template duplicado",
      description: `Uma cópia do template "${template.name}" foi criada.`,
    })
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "session-reminder":
        return "Lembrete de Sessão"
      case "missed-session":
        return "Sessão Perdida"
      case "cancelled-session":
        return "Sessão Cancelada"
      default:
        return type
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.id} className="flex flex-col">
            <CardContent className="flex-1 pt-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{template.name}</h4>
                {template.isDefault && (
                  <Badge variant="outline" className="ml-2">
                    Padrão
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">{getTypeLabel(template.type)}</p>
              <div className="flex items-center space-x-1 mb-4">
                {template.channels.includes("email") && (
                  <Badge variant="secondary" className="mr-1">
                    <Mail className="h-3 w-3 mr-1" />
                    Email
                  </Badge>
                )}
                {template.channels.includes("sms") && (
                  <Badge variant="secondary">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    SMS
                  </Badge>
                )}
              </div>
              <div className="text-sm border rounded-md p-2 bg-muted/50 max-h-[100px] overflow-y-auto whitespace-pre-wrap">
                {template.body.substring(0, 100)}
                {template.body.length > 100 ? "..." : ""}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" size="sm" onClick={() => handleDuplicate(template)}>
                <Copy className="h-4 w-4 mr-1" />
                Duplicar
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleEdit(template)}>
                <Pencil className="h-4 w-4 mr-1" />
                Editar
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm" disabled={template.isDefault}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Excluir
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Excluir template</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja excluir este template? Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(template.id)}>Excluir</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}
      </div>

      <EditReminderTemplateDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        template={editingTemplate}
        onSave={handleSave}
      />
    </div>
  )
}
