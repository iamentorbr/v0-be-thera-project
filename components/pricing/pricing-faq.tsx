"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function PricingFaq() {
  const faqs = [
    {
      question: "Posso mudar de plano a qualquer momento?",
      answer:
        "Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças entram em vigor imediatamente, e o valor será ajustado proporcionalmente ao tempo restante do seu ciclo de cobrança atual.",
    },
    {
      question: "Como funciona o período de teste gratuito?",
      answer:
        "Todos os planos incluem um período de teste gratuito de 14 dias. Durante esse período, você terá acesso a todos os recursos do plano escolhido. Não é necessário fornecer informações de pagamento para iniciar o teste. Você só será cobrado se decidir continuar após o período de teste.",
    },
    {
      question: "Quais formas de pagamento são aceitas?",
      answer:
        "Aceitamos cartões de crédito (Visa, Mastercard, American Express), boleto bancário e PIX. Para o plano Empresarial, também oferecemos a opção de faturamento mensal.",
    },
    {
      question: "Posso cancelar minha assinatura a qualquer momento?",
      answer:
        "Sim, você pode cancelar sua assinatura a qualquer momento através do painel de controle da sua conta. Não há taxas de cancelamento. Após o cancelamento, você continuará tendo acesso aos recursos do seu plano até o final do ciclo de cobrança atual.",
    },
    {
      question: "O que acontece se eu exceder o limite de clientes do meu plano?",
      answer:
        "Se você se aproximar do limite de clientes do seu plano, enviaremos uma notificação sugerindo um upgrade. Se exceder o limite, você poderá continuar gerenciando os clientes existentes, mas não poderá adicionar novos até fazer um upgrade ou remover alguns clientes.",
    },
    {
      question: "Vocês oferecem descontos para ONGs ou instituições educacionais?",
      answer:
        "Sim, oferecemos descontos especiais para organizações sem fins lucrativos, instituições educacionais e grupos de estudantes. Entre em contato com nossa equipe de vendas para mais informações.",
    },
  ]

  return (
    <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
