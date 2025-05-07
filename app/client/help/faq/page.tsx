import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FAQAccordion } from "@/components/help/faq-accordion"

export const metadata: Metadata = {
  title: "Perguntas Frequentes | Centro de Ajuda | BeTHERA",
  description: "Encontre respostas para as perguntas mais comuns sobre a plataforma BeTHERA.",
}

// Dados de exemplo para FAQs
const faqs = [
  {
    question: "Como confirmar uma sessão agendada pelo meu terapeuta?",
    answer:
      "Quando seu terapeuta agendar uma sessão, você receberá uma notificação por email e no aplicativo. Para confirmar, acesse a seção 'Sessões' no menu lateral e encontre a sessão pendente. Clique no botão 'Confirmar' para aceitar o horário proposto. Você também pode confirmar diretamente pelo link enviado no email de notificação.",
    category: "Sessões",
  },
  {
    question: "Como reagendar ou cancelar uma sessão?",
    answer:
      "Para reagendar ou cancelar uma sessão, acesse a seção 'Sessões' e encontre a sessão desejada. Clique no botão 'Opções' (três pontos) e selecione 'Solicitar Reagendamento' ou 'Cancelar'. Você precisará fornecer um motivo para o cancelamento ou sugerir novos horários para reagendamento. Seu terapeuta será notificado e poderá aprovar a solicitação.",
    category: "Sessões",
  },
  {
    question: "Como realizar um pagamento na plataforma?",
    answer:
      "Para realizar um pagamento, acesse a seção 'Pagamentos' no menu lateral. Você verá todas as faturas pendentes. Clique em 'Pagar' na fatura desejada e selecione o método de pagamento preferido (cartão de crédito, boleto, etc.). Siga as instruções para completar o pagamento. Após a confirmação, você receberá um recibo por email.",
    category: "Pagamentos",
  },
  {
    question: "Como adicionar ou alterar métodos de pagamento?",
    answer:
      "Para gerenciar seus métodos de pagamento, vá até 'Configurações' > 'Pagamentos'. Clique em 'Adicionar Método de Pagamento' para incluir um novo cartão ou conta. Para alterar um método existente, selecione-o e clique em 'Editar'. Você pode definir um método como padrão para pagamentos automáticos ou remover métodos que não deseja mais utilizar.",
    category: "Pagamentos",
  },
  {
    question: "Como participar de uma sessão por videoconferência?",
    answer:
      "Para participar de uma videoconferência, acesse a seção 'Sessões' e encontre a sessão agendada. Próximo ao horário marcado, um botão 'Entrar na Sala' ficará disponível. Clique nele para acessar a sala virtual. Certifique-se de permitir o acesso ao microfone e câmera quando solicitado pelo navegador. A videoconferência funciona diretamente no navegador, sem necessidade de instalar aplicativos adicionais.",
    category: "Videoconferência",
  },
  {
    question: "Como acessar conteúdos e exercícios compartilhados pelo meu terapeuta?",
    answer:
      "Para acessar conteúdos compartilhados, vá até a seção 'Conteúdo' ou 'Exercícios' no menu lateral. Lá você encontrará todos os materiais que seu terapeuta compartilhou com você, organizados por data ou categoria. Clique em qualquer item para visualizá-lo. Você pode marcar itens como concluídos, fazer anotações pessoais e, em alguns casos, enviar respostas ou feedback para seu terapeuta.",
    category: "Conteúdo",
  },
  {
    question: "Como atualizar minhas informações pessoais?",
    answer:
      "Para atualizar suas informações, acesse 'Configurações' > 'Perfil'. Você pode editar seu nome, foto, informações de contato e preferências de notificação. Certifique-se de manter seus dados atualizados, especialmente seu email e telefone, para garantir que você receba todas as comunicações importantes do seu terapeuta e da plataforma.",
    category: "Conta",
  },
  {
    question: "Como registrar meu progresso e experiências entre sessões?",
    answer:
      "Para registrar seu progresso, utilize a seção 'Minha Jornada' no menu lateral. Este é um espaço privado onde você pode fazer anotações sobre seus pensamentos, sentimentos e experiências entre as sessões. Você pode criar entradas diárias, registrar padrões de humor e comportamento, e marcar insights importantes para discutir na próxima sessão com seu terapeuta.",
    category: "Jornada",
  },
  {
    question: "Como garantir a privacidade das minhas informações na plataforma?",
    answer:
      "A BeTHERA utiliza criptografia de ponta a ponta para proteger suas informações. Apenas você e seu terapeuta têm acesso aos seus dados. Para aumentar a segurança, recomendamos usar uma senha forte, ativar a autenticação de dois fatores em 'Configurações' > 'Segurança' e sempre fazer logout ao usar dispositivos compartilhados. Você também pode revisar e ajustar suas configurações de privacidade a qualquer momento.",
    category: "Privacidade",
  },
]

const categories = ["Sessões", "Pagamentos", "Videoconferência", "Conteúdo", "Conta", "Jornada", "Privacidade"]

export default function ClientFAQPage() {
  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/client/help">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Voltar ao Centro de Ajuda
          </Link>
        </Button>
      </div>

      <div className="my-8 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Perguntas Frequentes</h1>
        <p className="text-xl text-muted-foreground">
          Encontre respostas para as perguntas mais comuns sobre a plataforma BeTHERA.
        </p>
      </div>

      <FAQAccordion faqs={faqs} categories={categories} />

      <div className="mt-12 rounded-lg border bg-muted/50 p-6 text-center">
        <h3 className="mb-2 text-lg font-medium">Não encontrou o que procurava?</h3>
        <p className="mb-4 text-muted-foreground">
          Entre em contato com nossa equipe de suporte para obter ajuda personalizada.
        </p>
        <Button asChild>
          <Link href="/client/help/contact">Contatar Suporte</Link>
        </Button>
      </div>
    </div>
  )
}
