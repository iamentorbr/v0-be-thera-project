"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { ArrowLeft, Clock, BarChart, CheckCircle, MessageSquare } from "lucide-react"
import Link from "next/link"

// Dados de exemplo para um exercício específico
const exerciseData = {
  id: 1,
  title: "Respiração Diafragmática",
  description: "Técnica de respiração para redução de ansiedade e estresse",
  category: "Ansiedade",
  duration: "5-10 min",
  difficulty: "Iniciante",
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
  assignedDate: "2023-11-10",
}

export default function ClientExerciseDetailsPage({ params }: { params: { id: string } }) {
  const [exercise] = useState(exerciseData)
  const [completed, setCompleted] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)

  // Função  = useState("")
  // Função para marcar o exercício como concluído
  const handleMarkAsCompleted = () => {
    setCompleted(true)
    toast({
      title: "Exercício concluído",
      description: "Parabéns! Você concluiu este exercício.",
      duration: 3000,
    })
  }

  // Função para enviar feedback
  const handleSubmitFeedback = () => {
    if (feedback.trim()) {
      toast({
        title: "Feedback enviado",
        description: "Seu feedback foi enviado com sucesso ao terapeuta.",
        duration: 3000,
      })
      setFeedback("")
      setShowFeedbackForm(false)
    }
  }

  // Função para renderizar o conteúdo markdown como HTML
  const renderMarkdown = (content: string) => {
    // Em uma implementação real, você usaria uma biblioteca como marked ou remark
    // Por enquanto, vamos apenas preservar as quebras de linha
    return content.split("\n").map((line, i) => <p key={i}>{line}</p>)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/client/exercises">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">{exercise.title}</h1>
      </div>

      <Card className="mb-6">
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
            <div className="mt-3 prose max-w-none">{renderMarkdown(exercise.instructions)}</div>
          </div>

          {exercise.materials && (
            <div>
              <h3 className="font-medium mb-2">Materiais Necessários</h3>
              <Separator className="my-2" />
              <p className="mt-3">{exercise.materials}</p>
            </div>
          )}

          {exercise.expectedResults && (
            <div>
              <h3 className="font-medium mb-2">Resultados Esperados</h3>
              <Separator className="my-2" />
              <p className="mt-3">{exercise.expectedResults}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex-col items-start gap-4">
          <div className="w-full">
            <div className="flex flex-wrap gap-2">
              {exercise.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="w-full pt-2 border-t">
            <p className="text-sm text-muted-foreground mb-4">Atribuído em: {exercise.assignedDate}</p>
            <div className="flex flex-wrap gap-2">
              <Button variant={completed ? "default" : "outline"} onClick={handleMarkAsCompleted} disabled={completed}>
                <CheckCircle className="mr-2 h-4 w-4" />
                {completed ? "Concluído" : "Marcar como Concluído"}
              </Button>
              <Button variant="outline" onClick={() => setShowFeedbackForm(!showFeedbackForm)}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Enviar Feedback
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>

      {showFeedbackForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Enviar Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Compartilhe sua experiência com este exercício..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
            />
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowFeedbackForm(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmitFeedback}>Enviar</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
