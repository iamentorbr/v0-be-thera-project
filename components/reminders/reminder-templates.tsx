"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { EditReminderTemplateDialog } from "@/components/reminders/edit-reminder-template-dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Edit, Trash, Copy, Check } from "lucide-react"

// Dados simulados de templates
const mockTemplates = [
  {
    id: "1",
    name: "Lembrete de Sessão Padrão",
    type: "session-reminder",
    subject: "Lembrete: Sua sessão está agendada para amanhã",
    body: "Olá {{cliente}},\n\nEste é um lembrete amigável de que você tem uma sessão agendada com {{terapeuta}} amanhã, {{data}} às {{hora}}.\n\nLocal: {{local}}\n\nPor favor, confirme sua presença respondendo a este email ou entrando em contato pelo telefone {{telefone}}.\n\nAtenciosamente,\n{{terapeuta}}",
    isDefault: true,
    channels: ["email", "sms"],
  },
  {
    id: "2",
    name: "Lembrete de Sessão Formal",
    type: "session-reminder",
    subject: "Confirmação de Agendamento - {{data}}",
    body: "Prezado(a) {{cliente}},\n\nGostaríamos de confirmar seu agendamento para o dia {{data}} às {{hora}} com {{terapeuta}}.\n\nLocal: {{local}}\n\nCaso necessite reagendar, por favor entre em contato com antecedência mínima de 24 horas.\n\nAtenciosamente,\n{{terapeuta}}",
    isDefault: false,
    channels: ["email"],
  },
  {
    id: "3",
    name: "Sessão Perdida",
    type: "missed-session",
    subject: "Sobre sua sessão de hoje",
    body: "Olá {{cliente}},\n\nNotamos que você não compareceu à sessão agendada para hoje, {{data}} às {{hora}}.\n\nEsperamos que esteja tudo bem. Por favor, entre em contato para reagendarmos sua sessão.\n\nAtenciosamente,\n{{terapeuta}}",
    isDefault: true,
    channels: ["email", "sms"],
  },
  {
    id: "4",
    name: "Sessão Cancelada",
    type: "cancelled-session",
    subject: "Cancelamento de Sessão - {{data}}",
    body: "Olá {{cliente}},\n\nEste email confirma o cancelamento da sua sessão que estava agendada para {{data}} às {{hora}}.\n\nCaso deseje reagendar, por favor entre em contato conosco.\n\nAtenciosamente,\n{{terapeuta}}",
    isDefault: true,
    channels: ["email"],
  },
]

export function ReminderTemplates() {
  const [templates, setTemplates] = useState(mockTemplates)
  const [editTemplate, setEditTemplate] = useState<any | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [deleteTemplate, setDeleteTemplate] = useState<any | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const handleEdit = (template: any) => {
    setEditTemplate(template)
    setIsEditOpen(true)
  }

  const handleDelete = (template: any) => {
    setDeleteTemplate(template)
    setIsDeleteOpen(true)
  }

  const confirmDelete = () => {
    if (!deleteTemplate) return

    setTemplates((prev) => prev.filter((t) => t.id !== deleteTemplate.id))
    toast({
      title: "Template excluído",
      description: `O template "${deleteTemplate.name}" foi excluído com sucesso.`,
    })
    setIsDeleteOpen(false)
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

  const handleSetDefault = (template: any) => {
    setTemplates((prev) =>
      prev.map((t) => ({
        ...t,
        isDefault: t.id === template.id ? true : t.type === template.type ? false : t.isDefault,
      })),
    )
    toast({
      title: "Template padrão definido",
      description: `"${template.name}" agora é o template padrão para ${getTemplateTypeName(template.type)}.`,
    })
  }

  const getTemplateTypeName = (type: string) => {
    switch (type) {
      case "session-reminder":
        return "lembretes de sessão"
      case "missed-session":
        return "sessões perdidas"
      case "cancelled-session":
        return "sessões canceladas"
      default:
        return type
    }
  }

  const getTemplateTypeColor = (type: string) => {
    switch (type) {
      case "session-reminder":
        return "default"
      case "missed-session":
        return "destructive"
      case "cancelled-session":
        return "secondary"
      default:
        return "default"
    }
  }

  return (
    <div className="space-y-4">
      {templates.map((template) => (
        <Card key={template.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CardTitle className="text-lg">{template.name}</CardTitle>
                {template.isDefault && (
                  <Badge variant="outline" className="ml-2">
                    Padrão
                  </Badge>
                )}
              </div>
              <Badge variant={getTemplateTypeColor(template.type)}>{getTemplateTypeName(template.type)}</Badge>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium">Assunto: </span>
                <span className="text-sm text-muted-foreground">{template.subject}</span>
              </div>
              <div>
                <span className="text-sm font-medium">Mensagem:</span>
                <div className="mt-1 text-sm text-muted-foreground whitespace-pre-line border rounded-md p-3 bg-muted/30">
                  {template.body}
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-sm font-medium">Canais:</span>
                <div className="flex space-x-1">
                  {template.channels.map((channel) => (
                    <Badge key={channel} variant="outline">
                      {channel === "email" ? "Email" : "SMS"}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-2">
            <div>
              {!template.isDefault && (
                <Button variant="outline" size="sm" onClick={() => handleSetDefault(template)}>
                  <Check className="mr-2 h-4 w-4" />
                  Definir como padrão
                </Button>
              )}
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => handleDuplicate(template)}>
                <Copy className="mr-2 h-4 w-4" />
                Duplicar
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleEdit(template)}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Button>
              {!template.isDefault && (
                <Button variant="outline" size="sm" onClick={() => handleDelete(template)}>
                  <Trash className="mr-2 h-4 w-4" />
                  Excluir
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}

      {/* Diálogo de edição de template */}
      {editTemplate && (
        <EditReminderTemplateDialog
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          template={editTemplate}
          onSave={(updatedTemplate) => {
            setTemplates((prev) => prev.map((t) => (t.id === updatedTemplate.id ? { ...t, ...updatedTemplate } : t)))
            toast({
              title: "Template atualizado",
              description: `O template "${updatedTemplate.name}" foi atualizado com sucesso.`,
            })
          }}
        />
      )}

      {/* Diálogo de confirmação de exclusão */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir template</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o template "{deleteTemplate?.name}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
