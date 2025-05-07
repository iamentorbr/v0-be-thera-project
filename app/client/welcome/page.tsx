"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function ClientWelcomePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      setLoading(true)
      // Simulate saving data
      setTimeout(() => {
        setLoading(false)
        router.push("/client/dashboard")
      }, 1500)
    }
  }

  return (
    <div className="container flex min-h-screen flex-col items-center justify-center py-10">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-8 flex justify-center">
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  i < step
                    ? "bg-primary text-primary-foreground"
                    : i === step
                      ? "border-2 border-primary"
                      : "border-2 border-muted"
                }`}
              >
                {i < step ? <Check className="h-4 w-4" /> : i}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Bem-vindo ao BETHERA!</CardTitle>
                <CardDescription>
                  Estamos felizes em tê-lo conosco. Vamos configurar seu perfil para melhorar sua experiência.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input id="name" placeholder="Seu nome completo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" placeholder="(00) 00000-0000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birth-date">Data de nascimento</Label>
                  <Input id="birth-date" type="date" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleNext}>
                  Próximo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Preferências de Comunicação</CardTitle>
                <CardDescription>Configure como você prefere receber comunicações e lembretes.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Como você prefere receber lembretes de sessão?</Label>
                  <RadioGroup defaultValue="email-whatsapp">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="email" />
                      <Label htmlFor="email">Apenas por e-mail</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="whatsapp" id="whatsapp" />
                      <Label htmlFor="whatsapp">Apenas por WhatsApp</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email-whatsapp" id="email-whatsapp" />
                      <Label htmlFor="email-whatsapp">E-mail e WhatsApp</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label>Com quanto tempo de antecedência você gostaria de receber lembretes?</Label>
                  <RadioGroup defaultValue="24h">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1h" id="1h" />
                      <Label htmlFor="1h">1 hora antes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3h" id="3h" />
                      <Label htmlFor="3h">3 horas antes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="24h" id="24h" />
                      <Label htmlFor="24h">24 horas antes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="48h" id="48h" />
                      <Label htmlFor="48h">48 horas antes</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleNext}>
                  Próximo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Tudo pronto!</CardTitle>
                <CardDescription>
                  Seu perfil está configurado e você está pronto para começar a usar a plataforma.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-muted p-4">
                  <h3 className="mb-2 font-medium">O que você pode fazer agora:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Ver suas próximas sessões</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Agendar novas sessões</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Gerenciar seus pagamentos</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleNext} disabled={loading}>
                  {loading ? "Finalizando..." : "Ir para o Dashboard"}
                </Button>
              </CardFooter>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  )
}
