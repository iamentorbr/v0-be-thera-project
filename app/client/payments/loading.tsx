import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-4 w-[300px] mt-2" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array(4)
            .fill(null)
            .map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-[120px]" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-6 w-[80px] mb-2" />
                  <Skeleton className="h-4 w-[100px]" />
                </CardContent>
              </Card>
            ))}
        </div>

        <div className="flex gap-2 mt-6">
          {Array(3)
            .fill(null)
            .map((_, i) => (
              <Skeleton key={i} className="h-10 w-[100px]" />
            ))}
        </div>

        <Card className="mt-6">
          <CardHeader>
            <Skeleton className="h-5 w-[150px]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
