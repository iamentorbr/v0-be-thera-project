"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, Sparkles, Clock } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function PromotionalPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Verificar se o pop-up já foi mostrado antes
    const hasSeenPopup = localStorage.getItem("bethera-promo-popup-seen")

    if (!hasSeenPopup) {
      // Mostrar o pop-up após 3 segundos
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    // Marcar que o usuário já viu o pop-up
    localStorage.setItem("bethera-promo-popup-seen", "true")

    // Resetar após 24 horas para mostrar novamente
    setTimeout(
      () => {
        localStorage.removeItem("bethera-promo-popup-seen")
      },
      24 * 60 * 60 * 1000,
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <div className="absolute right-4 top-4 z-10">
          <Button variant="ghost" size="icon" onClick={handleClose} className="h-8 w-8 rounded-full">
            <X className="h-4 w-4" />
            <span className="sr-only">Fechar</span>
          </Button>
        </div>

        {/* Banner superior */}
        <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5" />
              <Badge variant="secondary" className="text-xs font-bold">
                Oferta de Lançamento
              </Badge>
            </div>
            <DialogTitle className="text-2xl sm:text-3xl font-bold">Preço Especial por Tempo Limitado!</DialogTitle>
            <DialogDescription className="text-primary-foreground/90 mt-2">
              Aproveite nossa oferta de lançamento e garanta condições exclusivas.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Conteúdo */}
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">
                  De <span className="line-through">R$ 97</span> por apenas
                </div>
                <div className="text-4xl font-bold text-primary">
                  R$ 57<span className="text-lg font-normal">/mês</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">Garantido por 12 meses</div>
              </div>
            </div>

            <ul className="space-y-2 mt-4">
              <li className="flex items-start gap-2">
                <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Acesso a todas as funcionalidades do plano START</span>
              </li>
              <li className="flex items-start gap-2">
                <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Acesso a novas implementações sem custo adicional</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>15 dias de teste gratuito, sem compromisso</span>
              </li>
            </ul>
          </div>

          <DialogFooter className="mt-6 flex-col sm:flex-col gap-2">
            <Link href="/register?plan=start&promo=launch" className="w-full">
              <Button size="lg" className="w-full">
                Garantir Oferta Especial
              </Button>
            </Link>
            <Link href="/pricing" className="w-full">
              <Button variant="outline" size="lg" className="w-full">
                Ver Detalhes dos Planos
              </Button>
            </Link>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
