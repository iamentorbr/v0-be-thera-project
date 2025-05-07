import Link from "next/link"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface PricingCardProps {
  name: string
  price: {
    monthly: string
    annually: string
  }
  description: string
  features: string[]
  limitations?: string[]
  ctaText: string
  ctaLink: string
  trialDays?: number
  popular?: boolean
  promotionalInfo?: string
  comingSoon?: boolean
}

export function PricingCard({
  name,
  price,
  description,
  features,
  limitations,
  ctaText,
  ctaLink,
  trialDays,
  popular = false,
  promotionalInfo,
  comingSoon = false,
}: PricingCardProps) {
  return (
    <Card className={`flex flex-col ${popular ? "border-primary shadow-lg scale-105 relative" : ""}`}>
      {popular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
          Oferta Especial
        </Badge>
      )}
      {comingSoon && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-yellow-950">
          Em Breve
        </Badge>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-4">
          <div className="text-3xl font-bold">{price.annually}</div>
          <div className="text-sm text-muted-foreground">por mês</div>
          {promotionalInfo && <div className="mt-1 text-sm text-amber-600 font-medium">{promotionalInfo}</div>}
          {trialDays && <div className="mt-2 text-sm font-medium text-primary">{trialDays} dias de teste grátis</div>}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-4">
          <div className="space-y-2">
            {features.map((feature) => (
              <div key={feature} className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
            {limitations &&
              limitations.map((limitation) => (
                <div key={limitation} className="flex items-center text-muted-foreground">
                  <X className="mr-2 h-4 w-4" />
                  <span className="text-sm">{limitation}</span>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {!comingSoon ? (
          <Link href={ctaLink} className="w-full">
            <Button variant={popular ? "default" : "outline"} className="w-full">
              {ctaText}
            </Button>
          </Link>
        ) : (
          <Button variant="outline" className="w-full" disabled>
            Em Breve
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
