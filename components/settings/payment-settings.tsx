"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, BanknoteIcon as Bank } from "lucide-react"

const bankFormSchema = z.object({
  bankName: z.string().min(2, {
    message: "O nome do banco é obrigatório.",
  }),
  accountType: z.string(),
  agency: z.string().min(1, {
    message: "A agência é obrigatória.",
  }),
  account: z.string().min(1, {
    message: "O número da conta é obrigatório.",
  }),
  document: z.string().min(11, {
    message: "O CPF/CNPJ é obrigatório.",
  }),
})

const pixFormSchema = z.object({
  pixKeyType: z.string(),
  pixKey: z.string().min(1, {
    message: "A chave PIX é obrigatória.",
  }),
})

type BankFormValues = z.infer<typeof bankFormSchema>
type PixFormValues = z.infer<typeof pixFormSchema>

const defaultBankValues: Partial<BankFormValues> = {
  bankName: "Banco do Brasil",
  accountType: "checking",
  agency: "1234",
  account: "12345-6",
  document: "123.456.789-00",
}

const defaultPixValues: Partial<PixFormValues> = {
  pixKeyType: "cpf",
  pixKey: "123.456.789-00",
}

export function PaymentSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("bank")

  const bankForm = useForm<BankFormValues>({
    resolver: zodResolver(bankFormSchema),
    defaultValues: defaultBankValues,
    mode: "onChange",
  })

  const pixForm = useForm<PixFormValues>({
    resolver: zodResolver(pixFormSchema),
    defaultValues: defaultPixValues,
    mode: "onChange",
  })

  function onBankSubmit(data: BankFormValues) {
    setIsLoading(true)

    // Simulação de envio para API
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Dados bancários atualizados",
        description: "Seus dados bancários foram atualizados com sucesso.",
      })
    }, 1000)
  }

  function onPixSubmit(data: PixFormValues) {
    setIsLoading(true)

    // Simulação de envio para API
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Chave PIX atualizada",
        description: "Sua chave PIX foi atualizada com sucesso.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Método de recebimento</CardTitle>
          <CardDescription>Escolha como deseja receber seus pagamentos</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            defaultValue={paymentMethod}
            onValueChange={setPaymentMethod}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <RadioGroupItem value="bank" id="bank" className="peer sr-only" />
              <label
                htmlFor="bank"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <Bank className="mb-3 h-6 w-6" />
                <div className="space-y-1 text-center">
                  <p className="text-sm font-medium leading-none">Transferência Bancária</p>
                  <p className="text-sm text-muted-foreground">Receba via transferência bancária</p>
                </div>
              </label>
            </div>
            <div>
              <RadioGroupItem value="pix" id="pix" className="peer sr-only" />
              <label
                htmlFor="pix"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <CreditCard className="mb-3 h-6 w-6" />
                <div className="space-y-1 text-center">
                  <p className="text-sm font-medium leading-none">PIX</p>
                  <p className="text-sm text-muted-foreground">Receba via PIX</p>
                </div>
              </label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {paymentMethod === "bank" ? (
        <Card>
          <CardHeader>
            <CardTitle>Dados bancários</CardTitle>
            <CardDescription>Informe seus dados bancários para recebimento</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...bankForm}>
              <form onSubmit={bankForm.handleSubmit(onBankSubmit)} className="space-y-4">
                <FormField
                  control={bankForm.control}
                  name="bankName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Banco</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o banco" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Banco do Brasil">Banco do Brasil</SelectItem>
                          <SelectItem value="Bradesco">Bradesco</SelectItem>
                          <SelectItem value="Caixa Econômica">Caixa Econômica</SelectItem>
                          <SelectItem value="Itaú">Itaú</SelectItem>
                          <SelectItem value="Santander">Santander</SelectItem>
                          <SelectItem value="Nubank">Nubank</SelectItem>
                          <SelectItem value="Inter">Inter</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={bankForm.control}
                  name="accountType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de conta</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo de conta" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="checking">Conta Corrente</SelectItem>
                          <SelectItem value="savings">Conta Poupança</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={bankForm.control}
                    name="agency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Agência</FormLabel>
                        <FormControl>
                          <Input placeholder="0000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={bankForm.control}
                    name="account"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Conta</FormLabel>
                        <FormControl>
                          <Input placeholder="00000-0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={bankForm.control}
                  name="document"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF/CNPJ do titular</FormLabel>
                      <FormControl>
                        <Input placeholder="000.000.000-00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Salvando..." : "Salvar dados bancários"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Chave PIX</CardTitle>
            <CardDescription>Informe sua chave PIX para recebimento</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...pixForm}>
              <form onSubmit={pixForm.handleSubmit(onPixSubmit)} className="space-y-4">
                <FormField
                  control={pixForm.control}
                  name="pixKeyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de chave</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo de chave" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="cpf">CPF</SelectItem>
                          <SelectItem value="cnpj">CNPJ</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Telefone</SelectItem>
                          <SelectItem value="random">Chave aleatória</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={pixForm.control}
                  name="pixKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chave PIX</FormLabel>
                      <FormControl>
                        <Input placeholder="Informe sua chave PIX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Salvando..." : "Salvar chave PIX"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Configurações de pagamento</CardTitle>
          <CardDescription>Configure opções adicionais de pagamento</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-1.5">
            <h3 className="text-sm font-medium leading-none">Moeda padrão</h3>
            <Select defaultValue="BRL">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione a moeda" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BRL">Real Brasileiro (R$)</SelectItem>
                <SelectItem value="USD">Dólar Americano ($)</SelectItem>
                <SelectItem value="EUR">Euro (€)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col space-y-1.5">
            <h3 className="text-sm font-medium leading-none">Formato de data</h3>
            <Select defaultValue="dd/mm/yyyy">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione o formato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dd/mm/yyyy">DD/MM/AAAA</SelectItem>
                <SelectItem value="mm/dd/yyyy">MM/DD/AAAA</SelectItem>
                <SelectItem value="yyyy-mm-dd">AAAA-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
