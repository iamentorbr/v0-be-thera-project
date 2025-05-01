"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Save, X, Plus, Calendar, Clock, User, Trash2, Eye, EyeOff } from "lucide-react"

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
import { Switch } from "@/components/ui/switch"
import { RichTextEditor } from "@/components/notes/rich-text-editor"
import { RichTextContent } from "@/components/notes/rich-text-content"

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

// Dados simulados para anotações
const mockNotes = [
  {
    id: "1",
    title: "Primeira sessão com Maria",
    content:
      "<h2>Sessão Inicial</h2><p>Cliente demonstrou <strong>ansiedade</strong> relacionada ao trabalho. Discutimos técnicas de <em>respiração</em> e <em>mindfulness</em> para gerenciar momentos de estresse.</p><ul><li>Praticar respiração diafragmática 2x ao dia</li><li>Iniciar diário de gratidão</li><li>Reduzir cafeína</li></ul>",
    clientId: "1",
    clientName: "Maria Silva",
    date: "2023-04-01T14:00:00",
    tags: ["ansiedade", "trabalho", "mindfulness"],
    category: "sessão",
    isPinned: true,
    isPrivate: false,
  },
  {
    id: "2",
    title: "Plano de tratamento para João",
    content:
      "<h2>Plano Terapêutico</h2><p>Desenvolver estratégias para lidar com <strong>conflitos familiares</strong>. Focar em <em>comunicação assertiva</em> e estabelecimento de limites saudáveis.</p><ol><li>Identificar padrões de comunicação disfuncionais</li><li>Praticar técnicas de escuta ativa</li><li>Estabelecer limites claros com familiares</li></ol>",
    clientId: "2",
    clientName: "João Santos",
    date: "2023-04-02T10:30:00",
    tags: ["família", "comunicação", "limites"],
    category: "plano",
    isPinned: false,
    isPrivate: true,
  },
  {
    id: "3",
    title: "Progresso de Carlos",
    content:
      "<h2>Avaliação de Progresso</h2><p>Cliente tem mostrado <strong>melhora significativa</strong> nos sintomas de depressão. Continuar com exercícios de <em>gratidão</em> e exposição gradual a atividades sociais.</p><ul><li>Manteve rotina de exercícios físicos</li><li>Participou de dois eventos sociais</li><li>Relatou melhora no sono</li></ul>",
    clientId: "3",
    clientName: "Carlos Oliveira",
    date: "2023-04-03T16:15:00",
    tags: ["depressão", "progresso", "gratidão"],
    category: "progresso",
    isPinned: false,
    isPrivate: false,
  },
  {
    id: "4",
    title: "Técnicas para Ana",
    content:
      "<h2>Técnicas Recomendadas</h2><p>Recomendei técnicas de <strong>aterramento</strong> para momentos de dissociação. Cliente deve praticar diariamente e registrar eficácia em diário.</p><ol><li>Técnica 5-4-3-2-1 (visão, audição, tato, olfato, paladar)</li><li>Segurar objeto frio ou texturas diferentes</li><li>Respiração contada</li></ol>",
    clientId: "4",
    clientName: "Ana Pereira",
    date: "2023-04-04T11:00:00",
    tags: ["dissociação", "aterramento", "diário"],
    category: "técnicas",
    isPinned: true,
    isPrivate: false,
  },
  {
    id: "5",
    title: "Observações sobre comportamento de Pedro",
    content:
      "<h2>Observações Clínicas</h2><p>Cliente demonstra padrões de <strong>pensamento catastrófico</strong>. Introduzir <em>reestruturação cognitiva</em> nas próximas sessões.</p><ul><li>Identificar pensamentos automáticos negativos</li><li>Questionar evidências que apoiam esses pensamentos</li><li>Desenvolver perspectivas alternativas</li></ul>",
    clientId: "5",
    clientName: "Pedro Alves",
    date: "2023-04-05T15:45:00",
    tags: ["pensamento", "cognitivo", "reestruturação"],
    category: "observação",
    isPinned: false,
    isPrivate: true,
  },
]

