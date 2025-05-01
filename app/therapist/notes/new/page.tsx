"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Save, X, Plus, Calendar, Clock, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { RichTextEditor } from "@/components/notes/rich-text-editor"

// Dados simulados para clientes
const mockClients = [
  { id: "1", name: "Maria Silva" },
  { id: "2", name: "João Santos" },
  { id: "3", name: "Carlos Oliveira" },
  { id: "4", name: "Ana Pereira" },
  { id: "5", name: "Pedro Alves" },
]

// Categorias de anotações
const categories = [
  { value: "sessão", label: "Sessão" },
  { value: "plano", label: "Plano de Tratamento" },
  { value: "progresso", label: "Progresso" },
  { value: "técnicas", label: "Técnicas" },
  { value: "observação", label: "Observação" },
]

export default function NewNotePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Estado para os campos do formulário
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [clientId, setClientId] = useState("")
  const [category, setCategory] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState("14:00")
  const [tagInput, setTagInput] = useState("")
  const [tags, setTags] = useState<string[]>([])

  // Função para adicionar tag
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim().toLowerCase())) {
      setTags([...tags, tagInput.trim().toLowerCase()])
      setTagInput("")
    }
  }

  // Função para remover tag
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  // Função para lidar com a tecla Enter no input de tags
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  // Função para salvar a anotação
  const handleSave = async () => {
    // Validação básica
    if (!title.trim()) {
      toast({
        title: "Erro",
        description: "O título da anotação é obrigatório.",
        variant: "destructive",
      })
      return
    }

    if (!clientId) {
      toast({
        title: "Erro",
        description: "Selecione um cliente para a anotação.",
        variant: "destructive",
      })
      return
    }

    if (!category) {
      toast({
        title: "Erro",
        description: "Selecione uma categoria para a anotação.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)

      // Simulação de salvamento
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Anotação criada",
        description: "Sua anotação foi criada com sucesso.",
      })

      router.push("/therapist/notes")
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao criar a anotação. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Função para cancelar e voltar
  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={handleCancel}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-3xl font-bold tracking-tight ml-2">Nova Anotação</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleCancel} disabled={isSubmitting}>
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Título
                </label>
                <Input
                  id="title"
                  placeholder="Título da anotação"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="client" className="text-sm font-medium">
                    Cliente
                  </label>
                  <Select value={clientId} onValueChange={setClientId}>
                    <SelectTrigger id="client">
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Selecione um cliente" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {mockClients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    Categoria
                  </label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="date" className="text-sm font-medium">
                    Data
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <Calendar className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: ptBR }) : "Selecione uma data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <label htmlFor="time" className="text-sm font-medium">
                    Hora
                  </label>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conteúdo</CardTitle>
            </CardHeader>
            <CardContent>
              <RichTextEditor
                content={content}
                onChange={setContent}
                placeholder="Digite o conteúdo da sua anotação aqui..."
                minHeight="300px"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-3 py-1">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="ml-2 text-muted-foreground hover:text-foreground">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {tags.length === 0 && <p className="text-sm text-muted-foreground">Nenhuma tag adicionada</p>}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Adicionar tag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                />
                <Button type="button" onClick={addTag} variant="secondary">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">Pressione Enter para adicionar uma tag</CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
