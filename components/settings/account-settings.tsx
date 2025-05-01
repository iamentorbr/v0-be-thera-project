"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const accountFormSchema = z.object({
  email: z.string().email({
    message: "Por favor, insira um email válido.",
  }),
})

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: "A senha deve ter pelo menos 8 caracteres.",
    }),
    newPassword: z.string().min(8, {
      message: "A senha deve ter pelo menos 8 caracteres.",
    }),
    confirmPassword: z.string().min(8, {
      message: "A senha deve ter pelo menos 8 caracteres.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })

type AccountFormValues = z.infer<typeof accountFormSchema>
type PasswordFormValues = z.infer<typeof passwordFormSchema>

const defaultAccountValues: Partial<AccountFormValues> = {
  email: "joao.silva@exemplo.com",
}

export function AccountSettings() {
  const [isEmailLoading, setIsEmailLoading] = useState(false)
  const [isPasswordLoading, setIsPasswordLoading] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  const accountForm = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: defaultAccountValues,
    mode: "onChange",
  })

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  })

  function onEmailSubmit(data: AccountFormValues) {
    setIsEmailLoading(true)

    // Simulação de envio para API
    setTimeout(() => {
      setIsEmailLoading(false)
      toast({
        title: "Email atualizado",
        description: "Seu email foi atualizado com sucesso.",
      })
    }, 1000)
  }

  function onPasswordSubmit(data: PasswordFormValues) {
    setIsPasswordLoading(true)

    // Simulação de envio para API
    setTimeout(() => {
      setIsPasswordLoading(false)
      passwordForm.reset()
      toast({
        title: "Senha atualizada",
        description: "Sua senha foi atualizada com sucesso.",
      })
    }, 1000)
  }

  function onTwoFactorToggle(checked: boolean) {
    setTwoFactorEnabled(checked)

    toast({
      title: checked ? "Autenticação de dois fatores ativada" : "Autenticação de dois fatores desativada",
      description: checked ? "Sua conta agora está mais segura." : "A autenticação de dois fatores foi desativada.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email</CardTitle>
          <CardDescription>Atualize seu endereço de email</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...accountForm}>
            <form onSubmit={accountForm.handleSubmit(onEmailSubmit)} className="space-y-4">
              <FormField
                control={accountForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="seu.email@exemplo.com" {...field} />
                    </FormControl>
                    <FormDescription>Este é o email usado para login e notificações.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isEmailLoading}>
                {isEmailLoading ? "Atualizando..." : "Atualizar email"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alterar senha</CardTitle>
          <CardDescription>Atualize sua senha para manter sua conta segura</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha atual</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nova senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar nova senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPasswordLoading}>
                {isPasswordLoading ? "Atualizando..." : "Atualizar senha"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Autenticação de dois fatores</CardTitle>
          <CardDescription>Adicione uma camada extra de segurança à sua conta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Switch id="two-factor" checked={twoFactorEnabled} onCheckedChange={onTwoFactorToggle} />
            <div className="space-y-1">
              <label
                htmlFor="two-factor"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Ativar autenticação de dois fatores
              </label>
              <p className="text-sm text-muted-foreground">
                Receba um código de verificação por SMS ou aplicativo autenticador ao fazer login.
              </p>
            </div>
          </div>
          {twoFactorEnabled && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Importante</AlertTitle>
              <AlertDescription>
                Você precisará configurar um aplicativo autenticador como Google Authenticator ou Authy.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sessões ativas</CardTitle>
          <CardDescription>Gerencie os dispositivos conectados à sua conta</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Chrome em Windows</p>
                <p className="text-sm text-muted-foreground">São Paulo, Brasil • Ativo agora</p>
              </div>
              <Button variant="outline" size="sm">
                Este dispositivo
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Safari em iPhone</p>
                <p className="text-sm text-muted-foreground">São Paulo, Brasil • Última atividade: 2 horas atrás</p>
              </div>
              <Button variant="outline" size="sm">
                Encerrar
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="destructive">Encerrar todas as outras sessões</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Excluir conta</CardTitle>
          <CardDescription>Exclua permanentemente sua conta e todos os seus dados</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Aviso</AlertTitle>
            <AlertDescription>
              Esta ação é irreversível. Todos os seus dados serão permanentemente excluídos.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <Button variant="destructive">Excluir minha conta</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
