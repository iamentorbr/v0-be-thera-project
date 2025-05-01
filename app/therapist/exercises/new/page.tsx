"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, Share2, Eye } from "lucide-react"
import Link from "next/link"

export default function NewExercisePage() {
  const [activeTab, setActiveTab] = useState("details")

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/therapist/exercises">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h2 className="text-3xl font-bold tracking-tight">Novo Exercício</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Visualizar
            </Button>
            <Button variant="outline">
              <Save className="mr-2 h-4 w-4" />
              Salvar Rascunho
            </Button>
            <Button>
              <Share2 className="mr-2 h-4 w-4" />
              Publicar
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="details">Detalhes</TabsTrigger>
            <TabsTrigger value="content">Conteúdo</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
                <CardDescription>Defina as informações básicas do exercício</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input id="title" placeholder="Digite o título do exercício" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea id="description" placeholder="Descreva brevemente o exercício" className="min-h-[100px]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="anxiety">Ansiedade</SelectItem>
                        <SelectItem value="depression">Depressão</SelectItem>
                        <SelectItem value="stress">Estresse</SelectItem>
                        <SelectItem value="phobias">Fobias</SelectItem>
                        <SelectItem value="other">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Dificuldade</Label>
                    <Select>
                      <SelectTrigger id="difficulty">
                        <SelectValue placeholder="Selecione a dificuldade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Iniciante</SelectItem>
                        <SelectItem value="intermediate">Intermediário</SelectItem>
                        <SelectItem value="advanced">Avançado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duração Estimada</Label>
                    <Input id="duration" placeholder="Ex: 15-20 min" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frequência Recomendada</Label>
                    <Input id="frequency" placeholder="Ex: Diariamente" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("content")}>
                  Cancelar
                </Button>
                <Button onClick={() => setActiveTab("content")}>Próximo</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Conteúdo do Exercício</CardTitle>
                <CardDescription>Adicione instruções, etapas e materiais para o exercício</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="instructions">Instruções</Label>
                  <Textarea
                    id="instructions"
                    placeholder="Forneça instruções detalhadas para o exercício"
                    className="min-h-[200px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="materials">Materiais Necessários (opcional)</Label>
                  <Textarea
                    id="materials"
                    placeholder="Liste os materiais necessários para realizar o exercício"
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expected-results">Resultados Esperados</Label>
                  <Textarea
                    id="expected-results"
                    placeholder="Descreva os resultados esperados deste exercício"
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("details")}>
                  Voltar
                </Button>
                <Button onClick={() => setActiveTab("settings")}>Próximo</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configurações</CardTitle>
                <CardDescription>Configure opções adicionais para o exercício</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input id="tags" placeholder="Adicione tags separadas por vírgula" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notas para o Terapeuta (não visíveis para o cliente)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Adicione notas privadas sobre este exercício"
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("content")}>
                  Voltar
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Rascunho
                  </Button>
                  <Button>
                    <Share2 className="mr-2 h-4 w-4" />
                    Publicar
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
