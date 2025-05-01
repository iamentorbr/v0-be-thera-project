import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function NoteDetailLoading() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-8 w-[200px] ml-2" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[100px]" />
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <Skeleton className="h-6 w-[250px]" />
                  <div className="flex items-center mt-2 space-x-2">
                    <Skeleton className="h-5 w-[100px]" />
                    <Skeleton className="h-5 w-[80px]" />
                  </div>
                </div>
                <div className="text-right">
                  <Skeleton className="h-5 w-[150px]" />
                  <Skeleton className="h-4 w-[120px] mt-1" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Skeleton className="h-4 w-full mt-4" />
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-3/4 mt-2" />

              <div className="flex flex-wrap gap-1 mt-6">
                <Skeleton className="h-5 w-[60px]" />
                <Skeleton className="h-5 w-[70px]" />
                <Skeleton className="h-5 w-[80px]" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
