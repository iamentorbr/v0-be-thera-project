"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { toast } from "@/components/ui/use-toast"
import { ArrowLeft, Save, Share2, Trash2, Edit, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { ShareExerciseDialog } from "@/components/exercises/share-exercise-dialog"

// Dados de exemplo para um exercício específico
const exerciseData = {
  id: 1,
  title: "Respiração Diafragmática",
  description: "Técnica de respiração para redução de ansiedade e estresse",
  category: "Ansiedade",
  duration: "5-10 min",
  difficulty: "Iniciante",
  shared: 8,
  createdAt: "2023-10-15",
  instructions: `# Respiração Diafragmática

Esta técnica de respiração ajuda a reduzir a ansiedade e o estresse, ativando o sistema nervoso parassimpático.

## Passos:

1. Sente-se confortavelmente ou deite-se de costas
2. Coloque uma mão no peito e outra no abdômen
3. Inspire lentamente pelo nariz, contando até 4, sentindo o abdômen expandir
4. Segure a respiração por 1-2 segundos
5. Expire lentamente pela boca, contando até 6
6. Repita por 5-10 minutos diariamente

## Benefícios:

- Redução da frequência cardíaca e pressão arterial
- Diminuição dos níveis de cortisol (hormônio do estresse)
- Melhora da concentração e clareza mental
- Relaxamento muscular`,
  materials: "Nenhum material necessário, apenas um local tranquilo e confortável.",
  expectedResults:
    "Redução imediata dos sintomas de ansiedade e, com prática regular, diminuição da resposta ao estresse a longo prazo.",
  tags: ["respiração", "ansiedade", "relaxamento", "estresse", "iniciante"],
  privateNotes:
    "Especialmente eficaz para clientes com transtorno de ansiedade generalizada e ataques de pânico. Considerar como primeiro exercício para novos clientes.",
  sharedWith: [
    { id: "1", name: "Maria Silva", email: "maria@example.com", lastAccess: "2023-11-10" },
    { id: "2", name: "João Santos", email: "joao@example.com", lastAccess: "2023-11-05" },
    { id: "3", name: "Ana Oliveira", email: "ana@example.com", lastAccess: "2023-10-28" },
  ],
}

// Categorias disponíveis para seleção
const categories = [
  "Ansiedade",
  "Depressão",
  "Estresse",
  "Fobias",
  "Trauma",
  "Relacionamentos",
  "Autoestima",
  "Habilidades Sociais",
  "Mindfulness",
  "Outro",
]

// Níveis de dificuldade disponíveis
const difficultyLevels = ["Iniciante", "Intermediário", "Avançado"]

// Opções de duração
const durationOptions = ["5 min", "5-10 min", "10-15 min", "15-20 min", "20-30 min", "30+ min"]

export default function ExerciseDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [exercise, setExercise] = useState(exerciseData)
  const [formData, setFormData] = useState(exerciseData)

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Função para lidar com mudanças nas tags
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsString = e.target.value
    const tagsArray = tagsString
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "")
    setFormData((prev) => ({ ...prev, tags: tagsArray }))
  }

  // Função para salvar as alterações
  const handleSave = () => {
    setExercise(formData)
    setIsEditing(false)
    toast({
      title: "Alterações salvas",
      description: "As alterações no exercício foram salvas com sucesso.",
      duration: 3000,
    })
  }

  // Função para cancelar a edição
  const handleCancel = () => {
    setFormData(exercise)
    setIsEditing(false)
  }

  // Função para compartilhar o exercício
  const handleShare = (clientIds: string[]) => {
    console.log(`Compartilhando exercício ${exercise.id} com clientes:`, clientIds)
    toast({
      title: "Exercício compartilhado",
      description: `O exercício foi compartilhado com ${clientIds.length} cliente(s).`,
      duration: 3000,
    })
  }

  // Função para excluir o exercício
  const handleDelete = () => {
    router.push("/therapist/exercises")
    toast({
      title: "Exercício excluído",
      description: "O exercício foi excluído com sucesso.",
      variant: "destructive",
      duration: 3000,
    })
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/therapist/exercises">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">{isEditing ? "Editar Exercício" : exercise.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setShareDialogOpen(true)}>
                <Share2 className="mr-2 h-4 w-4" />
                Compartilhar
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Excluir
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Excluir exercício</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja excluir este exercício? Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Excluir</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Detalhes</TabsTrigger>
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="sharing">Compartilhamento</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoria</Label>
                      <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Nível de Dificuldade</Label>
                      <Select value={formData.difficulty} onValueChange={(value) => handleChange("difficulty", value)}>
                        <SelectTrigger id="difficulty">
                          <SelectValue placeholder="Selecione um nível" />
                        </SelectTrigger>
                        <SelectContent>
                          {difficultyLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duração</Label>
                      <Select value={formData.duration} onValueChange={(value) => handleChange("duration", value)}>
                        <SelectTrigger id="duration">
                          <SelectValue placeholder="Selecione uma duração" />
                        </SelectTrigger>
                        <SelectContent>
                          {durationOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Informações Básicas</h3>
                    <Separator className="my-2" />
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mt-4">
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Categoria</dt>
                        <dd className="mt-1">
                          <Badge variant="secondary">{exercise.category}</Badge>
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Criado em</dt>
                        <dd className="mt-1">{exercise.createdAt}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Dificuldade</dt>
                        <dd className="mt-1">{exercise.difficulty}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Duração</dt>
                        <dd className="mt-1">{exercise.duration}</dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Descrição</h3>
                    <Separator className="my-2" />
                    <p className="mt-2">{exercise.description}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="instructions">Instruções</Label>
                    <Textarea
                      id="instructions"
                      value={formData.instructions}
                      onChange={(e) => handleChange("instructions", e.target.value)}
                      rows={10}
                      placeholder="Instruções detalhadas do exercício. Você pode usar formatação Markdown."
                    />
                    <p className="text-xs text-muted-foreground">
                      Você pode usar formatação Markdown para estruturar as instruções.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="materials">Materiais Necessários</Label>
                    <Textarea
                      id="materials"
                      value={formData.materials}
                      onChange={(e) => handleChange("materials", e.target.value)}
                      rows={3}
                      placeholder="Liste os materiais necessários para realizar este exercício."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expectedResults">Resultados Esperados</Label>
                    <Textarea
                      id="expectedResults"
                      value={formData.expectedResults}
                      onChange={(e) => handleChange("expectedResults", e.target.value)}
                      rows={3}
                      placeholder="Descreva os resultados esperados deste exercício."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                    <Input
                      id="tags"
                      value={formData.tags.join(", ")}
                      onChange={handleTagsChange}
                      placeholder="respiração, ansiedade, relaxamento"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="privateNotes">Notas Privadas (visíveis apenas para você)</Label>
                    <Textarea
                      id="privateNotes"
                      value={formData.privateNotes}
                      onChange={(e) => handleChange("privateNotes", e.target.value)}
                      rows={3}
                      placeholder="Notas privadas sobre este exercício (não serão compartilhadas com clientes)."
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Instruções</h3>
                    <Separator className="my-2" />
                    <div className="mt-2 prose max-w-none">
                      <pre className="whitespace-pre-wrap font-sans">{exercise.instructions}</pre>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Materiais Necessários</h3>
                    <Separator className="my-2" />
                    <p className="mt-2">{exercise.materials}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Resultados Esperados</h3>
                    <Separator className="my-2" />
                    <p className="mt-2">{exercise.expectedResults}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Tags</h3>
                    <Separator className="my-2" />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {exercise.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Notas Privadas</h3>
                    <Separator className="my-2" />
                    <p className="mt-2 text-muted-foreground">{exercise.privateNotes}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sharing" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Compartilhado com {exercise.sharedWith.length} clientes</h3>
                  <Button variant="outline" onClick={() => setShareDialogOpen(true)}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Compartilhar com mais clientes
                  </Button>
                </div>
                <Separator className="my-2" />
                {exercise.sharedWith.length > 0 ? (
                  <div className="space-y-4">
                    {exercise.sharedWith.map((client) => (
                      <div key={client.id} className="flex items-center justify-between p-2 rounded-md border">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            {client.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{client.name}</p>
                            <p className="text-sm text-muted-foreground">{client.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-muted-foreground">Último acesso: {client.lastAccess}</div>
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Este exercício ainda não foi compartilhado com nenhum cliente.
                    </p>
                    <Button variant="outline" className="mt-4" onClick={() => setShareDialogOpen(true)}>
                      <Share2 className="mr-2 h-4 w-4" />
                      Compartilhar agora
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ShareExerciseDialog
        exercise={exercise}
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        onShare={handleShare}
      />
    </div>
  )
}
