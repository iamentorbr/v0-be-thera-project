"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { HelpCircle, X, MessageSquare, BookOpen } from "lucide-react"
import Link from "next/link"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface FloatingHelpButtonProps {
  userType: "therapist" | "client"
}

export function FloatingHelpButton({ userType }: FloatingHelpButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const helpPath = userType === "therapist" ? "/therapist/help" : "/client/help"

  const faqPath = `${helpPath}/faq`
  const contactPath = `${helpPath}/contact`

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg" size="icon">
          {isOpen ? <X className="h-5 w-5" /> : <HelpCircle className="h-5 w-5" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end" alignOffset={-20}>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Precisa de ajuda?</h3>
            <p className="text-sm text-muted-foreground">Escolha uma das opções abaixo para obter suporte.</p>
          </div>

          <div className="grid gap-2">
            <Link
              href={faqPath}
              className="flex items-center gap-2 rounded-md border p-3 text-sm transition-colors hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <HelpCircle className="h-4 w-4" />
              </div>
              <div>
                <div className="font-medium">Perguntas Frequentes</div>
                <div className="text-xs text-muted-foreground">Encontre respostas para dúvidas comuns</div>
              </div>
            </Link>

            <Link
              href={contactPath}
              className="flex items-center gap-2 rounded-md border p-3 text-sm transition-colors hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MessageSquare className="h-4 w-4" />
              </div>
              <div>
                <div className="font-medium">Contatar Suporte</div>
                <div className="text-xs text-muted-foreground">Envie uma mensagem para nossa equipe</div>
              </div>
            </Link>

            <Link
              href={helpPath}
              className="flex items-center gap-2 rounded-md border p-3 text-sm transition-colors hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <BookOpen className="h-4 w-4" />
              </div>
              <div>
                <div className="font-medium">Centro de Ajuda</div>
                <div className="text-xs text-muted-foreground">Explore todos os recursos de suporte</div>
              </div>
            </Link>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
