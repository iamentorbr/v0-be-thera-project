"use client"

import { useState } from "react"
import { FileAudio, FileText, FileImage, File, Share, Edit, Trash2, MoreHorizontal, ExternalLink } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ShareContentDialog } from "@/components/content/share-content-dialog"

export interface ContentItem {
  id: string
  title: string
  description: string
  type: string
  fileUrl: string
  thumbnailUrl?: string
  dateAdded: Date
  sharedWith: number
  tags?: string[]
}

interface ContentCardProps {
  content: ContentItem
  onEdit: (content: ContentItem) => void
  onDelete: (id: string) => void
  onShare: (content: ContentItem) => void
}

export function ContentCard({ content, onEdit, onDelete, onShare }: ContentCardProps) {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)

  const getFileIcon = () => {
    const type = content.type.toLowerCase()
    if (type.includes("audio")) return <FileAudio className="h-10 w-10 text-primary" />
    if (type.includes("pdf")) return <FileText className="h-10 w-10 text-primary" />
    if (type.includes("image")) return <FileImage className="h-10 w-10 text-primary" />
    return <File className="h-10 w-10 text-primary" />
  }

  const getFileTypeName = () => {
    const type = content.type.toLowerCase()
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
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="h-32 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center">
        {content.thumbnailUrl ? (
          <img
            src={content.thumbnailUrl || "/placeholder.svg"}
            alt={content.title}
            className="h-full w-full object-cover"
          />
        ) : (
          getFileIcon()
        )}
      </div>
      <CardContent className="p-4 flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium truncate">{content.title}</h3>
          <Badge variant="outline">{getFileTypeName()}</Badge>
        </div>
        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{content.description}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div>Adicionado: {formatDate(content.dateAdded)}</div>
          <div className="flex items-center">
            <Share className="h-3 w-3 mr-1" />
            Compartilhado com {content.sharedWith}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between border-t mt-auto">
        <Button variant="outline" size="sm" onClick={() => setIsShareDialogOpen(true)}>
          <Share className="mr-2 h-4 w-4" />
          Compartilhar
        </Button>
        <div className="flex gap-1">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{content.title}</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                {content.type.includes("audio") ? (
                  <audio controls className="w-full">
                    <source src={content.fileUrl} type={content.type} />
                    Seu navegador não suporta o elemento de áudio.
                  </audio>
                ) : content.type.includes("image") ? (
                  <img
                    src={content.fileUrl || "/placeholder.svg"}
                    alt={content.title}
                    className="max-w-full rounded-md"
                  />
                ) : content.type.includes("pdf") ? (
                  <div className="flex flex-col items-center">
                    <FileText className="h-16 w-16 text-primary mb-2" />
                    <p className="text-sm text-muted-foreground mb-4">Visualização de PDF não disponível</p>
                    <Button asChild>
                      <a href={content.fileUrl} target="_blank" rel="noopener noreferrer">
                        Abrir PDF
                      </a>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <File className="h-16 w-16 text-primary mb-2" />
                    <p className="text-sm text-muted-foreground mb-4">Visualização não disponível</p>
                    <Button asChild>
                      <a href={content.fileUrl} target="_blank" rel="noopener noreferrer">
                        Baixar Arquivo
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(content)}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsShareDialogOpen(true)}>
                <Share className="mr-2 h-4 w-4" />
                Compartilhar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => onDelete(content.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>

      <ShareContentDialog
        content={content}
        open={isShareDialogOpen}
        onOpenChange={setIsShareDialogOpen}
        onShare={(clientIds) => {
          onShare({ ...content, sharedWith: clientIds.length })
          setIsShareDialogOpen(false)
        }}
      />
    </Card>
  )
}
