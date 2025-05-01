"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Trash2, Plus, CheckCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function ClientPaymentMethods() {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [deleteCardId, setDeleteCardId] = useState<string | null>(null)
  const [defaultCardId, setDefaultCardId] = useState("card-1")

  // Dados de exemplo - em uma aplicação real, estes viriam de uma API
  const paymentMethods = [
    {
      id: "card-1",
      type: "credit",
      name: "Mastercard terminado em 4567",
      expiry: "05/25",
      isDefault: true,
    },
    {
      id: "card-2",
      type: "credit",
      name: "Visa terminado em 1234",
      expiry: "12/24",
      isDefault: false,
    },
  ]

  const handleSetDefault = (id: string) => {
    setDefaultCardId(id)
    // Em uma aplicação real, você enviaria isso para a API
  }

  const handleDeleteCard = (id: string) => {
    setDeleteCardId(null)
    // Em uma aplicação real, você enviaria isso para a API
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Métodos de Pagamento</CardTitle>
            <CardDescription>Gerencie seus cartões e outras formas de pagamento</CardDescription>
          </div>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Método
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{method.name}</p>
                    <p className="text-sm text-muted-foreground">Expira em {method.expiry}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {method.isDefault ? (
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Padrão
                    </Badge>
                  ) : (
                    <Button variant="ghost" size="sm" onClick={() => handleSetDefault(method.id)}>
                      Definir como padrão
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => setDeleteCardId(method.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t bg-muted/50 px-6 py-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <CreditCard className="mr-2 h-4 w-4" />
            Seus dados de pagamento são armazenados de forma segura
          </div>
        </CardFooter>
      </Card>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Método de Pagamento</DialogTitle>
            <DialogDescription>Adicione um novo cartão ou outro método de pagamento à sua conta</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <RadioGroup defaultValue="credit" className="grid grid-cols-3 gap-4">
              <div>
                <RadioGroupItem value="credit" id="credit" className="peer sr-only" />
                <Label
                  htmlFor="credit"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <CreditCard className="mb-3 h-6 w-6" />
                  Cartão de Crédito
                </Label>
              </div>
            </RadioGroup>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome no Cartão</Label>
                  <Input id="name" placeholder="Nome completo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="number">Número do Cartão</Label>
                  <Input id="number" placeholder="XXXX XXXX XXXX XXXX" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="month">Mês</Label>
                  <Input id="month" placeholder="MM" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Ano</Label>
                  <Input id="year" placeholder="AA" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="CVC" />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setShowAddDialog(false)}>Salvar Método de Pagamento</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteCardId} onOpenChange={() => setDeleteCardId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover método de pagamento</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover este método de pagamento? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteCardId && handleDeleteCard(deleteCardId)}>
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
