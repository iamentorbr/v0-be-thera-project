"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Edit, Plus, Save, Trash } from "lucide-react"

// Dados de exemplo para os templates
const templateData = [
  {
    id: "lembrete-previo",
    name: "Lembrete Prévio",
    subject: "Lembrete: Pagamento em breve",
    body: "Olá {{cliente}},\n\nEste é um lembrete amigável de que você tem um pagamento de {{valor}} com vencimento em {{data_vencimento}}.\n\nObrigado por sua atenção.\n\nAtenciosamente,\n{{terapeuta}}",
    type: "email",
  },
  {
    id: "vencimento-hoje",
    name: "Vencimento Hoje",
    subject: "Seu pagamento vence hoje",
    body: "Olá {{cliente}},\n\nGostaríamos de lembrá-lo que seu pagamento de {{valor}} vence hoje ({{data_vencimento}}).\n\nPor favor, efetue o pagamento para evitar atrasos.\n\nAtenciosamente,\n{{terapeuta}}",
    type: "email",
  },
  {
    id: "pagamento-atrasado",
    name: "Pagamento Atrasado",
    subject: "Pagamento em atraso",
    body: "Olá {{cliente}},\n\nNotamos que seu pagamento de {{valor}} com vencimento em {{data_vencimento}} está em atraso.\n\nPor favor, entre em contato conosco para regularizar sua situação.\n\nAtenciosamente,\n{{terapeuta}}",
    type: "email",
  },
  {
    id: "segundo-aviso",
    name: "Segundo Aviso",
    subject: "Segundo aviso: Pagamento em atraso",
    body: "Olá {{cliente}},\n\nEste é o segundo aviso sobre seu pagamento de {{valor}} que venceu em {{data_vencimento}} e ainda não foi regularizado.\n\nPor favor, entre em contato conosco com urgência.\n\nAtenciosamente,\n{{terapeuta}}",
    type: "email",
  },
  {
    id: "lembrete-sms",
    name: "Lembrete SMS",
    subject: "",
    body: "BeTHERA: Olá {{cliente}}, seu pagamento de {{valor}} vence em {{data_vencimento}}. Por favor, efetue o pagamento para evitar atrasos.",
    type: "sms",
  },
]

export function ReminderTemplateForm() {
  const [templates, setTemplates] = useState(templateData)
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0])
  const [isEditing, setIsEditing] = useState(false)
  const [editedTemplate, setEditedTemplate] = useState(selectedTemplate)

  const handleSelectTemplate = (id: string) => {
    const template = templates.find((t) => t.id === id)
    if (template) {
      setSelectedTemplate(template)
      setEditedTemplate(template)
      setIsEditing(false)
    }
  }

  const handleEditTemplate = () => {
    setIsEditing(true)
  }

  const handleSaveTemplate = () => {
    setTemplates(templates.map((t) => (t.id === editedTemplate.id ? editedTemplate : t)))
    setSelectedTemplate(editedTemplate)
    setIsEditing(false)
  }

  const handleAddTemplate = () => {
    const newId = `template-${Date.now()}`
    const newTemplate = {
      id: newId,
      name: "Novo Template",
      subject: "",
      body: "",
      type: "email",
    }
    setTemplates([...templates, newTemplate])
    setSelectedTemplate(newTemplate)
    setEditedTemplate(newTemplate)
    setIsEditing(true)
  }

  const handleDeleteTemplate = (id: string) => {
    if (templates.length <= 1) return

    const newTemplates = templates.filter((t) => t.id !== id)
    setTemplates(newTemplates)
    setSelectedTemplate(newTemplates[0])
    setEditedTemplate(newTemplates[0])
    setIsEditing(false)
  }

  const handleChange = (field: string, value: string) => {
    setEditedTemplate({
      ...editedTemplate,
      [field]: value,
    })
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Templates</h3>
          <Button variant="outline" size="sm" onClick={handleAddTemplate}>
            <Plus className="mr-2 h-4 w-4" />
            Novo
          </Button>
        </div>

        <div className="space-y-2">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`flex items-center justify-between p-3 rounded-md cursor-pointer ${
                selectedTemplate.id === template.id ? "bg-primary/10 border border-primary/20" : "hover:bg-muted"
              }`}
              onClick={() => handleSelectTemplate(template.id)}
            >
              <div className="flex flex-col">
                <span className="font-medium">{template.name}</span>
                <Badge variant="outline" className="mt-1 w-fit">
                  {template.type === "email" ? "Email" : "SMS"}
                </Badge>
              </div>
              {selectedTemplate.id === template.id && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteTemplate(template.id)
                  }}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="md:col-span-2">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">{isEditing ? "Editar Template" : selectedTemplate.name}</h3>
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={handleEditTemplate}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
              ) : (
                <Button variant="default" size="sm" onClick={handleSaveTemplate}>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar
                </Button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="template-name">Nome do Template</Label>
                  <Input
                    id="template-name"
                    value={editedTemplate.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="template-type">Tipo</Label>
                  <Select value={editedTemplate.type} onValueChange={(value) => handleChange("type", value)}>
                    <SelectTrigger id="template-type">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {editedTemplate.type === "email" && (
                  <div>
                    <Label htmlFor="template-subject">Assunto</Label>
                    <Input
                      id="template-subject"
                      value={editedTemplate.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="template-body">Conteúdo</Label>
                  <Textarea
                    id="template-body"
                    rows={10}
                    value={editedTemplate.body}
                    onChange={(e) => handleChange("body", e.target.value)}
                  />
                </div>

                <div className="text-sm text-muted-foreground">
                  <p className="font-medium mb-1">Variáveis disponíveis:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>{"{{cliente}}"} - Nome do cliente</li>
                    <li>{"{{valor}}"} - Valor do pagamento</li>
                    <li>{"{{data_vencimento}}"} - Data de vencimento</li>
                    <li>{"{{terapeuta}}"} - Seu nome</li>
                    <li>{"{{link_pagamento}}"} - Link para pagamento</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Tabs defaultValue="preview" className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="preview" className="flex-1">
                      Visualização
                    </TabsTrigger>
                    <TabsTrigger value="code" className="flex-1">
                      Código
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="preview" className="mt-4">
                    {selectedTemplate.type === "email" && (
                      <div className="border rounded-md p-4">
                        <div className="mb-2 font-medium">Assunto: {selectedTemplate.subject}</div>
                        <div className="whitespace-pre-line">{selectedTemplate.body}</div>
                      </div>
                    )}

                    {selectedTemplate.type === "sms" && (
                      <div className="border rounded-md p-4 max-w-xs mx-auto">
                        <div className="bg-gray-100 rounded-lg p-3 relative">
                          <div className="whitespace-pre-line text-sm">{selectedTemplate.body}</div>
                          <div className="text-xs text-right text-muted-foreground mt-1">Agora</div>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="code" className="mt-4">
                    <div className="border rounded-md p-4 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
                      {selectedTemplate.body}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
