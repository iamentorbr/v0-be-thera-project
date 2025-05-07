import { Check, Minus } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function PricingTable() {
  const features = [
    {
      name: "Clientes ativos",
      starter: "15",
      professional: "50",
      enterprise: "Ilimitados",
    },
    {
      name: "Agendamento de sessões",
      starter: true,
      professional: true,
      enterprise: true,
    },
    {
      name: "Lembretes automáticos",
      starter: false,
      professional: true,
      enterprise: true,
    },
    {
      name: "Compartilhamento de conteúdo",
      starter: true,
      professional: true,
      enterprise: true,
    },
    {
      name: "Diário do cliente",
      starter: true,
      professional: true,
      enterprise: true,
    },
    {
      name: "Exercícios terapêuticos",
      starter: true,
      professional: true,
      enterprise: true,
    },
    {
      name: "Videoconferência",
      starter: false,
      professional: "Em breve",
      enterprise: "Em breve",
    },
    {
      name: "Relatórios e análises",
      starter: "Básicos",
      professional: "Avançados",
      enterprise: "Completos",
    },
    {
      name: "Personalização de marca",
      starter: false,
      professional: "Limitada",
      enterprise: "Completa",
    },
    {
      name: "Múltiplos profissionais",
      starter: false,
      professional: false,
      enterprise: true,
    },
    {
      name: "Suporte prioritário",
      starter: false,
      professional: false,
      enterprise: true,
    },
    {
      name: "API para integrações",
      starter: false,
      professional: false,
      enterprise: true,
    },
  ]

  return (
    <div className="overflow-x-auto">
      <Table className="border rounded-lg">
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[300px]">Recurso</TableHead>
            <TableHead className="text-center">Iniciante</TableHead>
            <TableHead className="text-center">Profissional</TableHead>
            <TableHead className="text-center">Empresarial</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map((feature) => (
            <TableRow key={feature.name}>
              <TableCell className="font-medium">{feature.name}</TableCell>
              <TableCell className="text-center">
                {typeof feature.starter === "boolean" ? (
                  feature.starter ? (
                    <Check className="h-4 w-4 text-primary mx-auto" />
                  ) : (
                    <Minus className="h-4 w-4 text-muted-foreground mx-auto" />
                  )
                ) : (
                  feature.starter
                )}
              </TableCell>
              <TableCell className="text-center">
                {typeof feature.professional === "boolean" ? (
                  feature.professional ? (
                    <Check className="h-4 w-4 text-primary mx-auto" />
                  ) : (
                    <Minus className="h-4 w-4 text-muted-foreground mx-auto" />
                  )
                ) : (
                  feature.professional
                )}
              </TableCell>
              <TableCell className="text-center">
                {typeof feature.enterprise === "boolean" ? (
                  feature.enterprise ? (
                    <Check className="h-4 w-4 text-primary mx-auto" />
                  ) : (
                    <Minus className="h-4 w-4 text-muted-foreground mx-auto" />
                  )
                ) : (
                  feature.enterprise
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
