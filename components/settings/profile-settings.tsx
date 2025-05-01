"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Upload } from "lucide-react"

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  profession: z.string().min(2, {
    message: "A profissão deve ter pelo menos 2 caracteres.",
  }),
  specialization: z.string().optional(),
  bio: z.string().max(500, {
    message: "A biografia não pode ter mais de 500 caracteres.",
  }),
  education: z.string().optional(),
  experience: z.string().optional(),
  website: z.string().url({ message: "URL inválida" }).optional().or(z.literal("")),
  phone: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const defaultValues: Partial<ProfileFormValues> = {
  name: "João Silva",
  profession: "Psicólogo",
  specialization: "Terapia Cognitivo-Comportamental",
  bio: "Psicólogo com mais de 10 anos de experiência em terapia cognitivo-comportamental, especializado em tratamento de ansiedade e depressão.",
  education: "Mestrado em Psicologia Clínica - Universidade Federal",
  experience: "10 anos",
  website: "https://joaosilva.com.br",
  phone: "(11) 98765-4321",
}

export function ProfileSettings() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: ProfileFormValues) {
    setIsLoading(true)

    // Simulação de envio para API
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Perfil atualizado",
        description: "Suas informações de perfil foram atualizadas com sucesso.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src="/placeholder-user.jpg" alt="João Silva" />
          <AvatarFallback>JS</AvatarFallback>
        </Avatar>
        <div>
          <Button variant="outline" size="sm" className="mb-2">
            <Upload className="mr-2 h-4 w-4" />
            Alterar foto
          </Button>
          <p className="text-sm text-muted-foreground">JPG, PNG ou GIF. Tamanho máximo de 2MB.</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profissão</FormLabel>
                  <FormControl>
                    <Input placeholder="Sua profissão" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specialization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Especialização</FormLabel>
                  <FormControl>
                    <Input placeholder="Sua especialização" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Anos de experiência</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1-3">1-3 anos</SelectItem>
                      <SelectItem value="4-6">4-6 anos</SelectItem>
                      <SelectItem value="7-10">7-10 anos</SelectItem>
                      <SelectItem value="10+">Mais de 10 anos</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Biografia</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Conte um pouco sobre você e sua prática profissional"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Esta biografia será exibida publicamente em seu perfil.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="education"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Formação acadêmica</FormLabel>
                <FormControl>
                  <Textarea placeholder="Descreva sua formação acadêmica" className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone de contato</FormLabel>
                  <FormControl>
                    <Input placeholder="(00) 00000-0000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : "Salvar alterações"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
