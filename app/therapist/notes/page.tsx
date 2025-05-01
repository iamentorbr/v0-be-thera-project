"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Plus, Calendar, Tag, Filter, MoreVertical, Edit, Trash2, User, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

// Dados simulados para anotações
const mockNotes = [
  {
    id: "1",
    title: "Primeira sessão com Maria",
    content:
      "Cliente demonstrou ansiedade relacionada ao trabalho. Discutimos técnicas de respiração e mindfulness para gerenciar momentos de estresse.",
    clientId: "1",
    clientName: "Maria Silva",
    date: "2023-04-01T14:00:00",
    tags: ["ansiedade", "trabalho", "mindfulness"],
    category: "sessão",
    isPinned: true,
  },
  {
    id: "2",
    title: "Plano de tratamento para João",
    content:
      "Desenvolver estratégias para lidar com conflitos familiares. Focar em comunicação assertiva e estabelecimento de limites saudáveis.",
    clientId: "2",
    clientName: "João Santos",
    date: "2023-04-02T10:30:00",
    tags: ["família", "comunicação", "limites"],
    category: "plano",
    isPinned: false,
  },
  {
    id: "3",
    title: "Progresso de Carlos",
    content:
      "Cliente tem mostrado melhora significativa nos sintomas de depressão. Continuar com exercícios de gratidão e exposição gradual a atividades sociais.",
    clientId: "3",
    clientName: "Carlos Oliveira",
    date: "2023-04-03T16:15:00",
    tags: ["depressão", "progresso", "gratidão"],
    category: "progresso",
    isPinned: false,
  },
  {
    id: "4",
    title: "Técnicas para Ana",
    content:
      "Recomendei técnicas de aterramento para momentos de dissociação. Cliente deve praticar diariamente e registrar eficácia em diário.",
    clientId: "4",
    clientName: "Ana Pereira",
    date: "2023-04-04T11:00:00",
    tags: ["dissociação", "aterramento", "diário"],
    category: "técnicas",
    isPinned: true,
  },
  {
    id: "5",
    title: "Observações sobre comportamento de Pedro",
    content:
      "Cliente demonstra padrões de pensamento catastrófico. Introduzir reestruturação cognitiva nas próximas sessões.",
    clientId: "5",
    clientName: "Pedro Alves",
    date: "2023-04-05T15:45:00",
    tags: ["pensamento", "cognitivo", "reestruturação"],
    category: "observação",
    isPinned: false,
  },
]

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
  { value: "all", label: "Todas" },
  { value: "sessão", label: "Sessões" },
  { value: "plano", label: "Planos de Tratamento" },
  { value: "progresso", label: "Progresso" },
  { value: "técnicas", label: "Técnicas" },
  { value: "observação", label: "Observações" },
]

export default function NotesPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedClient, setSelectedClient] = useState("")
  const [notes, setNotes] = useState(mockNotes)
  const [activeTab, setActiveTab] = useState("all")

  // Função para formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  // Função para formatar hora
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Função para excluir anotação
  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
    toast({
      title: "Anotação excluída",
      description: "A anotação foi excluída com sucesso.",
    })
  }

  // Função para alternar fixação de anotação
  const togglePin = (id: string) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, isPinned: !note.isPinned } : note)))
    toast({
      title: "Status atualizado",
      description: "O status de fixação da anotação foi atualizado.",
    })
  }

  // Filtrar notas com base nos critérios selecionados
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || note.category === selectedCategory
    const matchesClient = selectedClient === "" || note.clientId === selectedClient
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pinned" && note.isPinned) ||
      (activeTab === "recent" && new Date(note.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))

    return matchesSearch && matchesCategory && matchesClient && matchesTab
  })

  // Ordenar notas: primeiro as fixadas, depois por data (mais recentes primeiro)
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Anotações</h2>
          <Button onClick={() => router.push("/therapist/notes/new")}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Anotação
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="pinned">Fixadas</TabsTrigger>
              <TabsTrigger value="recent">Recentes</TabsTrigger>
            </TabsList>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2">
              <div className="flex-1 min-w-[200px]">
                <Input
                  placeholder="Buscar anotações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                  icon={<Search className="h-4 w-4" />}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>Categoria</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Cliente</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os clientes</SelectItem>
                  {mockClients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <TabsContent value="all" className="space-y-4">
              {sortedNotes.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {sortedNotes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      onDelete={deleteNote}
                      onTogglePin={togglePin}
                      formatDate={formatDate}
                      formatTime={formatTime}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="rounded-full bg-muted p-3">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">Nenhuma anotação encontrada</h3>
                  <p className="mt-2 text-center text-muted-foreground">
                    Não encontramos anotações com os filtros selecionados. Tente ajustar seus critérios de busca.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="pinned" className="space-y-4">
              {sortedNotes.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {sortedNotes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      onDelete={deleteNote}
                      onTogglePin={togglePin}
                      formatDate={formatDate}
                      formatTime={formatTime}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="rounded-full bg-muted p-3">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">Nenhuma anotação fixada</h3>
                  <p className="mt-2 text-center text-muted-foreground">
                    Você não tem anotações fixadas. Fixe anotações importantes para acesso rápido.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="recent" className="space-y-4">
              {sortedNotes.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {sortedNotes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      onDelete={deleteNote}
                      onTogglePin={togglePin}
                      formatDate={formatDate}
                      formatTime={formatTime}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="rounded-full bg-muted p-3">
                    <Clock className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">Nenhuma anotação recente</h3>
                  <p className="mt-2 text-center text-muted-foreground">
                    Você não tem anotações criadas nos últimos 7 dias.
                  </p>
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

// Componente para o cartão de anotação
interface NoteCardProps {
  note: {
    id: string
    title: string
    content: string
    clientId: string
    clientName: string
    date: string
    tags: string[]
    category: string
    isPinned: boolean
  }
  onDelete: (id: string) => void
  onTogglePin: (id: string) => void
  formatDate: (dateString: string) => string
  formatTime: (dateString: string) => string
}

function NoteCard({ note, onDelete, onTogglePin, formatDate, formatTime }: NoteCardProps) {
  const router = useRouter()

  // Função para truncar texto
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  // Mapeamento de categorias para cores de badge
  const categoryColors: Record<string, string> = {
    sessão: "bg-blue-100 text-blue-800",
    plano: "bg-green-100 text-green-800",
    progresso: "bg-purple-100 text-purple-800",
    técnicas: "bg-amber-100 text-amber-800",
    observação: "bg-gray-100 text-gray-800",
  }

  return (
    <Card className={`overflow-hidden ${note.isPinned ? "border-primary" : ""}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <CardTitle className="line-clamp-1">{note.title}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <User className="h-3 w-3 mr-1" />
              {note.clientName}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push(`/therapist/notes/${note.id}`)}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onTogglePin(note.id)}>
                {note.isPinned ? (
                  <>
                    <span className="mr-2">📌</span>
                    Desafixar
                  </>
                ) : (
                  <>
                    <span className="mr-2">📌</span>
                    Fixar
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => onDelete(note.id)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center mt-1 space-x-2">
          <Badge variant="outline" className={categoryColors[note.category] || ""}>
            {note.category.charAt(0).toUpperCase() + note.category.slice(1)}
          </Badge>
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            {formatDate(note.date)} às {formatTime(note.date)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm line-clamp-3">{note.content}</p>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-1 pt-0">
        {note.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            <Tag className="h-3 w-3 mr-1" />
            {tag}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  )
}
