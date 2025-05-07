import Link from "next/link"
import type { Metadata } from "next"
import { MoonStar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PricingToggle } from "@/components/pricing/pricing-toggle"
import { PricingCard } from "@/components/pricing/pricing-card"
import { PricingTable } from "@/components/pricing/pricing-table"
import { PricingFaq } from "@/components/pricing/pricing-faq"

export const metadata: Metadata = {
  title: "Planos e Preços | BETHERA",
  description: "Escolha o plano ideal para sua prática de bem-estar e comece a transformar seu atendimento hoje mesmo.",
}

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <MoonStar className="h-6 w-6" />
              <span className="font-bold">BETHERA</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Entrar
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Cadastrar</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Oferta Especial de Lançamento
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Aproveite o valor promocional de lançamento e garanta 12 meses de acesso com preço especial.
                </p>
              </div>
              <PricingToggle />
              <div className="mt-8 max-w-[800px] p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <p className="text-sm md:text-base font-medium text-primary">
                  <span className="font-bold">Oferta Especial de Lançamento:</span> Adquira o plano START por apenas R$
                  57/mês e mantenha esse valor por 12 meses! Após o período promocional e implementação de novos
                  recursos, o plano START passará a custar R$ 97/mês para novos assinantes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              <PricingCard
                name="START"
                price={{ monthly: "R$ 57", annually: "R$ 57" }}
                description="Valor promocional de lançamento. Garanta esse preço por 12 meses!"
                features={[
                  "Até 15 clientes ativos",
                  "Agendamento básico",
                  "Compartilhamento de conteúdo",
                  "Diário do cliente",
                  "Exercícios terapêuticos",
                  "Acesso a todas as novas implementações",
                ]}
                limitations={["Sem videoconferência", "Sem personalização de marca"]}
                ctaText="Garantir Preço Promocional"
                ctaLink="/register?plan=start"
                trialDays={15}
                popular={true}
                promotionalInfo="Após 12 meses, o valor será R$ 97/mês"
              />
              <PricingCard
                name="Profissional"
                price={{ monthly: "R$ 99", annually: "R$ 79" }}
                description="Perfeito para profissionais estabelecidos que buscam crescimento."
                features={[
                  "Até 50 clientes ativos",
                  "Agendamento avançado",
                  "Compartilhamento de conteúdo",
                  "Diário do cliente",
                  "Exercícios terapêuticos",
                  "Lembretes automáticos",
                  "Relatórios básicos",
                ]}
                limitations={["Personalização de marca limitada"]}
                ctaText="Escolher Plano Profissional"
                ctaLink="/register?plan=professional"
                trialDays={15}
                comingSoon={true}
              />
              <PricingCard
                name="Empresarial"
                price={{ monthly: "R$ 199", annually: "R$ 159" }}
                description="Para clínicas e grupos de terapeutas com necessidades avançadas."
                features={[
                  "Clientes ilimitados",
                  "Agendamento avançado",
                  "Compartilhamento de conteúdo",
                  "Diário do cliente",
                  "Exercícios terapêuticos",
                  "Lembretes automáticos",
                  "Relatórios avançados",
                  "Personalização de marca completa",
                  "Múltiplos profissionais",
                  "Suporte prioritário",
                ]}
                ctaText="Contatar Vendas"
                ctaLink="/contact-sales"
                trialDays={15}
                comingSoon={true}
              />
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Compare os Recursos</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Veja em detalhes o que cada plano oferece para encontrar a opção perfeita para você.
                </p>
              </div>
            </div>
            <PricingTable />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Perguntas Frequentes</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Tire suas dúvidas sobre os planos e preços da plataforma BETHERA.
                </p>
              </div>
            </div>
            <PricingFaq />
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Garanta Já o Preço Promocional!</h2>
                <p className="max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Apenas R$ 57/mês por 12 meses + 15 dias de teste gratuito. Oferta por tempo limitado.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register">
                  <Button size="lg" variant="secondary" className="gap-1">
                    Garantir Oferta Especial
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/20"
                  >
                    Falar com Consultor
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 BETHERA. Todos os direitos reservados.
          </p>
          <div className="flex items-center space-x-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Termos
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacidade
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