export default function NotePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  // Estado para os campos do formulário
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [clientId, setClientId] = useState("")
  const [category, setCategory] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState("14:00")
  const [tagInput, setTagInput] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [isPinned, setIsPinned] = useState(false)
  const [isPrivate, setIsPrivate] = useState(false)
  const [note, setNote] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Carregar dados da anotação
  useEffect(() => {
    const fetchNote = async () => {
      try {
        // Simulação de carregamento
        await new Promise((resolve) => setTimeout(resolve, 500))

        const foundNote = mockNotes.find((n) => n.id === params.id)

        if (foundNote) {
          setNote(foundNote)
          setTitle(foundNote.title)
          setContent(foundNote.content)
          setClientId(foundNote.clientId)
          setCategory(foundNote.category)

          const noteDate = new Date(foundNote.date)
          setDate(noteDate)
          setTime(
            `${noteDate.getHours().toString().padStart(2, "0")}:${noteDate.getMinutes().toString().padStart(2, "0")}`,
          )

          setTags(foundNote.tags)
          setIsPinned(foundNote.isPinned)
          setIsPrivate(foundNote.isPrivate)
        } else {
          toast({
            title: "Erro",
            description: "Anotação não encontrada.",
            variant: "destructive",
          })
          router.push("/therapist/notes")
        }
      } catch (error) {
        toast({
          title: "Erro",
          description: "Ocorreu um erro ao carregar a anotação.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchNote()
  }, [params.id, router, toast])

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
        title: "Anotação atualizada",
        description: "Sua anotação foi atualizada com sucesso.",
      })

      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar a anotação. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Função para excluir a anotação
  const handleDelete = async () => {
    try {
      // Simulação de exclusão
      await new Promise((resolve) => setTimeout(resolve, 500))

      toast({
        title: "Anotação excluída",
        description: "A anotação foi excluída com sucesso.",
      })

      router.push("/therapist/notes")
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao excluir a anotação. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  // Função para cancelar a edição
  const handleCancelEdit = () => {
    // Restaurar valores originais
    if (note) {
      setTitle(note.title)
      setContent(note.content)
      setClientId(note.clientId)
      setCategory(note.category)

      const noteDate = new Date(note.date)
      setDate(noteDate)
      setTime(`${noteDate.getHours().toString().padStart(2, "0")}:${noteDate.getMinutes().toString().padStart(2, "0")}`)

      setTags(note.tags)
      setIsPinned(note.isPinned)
      setIsPrivate(note.isPrivate)
    }

    setIsEditing(false)
  }

  // Função para voltar à lista de anotações
  const handleBack = () => {
    router.push("/therapist/notes")
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="mt-4 text-muted-foreground">Carregando anotação...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-3xl font-bold tracking-tight ml-2">{isEditing ? "Editar Anotação" : title}</h2>
          </div>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancelEdit} disabled={isSubmitting}>
                  <X className="mr-2 h-4 w-4" />
                  Cancelar
                </Button>
                <Button onClick={handleSave} disabled={isSubmitting}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Salvando..." : "Salvar"}
                </Button>
              </>
            ) : (
              <>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Excluir anotação</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem certeza que deseja excluir esta anotação? Esta ação não pode ser desfeita.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                        Excluir
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button onClick={() => setIsEditing(true)}>Editar</Button>
              </>
            )}
          </div>
        </div>

        <div className="grid gap-6">
          {isEditing ? (
            <>
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

                  <div className="flex flex-col space-y-4 pt-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="pin-note" checked={isPinned} onCheckedChange={setIsPinned} />
                      <label htmlFor="pin-note" className="text-sm font-medium">
                        Fixar anotação
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="private-note" checked={isPrivate} onCheckedChange={setIsPrivate} />
                      <label htmlFor="private-note" className="flex items-center text-sm font-medium">
                        {isPrivate ? (
                          <>
                            <EyeOff className="mr-2 h-4 w-4" />
                            Anotação privada (visível apenas para você)
                          </>
                        ) : (
                          <>
                            <Eye className="mr-2 h-4 w-4" />
                            Anotação visível para o cliente
                          </>
                        )}
                      </label>
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
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-2 text-muted-foreground hover:text-foreground"
                        >
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
                <CardFooter className="text-xs text-muted-foreground">
                  Pressione Enter para adicionar uma tag
                </CardFooter>
              </Card>
            </>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{title}</CardTitle>
                      <div className="flex items-center mt-2 space-x-2">
                        <Badge
                          variant="outline"
                          className={
                            category === "sessão"
                              ? "bg-blue-100 text-blue-800"
                              : category === "plano"
                                ? "bg-green-100 text-green-800"
                                : category === "progresso"
                                  ? "bg-purple-100 text-purple-800"
                                  : category === "técnicas"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-gray-100 text-gray-800"
                          }
                        >
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </Badge>
                        {isPinned && (
                          <Badge variant="outline" className="bg-primary/10 text-primary">
                            Fixado
                          </Badge>
                        )}
                        {isPrivate && (
                          <Badge variant="outline" className="bg-destructive/10 text-destructive">
                            <EyeOff className="h-3 w-3 mr-1" />
                            Privado
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{mockClients.find((c) => c.id === clientId)?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {date && format(date, "PPP", { locale: ptBR })} às {time}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <RichTextContent content={content} className="mt-4" />

                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-6">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
