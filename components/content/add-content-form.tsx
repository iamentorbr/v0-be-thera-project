"use client"

import type React from "react"

import { useState } from "react"
import { FileAudio, FileText, FileImage, File } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUpload, type UploadedFile } from "@/components/content/file-upload"
import { toast } from "@/components/ui/use-toast"
import type { ContentItem } from "@/components/content/content-card"

interface AddContentFormProps {
  onContentAdded: (content: ContentItem) => void
}

export function AddContentForm({ onContentAdded }: AddContentFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [contentType, setContentType] = useState("audio")
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleUploadComplete = (file: UploadedFile) => {
    setUploadedFile(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      toast({
        title: "Título obrigatório",
        description: "Por favor, forneça um título para o conteúdo.",
        variant: "destructive",
      })
      return
    }

    if (!uploadedFile) {
      toast({
        title: "Arquivo obrigatório",
        description: "Por favor, faça upload de um arquivo.",
        variant: "destructive",
      })
      return
    }

    const newContent: ContentItem = {
      id: Math.random().toString(36).substring(2, 11),
      title,
      description,
      type: uploadedFile.type,
      fileUrl: uploadedFile.url,
      dateAdded: new Date(),
      sharedWith: 0,
      tags,
    }

    onContentAdded(newContent)

    // Resetar o formulário
    setTitle("")
    setDescription("")
    setUploadedFile(null)
    setTags([])
    setTagInput("")

    toast({
      title: "Conteúdo adicionado",
      description: "O conteúdo foi adicionado com sucesso à sua biblioteca.",
    })
  }

  const getAcceptedFileTypes = () => {
    switch (contentType) {
      case "audio":
        return "audio/*"
      case "document":
        return ".pdf,.doc,.docx,.txt"
      case "image":
        return "image/*"
      default:
        return "*"
    }
  }

  const getContentTypeIcon = () => {
    switch (contentType) {
      case "audio":
        return <FileAudio className="h-6 w-6 text-primary" />
      case "document":
        return <FileText className="h-6 w-6 text-primary" />
      case "image":
        return <FileImage className="h-6 w-6 text-primary" />
      default:
        return <File className="h-6 w-6 text-primary" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adicionar Novo Conteúdo</CardTitle>
        <CardDescription>Faça upload de conteúdo para compartilhar com seus clientes</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título do conteúdo"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Breve descrição do conteúdo"
            />
          </div>
          <div className="space-y-2">
            <Label>Tipo de Conteúdo</Label>
            <Tabs defaultValue="audio" value={contentType} onValueChange={setContentType}>
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="audio">Áudio</TabsTrigger>
                <TabsTrigger value="document">Documento</TabsTrigger>
                <TabsTrigger value="image">Imagem</TabsTrigger>
              </TabsList>
              <TabsContent value="audio" className="pt-4">
                <div className="flex items-center gap-2 mb-4">
                  {getContentTypeIcon()}
                  <div>
                    <h4 className="text-sm font-medium">Arquivo de Áudio</h4>
                    <p className="text-xs text-muted-foreground">Upload de arquivos MP3, WAV, etc.</p>
                  </div>
                </div>
                <FileUpload
                  onUploadComplete={handleUploadComplete}
                  acceptedFileTypes={getAcceptedFileTypes()}
                  maxSizeMB={20}
                />
              </TabsContent>
              <TabsContent value="document" className="pt-4">
                <div className="flex items-center gap-2 mb-4">
                  {getContentTypeIcon()}
                  <div>
                    <h4 className="text-sm font-medium">Documento</h4>
                    <p className="text-xs text-muted-foreground">Upload de arquivos PDF, DOC, TXT, etc.</p>
                  </div>
                </div>
                <FileUpload
                  onUploadComplete={handleUploadComplete}
                  acceptedFileTypes={getAcceptedFileTypes()}
                  maxSizeMB={10}
                />
              </TabsContent>
              <TabsContent value="image" className="pt-4">
                <div className="flex items-center gap-2 mb-4">
                  {getContentTypeIcon()}
                  <div>
                    <h4 className="text-sm font-medium">Imagem</h4>
                    <p className="text-xs text-muted-foreground">Upload de arquivos JPG, PNG, etc.</p>
                  </div>
                </div>
                <FileUpload
                  onUploadComplete={handleUploadComplete}
                  acceptedFileTypes={getAcceptedFileTypes()}
                  maxSizeMB={5}
                />
              </TabsContent>
            </Tabs>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (opcional)</Label>
            <div className="flex space-x-2">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Adicionar tag..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddTag()
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={handleAddTag}>
                Adicionar
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      className="ml-1 text-muted-foreground hover:text-foreground"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={() => window.history.back()}>
            Cancelar
          </Button>
          <Button type="submit">Adicionar Conteúdo</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
