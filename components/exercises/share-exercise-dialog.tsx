"use client"

import { useState, useEffect } from "react"
import { Check, Search, Users } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

// Tipo para exercício
export interface Exercise {
  id: number
  title: string
  description: string
  category: string
  duration: string
  difficulty: string
  shared: number
  createdAt: string
}

interface Client {
  id: string
  name: string
  email: string
  avatar?: string
}

interface ShareExerciseDialogProps {
  exercise: Exercise
  open: boolean
  onOpenChange: (open: boolean) => void
  onShare: (clientIds: string[]) => void
}

// Dados simulados de clientes
const mockClients: Client[] = [
  { id: "1", name: "Maria Santos", email: "maria@exemplo.com", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "2", name: "João Oliveira", email: "joao@exemplo.com", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "3", name: "Ana Silva", email: "ana@exemplo.com", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "4", name: "Carlos Mendes", email: "carlos@exemplo.com", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "5", name: "Lúcia Ferreira", email: "lucia@exemplo.com", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "6", name: "Pedro Alves", email: "pedro@exemplo.com", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "7", name: "Sofia Costa", email: "sofia@exemplo.com", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "8", name: "Miguel Ribeiro", email: "miguel@exemplo.com", avatar: "/placeholder.svg?height=40&width=40" },
]

export function ShareExerciseDialog({ exercise, open, onOpenChange, onShare }: ShareExerciseDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClients, setSelectedClients] = useState<string[]>([])
  const [filteredClients, setFilteredClients] = useState<Client[]>(mockClients)

  // Filtrar clientes com base na consulta de pesquisa
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredClients(mockClients)
    } else {
      const query = searchQuery.toLowerCase()
      setFilteredClients(
        mockClients.filter(
          (client) => client.name.toLowerCase().includes(query) || client.email.toLowerCase().includes(query),
        ),
      )
    }
  }, [searchQuery])

  // Resetar seleção quando o diálogo é aberto
  useEffect(() => {
    if (open) {
      setSelectedClients([])
      setSearchQuery("")
    }
  }, [open])

  const handleToggleClient = (clientId: string) => {
    setSelectedClients((prev) => (prev.includes(clientId) ? prev.filter((id) => id !== clientId) : [...prev, clientId]))
  }

  const handleSelectAll = () => {
    if (selectedClients.length === filteredClients.length) {
      setSelectedClients([])
    } else {
      setSelectedClients(filteredClients.map((client) => client.id))
    }
  }

  const handleShare = () => {
    if (selectedClients.length === 0) {
      toast({
        title: "Nenhum cliente selecionado",
        description: "Por favor, selecione pelo menos um cliente para compartilhar o exercício.",
        variant: "destructive",
      })
      return
    }

    onShare(selectedClients)
    onOpenChange(false)
    toast({
      title: "Exercício compartilhado",
      description: `"${exercise.title}" foi compartilhado com ${selectedClients.length} cliente(s).`,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Compartilhar Exercício</DialogTitle>
          <DialogDescription>Selecione os clientes com quem deseja compartilhar "{exercise.title}"</DialogDescription>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar clientes..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="select-all"
            checked={selectedClients.length > 0 && selectedClients.length === filteredClients.length}
            onCheckedChange={handleSelectAll}
          />
          <Label htmlFor="select-all" className="text-sm cursor-pointer">
            {selectedClients.length === 0
              ? "Selecionar todos"
              : selectedClients.length === filteredClients.length
                ? "Desmarcar todos"
                : `Selecionados ${selectedClients.length} de ${filteredClients.length}`}
          </Label>
        </div>
        <ScrollArea className="h-[200px] rounded-md border">
          <div className="p-4 space-y-2">
            {filteredClients.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">Nenhum cliente encontrado</div>
            ) : (
              filteredClients.map((client) => (
                <div key={client.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`client-${client.id}`}
                    checked={selectedClients.includes(client.id)}
                    onCheckedChange={() => handleToggleClient(client.id)}
                  />
                  <Label htmlFor={`client-${client.id}`} className="flex items-center space-x-2 cursor-pointer flex-1">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
                      <AvatarFallback>
                        {client.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{client.name}</span>
                      <span className="text-xs text-muted-foreground">{client.email}</span>
                    </div>
                  </Label>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
        <DialogFooter className="sm:justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="mr-2 h-4 w-4" />
            {selectedClients.length} cliente(s) selecionado(s)
          </div>
          <Button onClick={handleShare} disabled={selectedClients.length === 0}>
            <Check className="mr-2 h-4 w-4" />
            Compartilhar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
