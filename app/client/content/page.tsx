"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, FileAudio, FileText, FileImage, File, ExternalLink, Download, Filter } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

// Tipos
interface Therapist {
  id: string
  name: string
  specialty: string
  avatar?: string
}

interface SharedContent {
  id: string
  title: string
  description: string
  type: string
  fileUrl: string
  thumbnailUrl?: string
  dateShared: Date
  therapist: Therapist
  isNew: boolean
  tags?: string[]
}

// Dados simulados
const mockSharedContent: SharedContent[] = [
  {
    id: "1",
    title: "Meditação Matinal",
    description: "Uma meditação guiada para prática matinal",
    type: "audio/mpeg",
    fileUrl: "/placeholder.svg",
    dateShared: new Date(2024, 3, 10),
    therapist: {
      id: "1",
      name: "Dr. Paulo Ribeiro",
      specialty: "Psicólogo",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    isNew: true,
    tags: ["meditação", "relaxamento", "manhã"],
  },
  {
    id: "2",
    title: "Exercício de Mindfulness",
    description: "Guia passo a passo para exercício de mindfulness",
    type: "application/pdf",
    fileUrl: "/placeholder.svg",
    dateShared: new Date(2024, 3, 7),
    therapist: {
      id: "1",
      name: "Dr. Paulo Ribeiro",
      specialty: "Psicólogo",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    isNew: true,
    tags: ["mindfulness", "exercício", "guia"],
  },
  {
    id: "3",
    title: "Leitura de Tarô",
    description: "Interpretação da sua leitura de tarô recente",
    type: "image/jpeg",
    fileUrl: "/placeholder.svg",
    dateShared: new Date(2024, 3, 5),
    therapist: {
      id: "3",
      name: "Marcos Almeida",
      specialty: "Tarólogo",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    isNew: false,
    tags: ["tarô", "interpretação", "arcanos"],
  },
  {
    id: "4",
    title: "Mapa Astral",
    description: "Seu mapa astral completo com interpretações",
    type: "application/pdf",
    fileUrl: "/placeholder.svg",
    dateShared: new Date(2024, 2, 28),
    therapist: {
      id: "4",
      name: "Juliana Costa",
      specialty: "Astróloga",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    isNew: false,
    tags: ["astrologia", "mapa", "planetas"],
  },
  {
    id: "5",
    title: "Relaxamento Noturno",
    description: "Áudio calmante para relaxamento noturno",
    type: "audio/mpeg",
    fileUrl: "/placeholder.svg",
    dateShared: new Date(2024, 2, 25),
    therapist: {
      id: "2",
      name: "Dra. Carla Sousa",
      specialty: "Terapeuta",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    isNew: false,
    tags: ["relaxamento", "noite", "sono"],
  },
]

export default function ClientContentPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [contentType, setContentType] = useState("all")
  const [therapistFilter, setTherapistFilter] = useState("all")
  const [filteredContent, setFilteredContent] = useState<SharedContent[]>(mockSharedContent)
  const [selectedContent, setSelectedContent] = useState<SharedContent | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  // Lista única de terapeutas para o filtro
  const therapists = Array.from(new Set(mockSharedContent.map((content) => content.therapist.id))).map((id) => {
    const therapist = mockSharedContent.find((content) => content.therapist.id === id)?.therapist
    return therapist
  })

  // Filtrar conteúdo
  useEffect(() => {
    let filtered = [...mockSharedContent]

    // Filtrar por tipo
    if (contentType !== "all") {
      filtered = filtered.filter((content) => {
        if (contentType === "audio") return content.type.includes("audio")
        if (contentType === "document") return content.type.includes("pdf") || content.type.includes("text")
        if (contentType === "image") return content.type.includes("image")
        return true
      })
    }

    // Filtrar por terapeuta
    if (therapistFilter !== "all") {
      filtered = filtered.filter((content) => content.therapist.id === therapistFilter)
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
  }, [searchQuery, contentType, therapistFilter])

  const handleViewContent = (content: SharedContent) => {
    setSelectedContent(content)
    setIsViewDialogOpen(true)
  }

  const getFileIcon = (type: string, size = 10) => {
    if (type.includes("audio")) return <FileAudio className={`h-${size} w-${size} text-primary`} />
    if (type.includes("pdf")) return <FileText className={`h-${size} w-${size} text-primary`} />
    if (type.includes("image")) return <FileImage className={`h-${size} w-${size} text-primary`} />
    return <File className={`h-${size} w-${size} text-primary`} />
  }

  const getFileTypeName = (type: string) => {
    if (type.includes("audio")) return "Áudio"
    if (type.includes("pdf")) return "PDF"
    if (type.includes("image")) return "Imagem"
    if (type.includes("text")) return "Texto"
    return "Arquivo"
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Meu Conteúdo</h2>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="new">Novos</TabsTrigger>
            <TabsTrigger value="favorites">Favoritos</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
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
              <Select value={therapistFilter} onValueChange={setTherapistFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Todos os Terapeutas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Terapeutas</SelectItem>
                  {therapists.map((therapist) => (
                    <SelectItem key={therapist?.id} value={therapist?.id || ""}>
                      {therapist?.name}
                    </SelectItem>
                  ))}
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
                    Não encontramos nenhum conteúdo com os filtros atuais. Tente ajustar sua busca.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredContent.map((content) => (
                  <Card key={content.id} className="overflow-hidden h-full flex flex-col">
                    <div className="h-32 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center">
                      {content.thumbnailUrl ? (
                        <img
                          src={content.thumbnailUrl || "/placeholder.svg"}
                          alt={content.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        getFileIcon(content.type)
                      )}
                    </div>
                    <CardContent className="p-4 flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <h3 className="font-medium truncate">{content.title}</h3>
                          {content.isNew && (
                            <Badge variant="default" className="ml-2">
                              Novo
                            </Badge>
                          )}
                        </div>
                        <Badge variant="outline">{getFileTypeName(content.type)}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{content.description}</p>
                      <div className="flex items-center mt-4 space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={content.therapist.avatar || "/placeholder.svg"}
                            alt={content.therapist.name}
                          />
                          <AvatarFallback>
                            {content.therapist.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-xs">
                          <p className="font-medium">{content.therapist.name}</p>
                          <p className="text-muted-foreground">{formatDate(content.dateShared)}</p>
                        </div>
                      </div>
                    </CardContent>
                    <div className="p-4 pt-0 flex justify-between border-t mt-auto">
                      <Button variant="outline" size="sm" onClick={() => handleViewContent(content)}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visualizar
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={content.fileUrl} download target="_blank" rel="noopener noreferrer">
                          <Download className="mr-2 h-4 w-4" />
                          Baixar
                        </a>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="new" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockSharedContent
                .filter((content) => content.isNew)
                .map((content) => (
                  <Card key={content.id} className="overflow-hidden h-full flex flex-col">
                    <div className="h-32 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center">
                      {content.thumbnailUrl ? (
                        <img
                          src={content.thumbnailUrl || "/placeholder.svg"}
                          alt={content.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        getFileIcon(content.type)
                      )}
                    </div>
                    <CardContent className="p-4 flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <h3 className="font-medium truncate">{content.title}</h3>
                          <Badge variant="default" className="ml-2">
                            Novo
                          </Badge>
                        </div>
                        <Badge variant="outline">{getFileTypeName(content.type)}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{content.description}</p>
                      <div className="flex items-center mt-4 space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={content.therapist.avatar || "/placeholder.svg"}
                            alt={content.therapist.name}
                          />
                          <AvatarFallback>
                            {content.therapist.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-xs">
                          <p className="font-medium">{content.therapist.name}</p>
                          <p className="text-muted-foreground">{formatDate(content.dateShared)}</p>
                        </div>
                      </div>
                    </CardContent>
                    <div className="p-4 pt-0 flex justify-between border-t mt-auto">
                      <Button variant="outline" size="sm" onClick={() => handleViewContent(content)}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visualizar
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={content.fileUrl} download target="_blank" rel="noopener noreferrer">
                          <Download className="mr-2 h-4 w-4" />
                          Baixar
                        </a>
                      </Button>
                    </div>
                  </Card>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="favorites" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Conteúdo Favorito</CardTitle>
                <CardDescription>Acesse rapidamente seu conteúdo favorito</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <div className="rounded-full bg-muted p-3 inline-flex">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">Nenhum favorito ainda</h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
                    Você ainda não marcou nenhum conteúdo como favorito. Ao visualizar um conteúdo, clique no ícone de
                    estrela para adicioná-lo aos favoritos.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Diálogo de visualização de conteúdo */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedContent?.title}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center space-x-2 mb-4">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={selectedContent?.therapist.avatar || "/placeholder.svg"}
                  alt={selectedContent?.therapist.name}
                />
                <AvatarFallback>
                  {selectedContent?.therapist.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{selectedContent?.therapist.name}</p>
                <p className="text-xs text-muted-foreground">
                  Compartilhado em {selectedContent && formatDate(selectedContent.dateShared)}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-muted-foreground">{selectedContent?.description}</p>
            </div>

            {selectedContent?.tags && selectedContent.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedContent.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <ScrollArea className="h-[300px] rounded-md border p-4">
              {selectedContent?.type.includes("audio") ? (
                <div className="flex flex-col items-center">
                  <FileAudio className="h-16 w-16 text-primary mb-4" />
                  <audio controls className="w-full">
                    <source src={selectedContent.fileUrl} type={selectedContent.type} />
                    Seu navegador não suporta o elemento de áudio.
                  </audio>
                </div>
              ) : selectedContent?.type.includes("image") ? (
                <div className="flex flex-col items-center">
                  <img
                    src={selectedContent.fileUrl || "/placeholder.svg"}
                    alt={selectedContent.title}
                    className="max-w-full rounded-md"
                  />
                </div>
              ) : selectedContent?.type.includes("pdf") ? (
                <div className="flex flex-col items-center">
                  <FileText className="h-16 w-16 text-primary mb-2" />
                  <p className="text-sm text-muted-foreground mb-4">Visualização de PDF não disponível</p>
                  <Button asChild>
                    <a href={selectedContent.fileUrl} target="_blank" rel="noopener noreferrer">
                      Abrir PDF
                    </a>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <File className="h-16 w-16 text-primary mb-2" />
                  <p className="text-sm text-muted-foreground mb-4">Visualização não disponível</p>
                  <Button asChild>
                    <a href={selectedContent?.fileUrl} target="_blank" rel="noopener noreferrer">
                      Baixar Arquivo
                    </a>
                  </Button>
                </div>
              )}
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
