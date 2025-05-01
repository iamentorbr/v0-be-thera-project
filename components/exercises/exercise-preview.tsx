import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, Clock, BarChart } from "lucide-react"

interface ExercisePreviewProps {
  exercise: {
    id: string | number
    title: string
    description: string
    category: string
    duration: string
    difficulty: string
    instructions: string
    materials: string
    expectedResults: string
    tags: string[]
  }
}

export function ExercisePreview({ exercise }: ExercisePreviewProps) {
  // Função para renderizar o conteúdo markdown como HTML
  const renderMarkdown = (content: string) => {
    // Em uma implementação real, você usaria uma biblioteca como marked ou remark
    // Por enquanto, vamos apenas preservar as quebras de linha
    return content.split("\n").map((line, i) => <p key={i}>{line}</p>)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg mb-6 flex items-center gap-3">
        <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
          <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="font-medium text-blue-700 dark:text-blue-300">Visualização do Cliente</h3>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Esta é uma prévia de como seu cliente verá este exercício
          </p>
        </div>
      </div>

      <Card className="shadow-md">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold">{exercise.title}</CardTitle>
            <Badge variant="outline" className="ml-2">
              {exercise.category}
            </Badge>
          </div>
          <p className="text-muted-foreground mt-2">{exercise.description}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{exercise.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <BarChart className="h-4 w-4 text-muted-foreground" />
              <span>Nível: {exercise.difficulty}</span>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Instruções</h3>
            <Separator className="my-2" />
            <div className="mt-3 prose max-w-none text-sm">{renderMarkdown(exercise.instructions)}</div>
          </div>

          {exercise.materials && (
            <div>
              <h3 className="font-medium mb-2">Materiais Necessários</h3>
              <Separator className="my-2" />
              <p className="mt-3 text-sm">{exercise.materials}</p>
            </div>
          )}

          {exercise.expectedResults && (
            <div>
              <h3 className="font-medium mb-2">Resultados Esperados</h3>
              <Separator className="my-2" />
              <p className="mt-3 text-sm">{exercise.expectedResults}</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <div className="flex flex-wrap gap-2 mt-2">
              {exercise.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardFooter>
      </Card>

      <div className="mt-6 bg-muted p-4 rounded-lg">
        <h3 className="font-medium mb-2">Feedback do Cliente</h3>
        <p className="text-sm text-muted-foreground">
          Os clientes poderão marcar o exercício como concluído e deixar comentários sobre sua experiência.
        </p>
      </div>
    </div>
  )
}
