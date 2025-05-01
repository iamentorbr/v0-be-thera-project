import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ScheduleLoading() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-[150px]" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-10 w-[150px]" />
            <Skeleton className="h-10 w-[150px]" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex space-x-2">
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[100px]" />
          </div>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-6 w-[200px]" />
                  <Skeleton className="h-8 w-8" />
                </div>
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-8 w-[80px]" />
                  <Skeleton className="h-8 w-[80px]" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {/* Cabeçalho dos dias da semana */}
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="text-center p-2">
                    <Skeleton className="h-4 w-12 mx-auto mb-2" />
                    <Skeleton className="h-8 w-8 rounded-full mx-auto" />
                  </div>
                ))}

                {/* Grade de horários */}
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={`grid-${i}`} className="border rounded-md h-[500px] overflow-y-auto">
                    {Array.from({ length: 12 }).map((_, j) => (
                      <div key={`time-${i}-${j}`} className="p-1 border-b">
                        <Skeleton className="h-4 w-10 mb-1" />
                        {j % 3 === 0 && <Skeleton className="h-16 w-full rounded-md mt-1" />}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
