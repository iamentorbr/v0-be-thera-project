"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Search, Plus, Filter } from "lucide-react"
import { ContentCard, type ContentItem } from "@/components/content/content-card"
import { EditContentDialog } from "@/components/content/edit-content-dialog"
import { toast } from "@/components/ui/use-toast"
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

// Dados simulados de conteúdo
const mockContent: ContentItem[] = [
  {
    id: "1",
    title: "Meditação Matinal",
    description: "Uma meditação guiada para prática matinal",
    type: "audio/mpeg",
    fileUrl: "/placeholder.svg",
    dateAdded: new Date(2024, 3, 8),
    sharedWith: 3,
    tags: ["meditação", "relaxamento", "manhã"],
  },
  {
    id: "2",
    title: "Exercício de Mindfulness",
    description: "Guia passo a passo para exercício de mindfulness",
    type: "application/pdf",
    fileUrl: "/placeholder.svg",
    dateAdded: new Date(2024, 3, 5),
    sharedWith: 5,
    tags: ["mindfulness", "exercício", "guia"],
  },
  {
    id: "3",
    title: "Perguntas para Reflexão",
    description: "Perguntas semanais para reflexão dos clientes",
    type: "text/plain",
    fileUrl: "/placeholder.svg",
    dateAdded: new Date(2024, 3, 3),
    sharedWith: 2,
    tags: ["reflexão", "perguntas", "semanal"],
  },
  {
    id: "4",
    title: "Técnicas de Redução de Estresse",
    description: "Guia abrangente para redução de estresse",
    type: "application/pdf",
    fileUrl: "/placeholder.svg",
    dateAdded: new Date(2024, 2, 28),
    sharedWith: 8,
    tags: ["estresse", "redução", "guia"],
  },
  {
    id: "5",
    title: "Relaxamento Noturno",
    description: "Áudio calmante para relaxamento noturno",
    type: "audio/mpeg",
    fileUrl: "/placeholder.svg",
    dateAdded: new Date(2024, 2, 25),
    sharedWith: 4,
    tags: ["relaxamento", "noite", "sono"],
  },
  {
    id: "6",
    title: "Prompts para Diário",
    description: "Coleção de prompts para diário terapêutico",
    type: "text/plain",
    fileUrl: "/placeholder.svg",
    dateAdded: new Date(2024, 2, 20),
    sharedWith: 6,
    tags: ["diário", "prompts", "escrita"],
  },
]

export default function ContentPage() {
  const [selectedTab, setSelectedTab] = useState("library")
  const [searchQuery, setSearchQuery] = useState("")
  const [contentType, setContentType] = useState("all")
  const [contentList, setContentList] = useState<ContentItem[]>(mockContent)
  const [filteredContent, setFilteredContent] = useState<ContentItem[]>(mockContent)
  const [editingContent, setEditingContent] = useState<ContentItem | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [deletingContentId, setDeletingContentId] = useState<string | null>(null)

  // Filtrar conteúdo com base na consulta de pesquisa e tipo
  useEffect(() => {
    let filtered = [...contentList]

    // Filtrar por tipo
    if (contentType !== "all") {
      filtered = filtered.filter((content) => {
        if (contentType === "audio") return content.type.includes("audio")
        if (contentType === "document") return content.type.includes("pdf") || content.type.includes("text")
        if (contentType === "image") return content.type.includes("image")
        return true
      })
    }

    // Filtrar por consulta de pesquisa
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (content) =>
          content.title.toLowerCase().includes(query) ||
          content.description.toLowerCase().includes(query) ||
          content.tags?.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    setFilteredContent(filtered)
  }, [contentList, searchQuery, contentType])

  const handleEditContent = (content: ContentItem) => {
    setEditingContent(content)
    setIsEditDialogOpen(true)
  }

  const handleSaveContent = (updatedContent: ContentItem) => {
    setContentList((prev) => prev.map((item) => (item.id === updatedContent.id ? updatedContent : item)))
    setEditingContent(null)
  }

  const handleDeleteContent = (id: string) => {
    setDeletingContentId(id)
  }

  const confirmDelete = () => {
    if (deletingContentId) {
      setContentList((prev) => prev.filter((item) => item.id !== deletingContentId))
      toast({
        title: "Conteúdo excluído",
        description: "O conteúdo foi excluído com sucesso da sua biblioteca.",
      })
      setDeletingContentId(null)
    }
  }

  const handleShareContent = (updatedContent: ContentItem) => {
    setContentList((prev) => prev.map((item) => (item.id === updatedContent.id ? updatedContent : item)))
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Biblioteca de Conteúdo</h2>
          <div className="flex items-center space-x-2">
            <Link href="/therapist/content/new">
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Adicionar Conteúdo
              </Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="library" className="space-y-4" onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="library">Minha Biblioteca</TabsTrigger>
            <TabsTrigger value="shared">Conteúdo Compartilhado</TabsTrigger>
          </TabsList>
          <TabsContent value="library" className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="relative flex-1 w-full sm:max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar conteúdo..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Todos os Tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Tipos</SelectItem>
                  <SelectItem value="audio">Áudio</SelectItem>
                  <SelectItem value="document">Documento</SelectItem>
                  <SelectItem value="image">Imagem</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredContent.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <div className="rounded-full bg-muted p-3">
                    <Filter className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">Nenhum conteúdo encontrado</h3>
                  <p className="mt-2 text-sm text-muted-foreground text-center max-w-sm">
                    Não encontramos nenhum conteúdo com os filtros atuais. Tente ajustar sua busca ou{" "}
                    <Link href="/therapist/content/new" className="text-primary hover:underline">
                      adicione um novo conteúdo
                    </Link>
                    .
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredContent.map((content) => (
                  <ContentCard
                    key={content.id}
                    content={content}
                    onEdit={handleEditContent}
                    onDelete={handleDeleteContent}
                    onShare={handleShareContent}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="shared" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Conteúdo Compartilhado</CardTitle>
                <CardDescription>Acompanhe qual conteúdo você compartilhou com clientes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <div className="rounded-full bg-muted p-3 inline-flex">
                    <Plus className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">Visualização de compartilhamento</h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
                    Aqui você poderá ver estatísticas detalhadas sobre o conteúdo compartilhado com seus clientes.
                  </p>
                  <Button className="mt-4" variant="outline" asChild>
                    <Link href="/therapist/content/new">Adicionar Conteúdo</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Diálogo de edição */}
      <EditContentDialog
        content={editingContent}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleSaveContent}
      />

      {/* Diálogo de confirmação de exclusão */}
      <AlertDialog open={!!deletingContentId} onOpenChange={(open) => !open && setDeletingContentId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir conteúdo?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente este conteúdo da sua biblioteca e removerá
              o acesso para todos os clientes com quem foi compartilhado.
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
