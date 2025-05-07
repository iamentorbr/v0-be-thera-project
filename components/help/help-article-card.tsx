import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export interface HelpArticle {
  id: string
  title: string
  description: string
  category: string
  url: string
}

interface HelpArticleCardProps {
  article: HelpArticle
}

export function HelpArticleCard({ article }: HelpArticleCardProps) {
  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">{article.title}</CardTitle>
        <CardDescription>{article.category}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{article.description}</p>
      </CardContent>
      <CardFooter>
        <Link href={article.url} className="flex items-center gap-1 text-sm font-medium text-primary">
          Ler artigo
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  )
}
