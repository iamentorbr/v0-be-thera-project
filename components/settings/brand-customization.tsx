"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Trash2, Upload, Eye } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function BrandCustomization() {
  const [primaryColor, setPrimaryColor] = useState("#7C3AED")
  const [secondaryColor, setSecondaryColor] = useState("#C4B5FD")
  const [accentColor, setAccentColor] = useState("#4F46E5")
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("colors")
  const [borderRadius, setBorderRadius] = useState([8])
  const [enableCustomBranding, setEnableCustomBranding] = useState(true)

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Verificar tamanho do arquivo (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "O tamanho máximo permitido é 2MB.",
          variant: "destructive",
        })
        return
      }

      // Verificar tipo do arquivo
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Formato inválido",
          description: "Por favor, envie apenas arquivos de imagem.",
          variant: "destructive",
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        setLogoPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeLogo = () => {
    setLogoPreview(null)
  }

  const saveCustomizations = () => {
    setIsLoading(true)

    // Simulação de envio para API
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Personalização salva",
        description: "Suas configurações de marca foram atualizadas com sucesso.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Personalização de Marca</h3>
          <p className="text-sm text-muted-foreground">Personalize cores e logo para manter sua identidade visual</p>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="enable-branding" checked={enableCustomBranding} onCheckedChange={setEnableCustomBranding} />
          <Label htmlFor="enable-branding">Ativar personalização</Label>
        </div>
      </div>

      {enableCustomBranding ? (
        <>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="colors">Cores</TabsTrigger>
              <TabsTrigger value="logo">Logo</TabsTrigger>
              <TabsTrigger value="preview">Visualização</TabsTrigger>
            </TabsList>

            <TabsContent value="colors" className="space-y-4 pt-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="primary-color">Cor Primária</Label>
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-md border" style={{ backgroundColor: primaryColor }} />
                    <Input
                      id="primary-color"
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="h-10 w-20"
                    />
                    <Input
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-32"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="secondary-color">Cor Secundária</Label>
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-md border" style={{ backgroundColor: secondaryColor }} />
                    <Input
                      id="secondary-color"
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="h-10 w-20"
                    />
                    <Input
                      type="text"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-32"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="accent-color">Cor de Destaque</Label>
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-md border" style={{ backgroundColor: accentColor }} />
                    <Input
                      id="accent-color"
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="h-10 w-20"
                    />
                    <Input
                      type="text"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-32"
                    />
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="border-radius">Arredondamento de Bordas</Label>
                    <span className="text-sm text-muted-foreground">{borderRadius[0]}px</span>
                  </div>
                  <Slider
                    id="border-radius"
                    min={0}
                    max={20}
                    step={1}
                    value={borderRadius}
                    onValueChange={setBorderRadius}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="logo" className="space-y-4 pt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid gap-6">
                    <div className="flex flex-col items-center justify-center gap-4">
                      {logoPreview ? (
                        <div className="relative">
                          <img
                            src={logoPreview || "/placeholder.svg"}
                            alt="Logo preview"
                            className="h-32 w-auto object-contain"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute -right-2 -top-2 h-8 w-8 rounded-full"
                            onClick={removeLogo}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex h-32 w-64 flex-col items-center justify-center rounded-lg border-2 border-dashed">
                          <Upload className="mb-2 h-10 w-10 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Arraste e solte ou clique para fazer upload</p>
                        </div>
                      )}

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="logo-upload" className="cursor-pointer">
                          <div className="flex items-center gap-2">
                            <Upload className="h-4 w-4" />
                            <span>Fazer upload de logo</span>
                          </div>
                        </Label>
                        <Input
                          id="logo-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                        />
                        <p className="text-xs text-muted-foreground">
                          Formatos aceitos: PNG, JPG, SVG. Tamanho máximo: 2MB.
                        </p>
                      </div>
                    </div>

                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Sua logo será exibida nas áreas visíveis aos clientes, como portal do cliente, documentos e
                        emails.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preview" className="space-y-4 pt-4">
              <div className="grid gap-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Visualização</h3>
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    Visualizar como cliente
                  </Button>
                </div>

                <div className="rounded-md border">
                  <div
                    className="flex items-center gap-2 rounded-t-md p-4"
                    style={{ backgroundColor: primaryColor, color: "#ffffff" }}
                  >
                    {logoPreview && (
                      <img src={logoPreview || "/placeholder.svg"} alt="Logo" className="h-8 w-auto object-contain" />
                    )}
                    <h3 className="font-medium">Portal do Cliente</h3>
                  </div>
                  <div className="p-4">
                    <div className="mb-4 space-y-2">
                      <h4 className="text-sm font-medium">Próxima Sessão</h4>
                      <div
                        className="rounded-md p-3"
                        style={{
                          backgroundColor: secondaryColor,
                          borderRadius: `${borderRadius[0]}px`,
                        }}
                      >
                        <p className="text-sm">Terapia Cognitivo-Comportamental</p>
                        <p className="text-xs text-muted-foreground">Quinta-feira, 10:00</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Ações</h4>
                      <div className="flex gap-2">
                        <Button
                          style={{
                            backgroundColor: accentColor,
                            borderRadius: `${borderRadius[0]}px`,
                          }}
                          className="text-white"
                        >
                          Agendar
                        </Button>
                        <Button variant="outline" style={{ borderRadius: `${borderRadius[0]}px` }}>
                          Ver exercícios
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline">Restaurar padrão</Button>
            <Button onClick={saveCustomizations} disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar personalização"}
            </Button>
          </div>
        </>
      ) : (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            A personalização de marca está desativada. Ative-a para personalizar cores e logo.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
