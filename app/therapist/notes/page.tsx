"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, Plus, Filter, User, Calendar, Tag, Pin, Clock, EyeOff, ChevronDown, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
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

// Função para formatar data
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date)
}

// Função para formatar hora
function formatTime(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export default function NotesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClient, setSelectedClient] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("all")

  // Extrair todas as tags únicas das anotações
  const allTags = Array.from(new Set(mockNotes.flatMap((note) => note.tags)))

  // Filtrar anotações com base nos critérios
  const filteredNotes = mockNotes.filter((note) => {
    // Filtro por texto de pesquisa
    const matchesSearch =
      searchTerm === "" ||
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    // Filtro por cliente
    const matchesClient = selectedClient === "" || note.clientId === selectedClient

    // Filtro por categoria
    const matchesCategory = selectedCategory === "" || note.category === selectedCategory

    // Filtro por tags
    const matchesTags = selectedTags.length === 0 || selectedTags.every((tag) => note.tags.includes(tag))

    return matchesSearch && matchesClient && matchesCategory && matchesTags
  })

  // Filtrar anotações com base na aba ativa
  const tabFilteredNotes = filteredNotes.filter((note) => {
    if (activeTab === "pinned") return note.isPinned
    if (activeTab === "recent") {
      // Ordenar por data mais recente (últimos 7 dias)
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      return new Date(note.date) >= sevenDaysAgo
    }
    return true
  })

  // Função para criar nova anotação
  const handleCreateNote = () => {
    router.push("/therapist/notes/new")
  }

  // Função para limpar filtros
  const clearFilters = () => {
    setSearchTerm("")
    setSelectedClient("")
    setSelectedCategory("")
    setSelectedTags([])
  }

  // Função para alternar tag na seleção
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Anotações</h2>
          <Button onClick={handleCreateNote}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Anotação
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar anotações..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                  <Filter className="h-4 w-4" />
                  Filtros
                  {(selectedClient || selectedCategory || selectedTags.length > 0) && (
                    <Badge
                      variant="secondary"
                      className="rounded-full px-1 min-w-4 h-4 flex items-center justify-center text-xs"
                    >
                      {(selectedClient ? 1 : 0) + (selectedCategory ? 1 : 0) + (selectedTags.length > 0 ? 1 : 0)}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Cliente
                    </h4>
                    <Select value={selectedClient} onValueChange={setSelectedClient}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos os clientes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Todos os clientes</SelectItem>
                        {mockClients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Categoria
                    </h4>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todas as categorias" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Todas as categorias</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1">
                      {allTags.map((tag) => (
                        <div key={tag} className="flex items-center space-x-2">
                          <Checkbox
                            id={`tag-${tag}`}
                            checked={selectedTags.includes(tag)}
                            onCheckedChange={() => toggleTag(tag)}
                          />
                          <label
                            htmlFor={`tag-${tag}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {tag}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" onClick={clearFilters}>
                    <X className="mr-2 h-4 w-4" />
                    Limpar Filtros
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Ordenar
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Mais recentes</DropdownMenuItem>
                <DropdownMenuItem>Mais antigos</DropdownMenuItem>
                <DropdownMenuItem>Título (A-Z)</DropdownMenuItem>
                <DropdownMenuItem>Cliente (A-Z)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="pinned" className="flex items-center gap-1">
              <Pin className="h-3.5 w-3.5" />
              Fixadas
            </TabsTrigger>
            <TabsTrigger value="recent">Recentes</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            {tabFilteredNotes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground">Nenhuma anotação encontrada.</p>
                <Button variant="outline" className="mt-4" onClick={clearFilters}>
                  Limpar filtros
                </Button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tabFilteredNotes.map((note) => (
                  <Link href={`/therapist/notes/${note.id}`} key={note.id} className="block">
                    <Card className="h-full transition-shadow hover:shadow-md">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg line-clamp-1">{note.title}</CardTitle>
                          <div className="flex gap-1">
                            {note.isPinned && <Pin className="h-4 w-4 text-primary" />}
                            {note.isPrivate && <EyeOff className="h-4 w-4 text-muted-foreground" />}
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <User className="mr-1 h-3.5 w-3.5" />
                          <span className="line-clamp-1">{note.clientName}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="line-clamp-3 text-sm">
                          <RichTextContent content={note.content} />
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col items-start pt-0">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {note.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {note.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{note.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                        <div className="flex justify-between w-full text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-3.5 w-3.5" />
                            {formatDate(note.date)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-3.5 w-3.5" />
                            {formatTime(note.date)}
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="pinned" className="mt-4">
            {tabFilteredNotes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground">Nenhuma anotação fixada encontrada.</p>
                <Button variant="outline" className="mt-4" onClick={clearFilters}>
                  Limpar filtros
                </Button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tabFilteredNotes.map((note) => (
                  <Link href={`/therapist/notes/${note.id}`} key={note.id} className="block">
                    <Card className="h-full transition-shadow hover:shadow-md">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg line-clamp-1">{note.title}</CardTitle>
                          <div className="flex gap-1">
                            {note.isPinned && <Pin className="h-4 w-4 text-primary" />}
                            {note.isPrivate && <EyeOff className="h-4 w-4 text-muted-foreground" />}
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <User className="mr-1 h-3.5 w-3.5" />
                          <span className="line-clamp-1">{note.clientName}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="line-clamp-3 text-sm">
                          <RichTextContent content={note.content} />
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col items-start pt-0">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {note.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {note.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{note.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                        <div className="flex justify-between w-full text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-3.5 w-3.5" />
                            {formatDate(note.date)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-3.5 w-3.5" />
                            {formatTime(note.date)}
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="recent" className="mt-4">
            {tabFilteredNotes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground">Nenhuma anotação recente encontrada.</p>
                <Button variant="outline" className="mt-4" onClick={clearFilters}>
                  Limpar filtros
                </Button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tabFilteredNotes.map((note) => (
                  <Link href={`/therapist/notes/${note.id}`} key={note.id} className="block">
                    <Card className="h-full transition-shadow hover:shadow-md">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg line-clamp-1">{note.title}</CardTitle>
                          <div className="flex gap-1">
                            {note.isPinned && <Pin className="h-4 w-4 text-primary" />}
                            {note.isPrivate && <EyeOff className="h-4 w-4 text-muted-foreground" />}
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <User className="mr-1 h-3.5 w-3.5" />
                          <span className="line-clamp-1">{note.clientName}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="line-clamp-3 text-sm">
                          <RichTextContent content={note.content} />
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col items-start pt-0">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {note.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {note.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{note.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                        <div className="flex justify-between w-full text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-3.5 w-3.5" />
                            {formatDate(note.date)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-3.5 w-3.5" />
                            {formatTime(note.date)}
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
