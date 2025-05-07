import { Check, Minus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function PricingTable() {
  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableCaption>Comparativo detalhado dos planos disponíveis</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Recursos</TableHead>
            <TableHead>START</TableHead>
            <TableHead>
              Profissional{" "}
              <Badge variant="outline" className="ml-2 bg-yellow-500/20">
                Em Breve
              </Badge>
            </TableHead>
            <TableHead>
              Empresarial{" "}
              <Badge variant="outline" className="ml-2 bg-yellow-500/20">
                Em Breve
              </Badge>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Preço mensal</TableCell>
            <TableCell>
              R$ 57{" "}
              <Badge variant="outline" className="ml-2">
                Promocional 12 meses
              </Badge>
              <br />
              <span className="text-sm text-muted-foreground">(depois R$ 97)</span>
            </TableCell>
            <TableCell>R$ 99</TableCell>
            <TableCell>R$ 199</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Clientes ativos</TableCell>
            <TableCell>Até 15</TableCell>
            <TableCell>Até 50</TableCell>
            <TableCell>Ilimitados</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Agendamento de sessões</TableCell>
            <TableCell>Básico</TableCell>
            <TableCell>Avançado</TableCell>
            <TableCell>Avançado</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Compartilhamento de conteúdo</TableCell>
            <TableCell>
              <Check className="h-4 w-4 text-primary" />
            </TableCell>
            <TableCell>
              <Check className="h-4 w-4 text-primary" />
            </TableCell>
            <TableCell>
              <Check className="h-4 w-4 text-primary" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Diário do cliente</TableCell>
            <TableCell>
              <Check className="h-4 w-4 text-primary" />
            </TableCell>
            <TableCell>
              <Check className="h-4 w-4 text-primary" />
            </TableCell>
            <TableCell>
              <Check className="h-4 w-4 text-primary" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Exercícios terapêuticos</TableCell>
            <TableCell>
              <Check className="h-4 w-4 text-primary" />
            </TableCell>
            <TableCell>
              <Check className="h-4 w-4 text-primary" />
            </TableCell>
            <TableCell>
              <Check className="h-4 w-4 text-primary" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Lembretes automáticos</TableCell>
            <TableCell>
              <Check className="h-4 w-4 text-primary" />
            </TableCell>
            <TableCell>
              <Check className="h-4 w-4 text-primary" />
            </TableCell>
            <TableCell>
              <Check className="h-4 w-4 text-primary" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Relatórios e análises</TableCell>
            <TableCell>Básicos</TableCell>
            <TableCell>Intermediários</TableCell>
            <TableCell>Avançados</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Videoconferência integrada</TableCell>
            <TableCell>
              <Badge variant="outline" className="bg-yellow-500/20">
                Em Breve
              </Badge>
            </TableCell>
            <TableCell>
              <Check className="h-4 w-4 text-primary" />
            </TableCell>
            <TableCell>
              <Check className="h-4 w-4 text-primary" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Personalização de marca</TableCell>
            <TableCell>
              <Badge variant="outline" className="bg-yellow-500/20">
                Em Breve
              </Badge>
            </TableCell>
            <TableCell>Limitada</TableCell>
            <TableCell>Completa</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Múltiplos profissionais</TableCell>
            <TableCell>
              <Minus className="h-4 w-4 text-muted-foreground" />
            </TableCell>
            <TableCell>
              <Minus className="h-4 w-4 text-muted-foreground" />
            </TableCell>
            <TableCell>
              <Check className="h-4 w-4 text-primary" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Integração com calendários</TableCell>
            <TableCell>
              <Badge variant="outline" className="bg-yellow-500/20">
                Em Breve
              </Badge>
            </TableCell>
            <TableCell>
              <Check className="h-4 w-4 text-primary" />
            </TableCell>
            <TableCell>
              <Check className="h-4 w-4 text-primary" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Suporte</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Email e Chat</TableCell>
            <TableCell>Prioritário</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Período de teste</TableCell>
            <TableCell>15 dias</TableCell>
            <TableCell>15 dias</TableCell>
            <TableCell>15 dias</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
