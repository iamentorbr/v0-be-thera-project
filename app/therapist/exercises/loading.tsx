import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function ExercisesLoading() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <Skeleton className="h-10 w-[150px]" />
          <Skeleton className="h-10 w-[150px]" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-10 w-[300px]" />

          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-8 w-[250px]" />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-[200px]" />
                      <Skeleton className="h-4 w-[150px]" />
                    </div>
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Skeleton className="h-5 w-[80px] rounded-full" />
                    <Skeleton className="h-5 w-[80px] rounded-full" />
                    <Skeleton className="h-5 w-[80px] rounded-full" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  <Skeleton className="h-4 w-[120px]" />
                  <Skeleton className="h-4 w-[100px]" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
