"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { FileText, Plus, Save, Upload } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function DocumentSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("templates")

  const handleSave = async () => {
    setIsLoading(true)

    // Simulação de salvamento das configurações
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Configurações salvas",
        description: "Suas configurações de documentos foram salvas com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as configurações. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 gap-2">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="signature">Assinatura</TabsTrigger>
          <TabsTrigger value="letterhead">Papel Timbrado</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Templates de Documentos</CardTitle>
              <CardDescription>Gerencie modelos de documentos para diferentes finalidades</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-end">
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Template
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Última Modificação</TableHead>
                    <TableHead className="w-[100px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Contrato de Terapia</TableCell>
                    <TableCell>Contrato</TableCell>
                    <TableCell>10/05/2023</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Declaração de Comparecimento</TableCell>
                    <TableCell>Declaração</TableCell>
                    <TableCell>15/06/2023</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Recibo de Pagamento</TableCell>
                    <TableCell>Financeiro</TableCell>
                    <TableCell>22/07/2023</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Relatório Psicológico</TableCell>
                    <TableCell>Relatório</TableCell>
                    <TableCell>05/08/2023</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="signature" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Assinatura Digital</CardTitle>
              <CardDescription>Configure sua assinatura digital para documentos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enable-signature" className="font-medium">
                    Ativar assinatura digital
                  </Label>
                  <p className="text-sm text-muted-foreground">Permitir assinatura digital em documentos.</p>
                </div>
                <Switch id="enable-signature" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label>Assinatura atual</Label>
                <div className="border rounded-md p-4 flex items-center justify-center bg-muted/20">
                  <div className="text-center">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="text-sm mt-2">João Silva</p>
                    <p className="text-xs text-muted-foreground">Assinado digitalmente</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signature-upload">Carregar nova assinatura</Label>
                <div className="flex items-center gap-2">
                  <Input id="signature-upload" type="file" className="hidden" />
                  <Button variant="outline" asChild>
                    <label htmlFor="signature-upload" className="cursor-pointer">
                      <Upload className="mr-2 h-4 w-4" />
                      Carregar imagem
                    </label>
                  </Button>
                  <p className="text-sm text-muted-foreground">Formatos aceitos: PNG, JPG (máx. 1MB)</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signature-text">Texto da assinatura</Label>
                <Input id="signature-text" placeholder="Seu nome completo" defaultValue="João Silva" />
                <p className="text-xs text-muted-foreground">
                  Este texto será exibido junto com sua assinatura digital.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signature-title">Título profissional</Label>
                <Input
                  id="signature-title"
                  placeholder="Seu título profissional"
                  defaultValue="Psicólogo - CRP 00/00000"
                />
                <p className="text-xs text-muted-foreground">
                  Este título será exibido abaixo do seu nome na assinatura.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="letterhead" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Papel Timbrado</CardTitle>
              <CardDescription>Configure o cabeçalho e rodapé para seus documentos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enable-letterhead" className="font-medium">
                    Ativar papel timbrado
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Adicionar cabeçalho e rodapé personalizados aos documentos.
                  </p>
                </div>
                <Switch id="enable-letterhead" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="header-content">Conteúdo do cabeçalho</Label>
                <Textarea
                  id="header-content"
                  placeholder="Digite o conteúdo do cabeçalho..."
                  defaultValue="João Silva - Psicólogo\nCRP: 00/00000\nEndereço: Av. Paulista, 1000, São Paulo - SP\nTel: (11) 98765-4321"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="footer-content">Conteúdo do rodapé</Label>
                <Textarea
                  id="footer-content"
                  placeholder="Digite o conteúdo do rodapé..."
                  defaultValue="www.joaosilva.com.br | contato@joaosilva.com.br\nTodos os direitos reservados © 2023"
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo-upload">Logo</Label>
                <div className="flex items-center gap-2">
                  <Input id="logo-upload" type="file" className="hidden" />
                  <Button variant="outline" asChild>
                    <label htmlFor="logo-upload" className="cursor-pointer">
                      <Upload className="mr-2 h-4 w-4" />
                      Carregar logo
                    </label>
                  </Button>
                  <p className="text-sm text-muted-foreground">Formatos aceitos: PNG, JPG (máx. 2MB)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? (
            "Salvando..."
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Salvar Configurações
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
