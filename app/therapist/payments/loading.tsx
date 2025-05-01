import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PaymentsLoading() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <Skeleton className="h-8 w-36" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-36" />
          </div>
        </div>

        {/* Resumo financeiro skeleton */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    <Skeleton className="h-4 w-24" />
                  </CardTitle>
                  <Skeleton className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-24 mb-1" />
                  <Skeleton className="h-3 w-32" />
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Tabs skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-10 w-96" />

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-72" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                {Array(8)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
