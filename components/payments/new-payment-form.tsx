"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

// Dados de exemplo para clientes
const clients = [
  { id: "1", name: "Maria Oliveira" },
  { id: "2", name: "João Silva" },
  { id: "3", name: "Ana Santos" },
  { id: "4", name: "Carlos Mendes" },
  { id: "5", name: "Fernanda Lima" },
  { id: "6", name: "Roberto Alves" },
  { id: "7", name: "Luciana Costa" },
  { id: "8", name: "Pedro Souza" },
]

// Dados de exemplo para serviços
const services = [
  { id: "1", name: "Consulta Inicial", value: "250.00" },
  { id: "2", name: "Sessão de Terapia", value: "200.00" },
  { id: "3", name: "Sessão de Coaching", value: "300.00" },
  { id: "4", name: "Avaliação Psicológica", value: "350.00" },
  { id: "5", name: "Terapia em Grupo", value: "150.00" },
]

// Métodos de pagamento
const paymentMethods = [
  { id: "credit", name: "Cartão de Crédito" },
  { id: "debit", name: "Cartão de Débito" },
  { id: "pix", name: "PIX" },
  { id: "transfer", name: "Transferência Bancária" },
  { id: "cash", name: "Dinheiro" },
  { id: "boleto", name: "Boleto Bancário" },
]

export function NewPaymentForm() {
  const { toast } = useToast()
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined)
  const [selectedService, setSelectedService] = useState("")
  const [amount, setAmount] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Atualiza o valor quando um serviço é selecionado
  const handleServiceChange = (value: string) => {
    setSelectedService(value)
    const service = services.find((s) => s.id === value)
    if (service) {
      setAmount(service.value)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulando envio do formulário
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Pagamento criado com sucesso",
        description: "O pagamento foi registrado e o cliente será notificado.",
      })
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Novo Pagamento</CardTitle>
          <CardDescription>
            Crie um novo pagamento para um cliente. O cliente será notificado por email.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client">Cliente</Label>
              <Select required>
                <SelectTrigger id="client">
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="service">Serviço</Label>
              <Select value={selectedService} onValueChange={handleServiceChange} required>
                <SelectTrigger id="service">
                  <SelectValue placeholder="Selecione um serviço" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name} - R$ {Number.parseFloat(service.value).toFixed(2).replace(".", ",")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Valor (R$)</Label>
              <Input
                id="amount"
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0,00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Data de Vencimento</Label>
              <DatePicker
                date={dueDate}
                setDate={setDueDate}
                placeholder="Selecione uma data"
                setDate={setDueDate}
                placeholder="Selecione uma data"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Método de Pagamento</Label>
              <Select required>
                <SelectTrigger id="paymentMethod">
                  <SelectValue placeholder="Selecione um método" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method.id} value={method.id}>
                      {method.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue="pending" required>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Selecione um status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="paid">Pago</SelectItem>
                  <SelectItem value="overdue">Atrasado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição (opcional)</Label>
            <Textarea id="description" placeholder="Detalhes adicionais sobre este pagamento..." rows={3} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button">
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Criando..." : "Criar Pagamento"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
