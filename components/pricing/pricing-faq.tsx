import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function PricingFaq() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
      <AccordionItem value="item-1">
        <AccordionTrigger>Como funciona o período de teste gratuito?</AccordionTrigger>
        <AccordionContent>
          Todos os planos incluem 15 dias de teste gratuito. Durante esse período, você terá acesso completo a todas as
          funcionalidades do plano escolhido. Não é necessário fornecer dados de pagamento para iniciar o teste. Você só
          será cobrado se decidir continuar após o período de teste.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Como funciona a oferta promocional de R$ 57?</AccordionTrigger>
        <AccordionContent>
          A oferta promocional de lançamento garante o valor de R$ 57/mês por 12 meses para o plano START. Após esse
          período, o valor será ajustado automaticamente para o preço regular (R$ 97/mês). Novos assinantes após o
          período promocional pagarão o valor regular desde o início.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Posso mudar de plano depois?</AccordionTrigger>
        <AccordionContent>
          Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. Se você estiver no plano
          promocional START e fizer upgrade, não poderá voltar ao preço promocional posteriormente. Ao fazer downgrade
          de um plano superior para o START, você pagará o valor vigente no momento da mudança.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>Quais formas de pagamento são aceitas?</AccordionTrigger>
        <AccordionContent>
          Aceitamos cartões de crédito (Visa, Mastercard, American Express), boleto bancário e PIX. Para pagamentos via
          boleto, é necessário um pagamento antecipado de 3 meses. Pagamentos via PIX têm 5% de desconto adicional.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>Quando os planos Profissional e Empresarial estarão disponíveis?</AccordionTrigger>
        <AccordionContent>
          Os planos Profissional e Empresarial estão em desenvolvimento e serão lançados nos próximos meses. Assinantes
          do plano START terão prioridade e condições especiais para upgrade quando estes planos estiverem disponíveis.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger>Posso cancelar minha assinatura a qualquer momento?</AccordionTrigger>
        <AccordionContent>
          Sim, você pode cancelar sua assinatura a qualquer momento sem taxas adicionais. O acesso à plataforma
          permanecerá ativo até o final do período pago. Não fazemos reembolsos proporcionais para períodos parciais.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-7">
        <AccordionTrigger>O que acontece com meus dados se eu cancelar?</AccordionTrigger>
        <AccordionContent>
          Após o cancelamento, seus dados permanecerão armazenados por 30 dias, permitindo que você reative sua conta
          sem perder informações. Após esse período, os dados serão anonimizados conforme nossa política de privacidade.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-8">
        <AccordionTrigger>Quais novas implementações estão previstas?</AccordionTrigger>
        <AccordionContent>
          Estamos trabalhando em diversas melhorias, incluindo: integração com calendários externos, personalização de
          marca, videoconferência integrada, gráficos de progresso, modelos de exercícios, suporte a anexos e histórico
          de versões. Assinantes do plano START promocional terão acesso a todas essas funcionalidades sem custo
          adicional.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
