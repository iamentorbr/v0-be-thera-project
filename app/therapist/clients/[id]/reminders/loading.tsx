import { Skeleton } from "@/components/ui/skeleton"

export default function ClientRemindersLoading() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center space-x-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-10 w-56" />
      </div>
      <Skeleton className="h-[600px]" />
    </div>
  )
}
