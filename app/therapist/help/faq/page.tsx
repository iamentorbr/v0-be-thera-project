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
    question: "Como adicionar um novo cliente à minha lista?",
    answer:
      "Para adicionar um novo cliente, acesse a seção 'Clientes' no menu lateral e clique no botão '+ Novo Cliente'. Preencha as informações necessárias como nome, email e telefone. Você também pode enviar um convite diretamente para o email do cliente, permitindo que ele crie sua própria conta vinculada à sua.",
    category: "Clientes",
  },
  {
    question: "Como agendar uma sessão com um cliente?",
    answer:
      "Para agendar uma sessão, vá até a seção 'Sessões' e clique em '+ Nova Sessão'. Selecione o cliente, a data, o horário e a duração da sessão. Você também pode adicionar notas sobre a sessão e configurar lembretes automáticos. O cliente receberá uma notificação e poderá confirmar a sessão através da plataforma.",
    category: "Sessões",
  },
  {
    question: "Como criar anotações durante ou após uma sessão?",
    answer:
      "Para criar anotações, acesse a seção 'Anotações' e clique em '+ Nova Anotação'. Selecione o cliente relacionado e comece a escrever suas observações. O editor de texto permite formatação, listas e destaque de informações importantes. Suas anotações são privadas e só podem ser vistas por você, a menos que você opte por compartilhar partes específicas com o cliente.",
    category: "Anotações",
  },
  {
    question: "Como configurar pagamentos na plataforma?",
    answer:
      "Para configurar pagamentos, vá até 'Configurações' > 'Pagamentos'. Você pode conectar sua conta bancária ou serviços como PayPal para receber pagamentos. Defina seus valores de sessão, políticas de cancelamento e opções de pagamento (à vista, pacotes, assinaturas). Você pode gerar faturas automaticamente após as sessões ou manualmente conforme necessário.",
    category: "Pagamentos",
  },
  {
    question: "Como compartilhar exercícios ou conteúdos com meus clientes?",
    answer:
      "Para compartilhar conteúdo, acesse a seção 'Biblioteca de Conteúdo' ou 'Exercícios'. Você pode criar novos materiais ou selecionar da biblioteca existente. Clique em 'Compartilhar' no item desejado, selecione o cliente e defina por quanto tempo o conteúdo ficará disponível. O cliente receberá uma notificação e poderá acessar o material em sua própria conta.",
    category: "Conteúdo",
  },
  {
    question: "Como realizar uma sessão por videoconferência?",
    answer:
      "Para iniciar uma videoconferência, vá até a sessão agendada na seção 'Sessões' e clique em 'Iniciar Videoconferência'. A plataforma abrirá a sala virtual automaticamente e enviará uma notificação ao cliente. Não é necessário instalar software adicional, pois a videoconferência funciona diretamente no navegador com áudio e vídeo de alta qualidade.",
    category: "Videoconferência",
  },
  {
    question: "Como personalizar meu perfil profissional?",
    answer:
      "Para personalizar seu perfil, acesse 'Configurações' > 'Perfil'. Você pode adicionar sua foto, informações de contato, especialidades, formação acadêmica e uma biografia profissional. Também é possível personalizar como seu perfil aparece para os clientes e definir suas áreas de atuação. Um perfil completo ajuda a transmitir profissionalismo e confiança.",
    category: "Conta",
  },
  {
    question: "Como exportar dados de sessões ou relatórios?",
    answer:
      "Para exportar dados, acesse a seção relevante (Sessões, Anotações, Pagamentos) e procure o botão 'Exportar' ou o ícone de download. Você pode escolher o formato (PDF, CSV, Excel) e o período desejado. Os relatórios podem incluir histórico de sessões, resumos financeiros ou progresso dos clientes, dependendo da seção.",
    category: "Geral",
  },
  {
    question: "Como integrar meu calendário externo (Google, Outlook)?",
    answer:
      "Para integrar calendários externos, vá até 'Configurações' > 'Integrações'. Selecione o serviço desejado (Google Calendar, Outlook, etc.) e siga as instruções para autorizar a conexão. Após a integração, suas sessões na plataforma serão sincronizadas automaticamente com seu calendário externo, evitando conflitos de agendamento.",
    category: "Integrações",
  },
  {
    question: "Como configurar lembretes automáticos para clientes?",
    answer:
      "Para configurar lembretes, acesse 'Configurações' > 'Lembretes'. Você pode definir quando os lembretes serão enviados (24h antes, 1h antes, etc.), o método de envio (email, SMS, notificação no app) e personalizar o conteúdo das mensagens. É possível criar diferentes modelos de lembretes para diferentes tipos de sessões ou clientes.",
    category: "Sessões",
  },
]

const categories = [
  "Clientes",
  "Sessões",
  "Anotações",
  "Pagamentos",
  "Conteúdo",
  "Videoconferência",
  "Conta",
  "Geral",
  "Integrações",
]

export default function TherapistFAQPage() {
  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/therapist/help">
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
          <Link href="/therapist/help/contact">Contatar Suporte</Link>
        </Button>
      </div>
    </div>
  )
}
