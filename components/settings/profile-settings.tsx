"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"
import { Upload, X } from "lucide-react"

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, insira um email válido.",
  }),
  phone: z.string().min(10, {
    message: "Por favor, insira um número de telefone válido.",
  }),
  bio: z.string().max(500, {
    message: "A biografia não pode ter mais de 500 caracteres.",
  }),
  specialties: z.string().max(200, {
    message: "As especialidades não podem ter mais de 200 caracteres.",
  }),
  education: z.string().max(200, {
    message: "A formação não pode ter mais de 200 caracteres.",
  }),
  website: z
    .string()
    .url({
      message: "Por favor, insira uma URL válida.",
    })
    .optional()
    .or(z.literal("")),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const defaultValues: Partial<ProfileFormValues> = {
  name: "Dr. João Silva",
  email: "joao.silva@bethera.com",
  phone: "(11) 98765-4321",
  bio: "Psicólogo clínico com mais de 10 anos de experiência em terapia cognitivo-comportamental.",
  specialties: "Ansiedade, Depressão, Estresse",
  education: "Doutorado em Psicologia Clínica - USP",
  website: "https://drjoaosilva.com.br",
}

export function ProfileSettings() {
  const [avatar, setAvatar] = useState<string | null>("/letter-b-abstract.png")

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "Perfil atualizado",
      description: "Suas informações de perfil foram atualizadas com sucesso.",
    })
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setAvatar(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  function removeAvatar() {
    setAvatar(null)
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex flex-col items-center sm:flex-row sm:items-start sm:space-x-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={avatar || ""} alt="Avatar" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                {avatar && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground"
                    onClick={removeAvatar}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="mt-4 sm:mt-0 flex flex-col space-y-3">
                <h4 className="text-sm font-medium">Foto de Perfil</h4>
                <p className="text-sm text-muted-foreground">
                  Esta foto será exibida em seu perfil e para seus clientes.
                </p>
                <div>
                  <Label htmlFor="avatar" className="cursor-pointer">
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <Upload className="h-4 w-4" />
                      <span>Carregar imagem</span>
                    </div>
                  </Label>
                  <Input id="avatar" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Informações Pessoais</h4>
                <Separator />
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu nome completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="seu.email@exemplo.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input placeholder="(00) 00000-0000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input placeholder="https://seusite.com.br" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Perfil Profissional</h4>
                <Separator />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Biografia</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Conte um pouco sobre você e sua experiência profissional..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="specialties"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Especialidades</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Ansiedade, Depressão, Estresse" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="education"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Formação</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Mestrado em Psicologia - UFRJ" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit">Salvar Alterações</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
