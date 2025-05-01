"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, Filter, MoreVertical, Share2, Edit, Trash2, FileText } from "lucide-react"
import Link from "next/link"
import { ShareExerciseDialog, type Exercise } from "@/components/exercises/share-exercise-dialog"

// Dados de exemplo para exercícios
const exercisesData: Exercise[] = [
  {
    id: 1,
    title: "Respiração Diafragmática",
    description: "Técnica de respiração para redução de ansiedade e estresse",
    category: "Ansiedade",
    duration: "5-10 min",
    difficulty: "Iniciante",
    shared: 8,
    createdAt: "2023-10-15",
  },
  {
    id: 2,
    title: "Registro de Pensamentos Automáticos",
    description: "Identificação e análise de pensamentos negativos automáticos",
    category: "Depressão",
    duration: "15-20 min",
    difficulty: "Intermediário",
    shared: 12,
    createdAt: "2023-09-22",
  },
  {
    id: 3,
    title: "Exposição Gradual",
    description: "Técnica de exposição gradual para fobias específicas",
    category: "Fobias",
    duration: "30 min",
    difficulty: "Avançado",
    shared: 5,
    createdAt: "2023-11-05",
  },
  {
    id: 4,
    title: "Mindfulness Diário",
    description: "Prática diária de atenção plena para redução de estresse",
    category: "Estresse",
    duration: "10 min",
    difficulty: "Iniciante",
    shared: 15,
    createdAt: "2023-08-30",
  },
  {
    id: 5,
    title: "Reestruturação Cognitiva",
    description: "Identificação e modificação de crenças disfuncionais",
    category: "Ansiedade",
    duration: "20-30 min",
    difficulty: "Intermediário",
    shared: 10,
    createdAt: "2023-10-10",
  },
  {
    id: 6,
    title: "Relaxamento Muscular Progressivo",
    description: "Técnica de relaxamento para redução de tensão física",
    category: "Estresse",
    duration: "15 min",
    difficulty: "Iniciante",
    shared: 7,
    createdAt: "2023-09-15",
  },
]

// Componente para o cartão de exercício
function ExerciseCard({ exercise, onShare }: { exercise: Exercise; onShare: (exercise: Exercise) => void }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <Link href={`/therapist/exercises/${exercise.id}`} className="hover:underline">
              <CardTitle className="text-lg">{exercise.title}</CardTitle>
            </Link>
            <CardDescription className="mt-1">{exercise.description}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onShare(exercise)}>
                <Share2 className="mr-2 h-4 w-4" />
                <span>Compartilhar</span>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/therapist/exercises/${exercise.id}`}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Editar</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Excluir</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">{exercise.category}</Badge>
          <Badge variant="outline">{exercise.duration}</Badge>
          <Badge variant="outline">{exercise.difficulty}</Badge>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-muted-foreground pt-0">
        <div>Compartilhado com {exercise.shared} clientes</div>
        <div>Criado em {exercise.createdAt}</div>
      </CardFooter>
    </Card>
  )
}

export default function ExercisesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)

  const handleShareClick = (exercise: Exercise) => {
    setSelectedExercise(exercise)
    setShareDialogOpen(true)
  }

  const handleShareExercise = (clientIds: string[]) => {
    // Aqui você implementaria a lógica real para compartilhar o exercício
    console.log(`Compartilhando exercício ${selectedExercise?.id} com clientes:`, clientIds)

    // Atualizar o estado local para refletir o compartilhamento
    // Em uma implementação real, isso seria feito após uma chamada de API bem-sucedida
    const updatedExercises = exercisesData.map((ex) =>
      ex.id === selectedExercise?.id ? { ...ex, shared: ex.shared + clientIds.length } : ex,
    )

    // Em uma implementação real, você atualizaria o estado com os exercícios atualizados
    // setExercisesData(updatedExercises);
  }

  // Filtrar exercícios com base na consulta de pesquisa
  const filteredExercises =
    searchQuery.trim() === ""
      ? exercisesData
      : exercisesData.filter(
          (exercise) =>
            exercise.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            exercise.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            exercise.category.toLowerCase().includes(searchQuery.toLowerCase()),
        )

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Exercícios</h2>
          <div className="flex items-center space-x-2">
            <Button asChild>
              <Link href="/therapist/exercises/new">
                <Plus className="mr-2 h-4 w-4" />
                Novo Exercício
              </Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="shared">Compartilhados</TabsTrigger>
              <TabsTrigger value="drafts">Rascunhos</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar exercícios..."
                  className="w-[250px] pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredExercises.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} onShare={handleShareClick} />
              ))}
            </div>
            {filteredExercises.length === 0 && (
              <div className="flex flex-col items-center justify-center h-40 border border-dashed rounded-lg">
                <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Nenhum exercício encontrado</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="shared" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredExercises
                .filter((exercise) => exercise.shared > 0)
                .map((exercise) => (
                  <ExerciseCard key={exercise.id} exercise={exercise} onShare={handleShareClick} />
                ))}
            </div>
            {filteredExercises.filter((ex) => ex.shared > 0).length === 0 && (
              <div className="flex flex-col items-center justify-center h-40 border border-dashed rounded-lg">
                <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Nenhum exercício compartilhado encontrado</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="drafts" className="space-y-4">
            <div className="flex flex-col items-center justify-center h-40 border border-dashed rounded-lg">
              <FileText className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">Nenhum rascunho encontrado</p>
              <Button variant="link" asChild className="mt-2">
                <Link href="/therapist/exercises/new">Criar novo exercício</Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {selectedExercise && (
        <ShareExerciseDialog
          exercise={selectedExercise}
          open={shareDialogOpen}
          onOpenChange={setShareDialogOpen}
          onShare={handleShareExercise}
        />
      )}
    </div>
  )
}
