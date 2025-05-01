import { Skeleton } from "@/components/ui/skeleton"
import { SettingsNav } from "@/components/settings/settings-nav"

export default function IntegrationsLoading() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72 mt-2" />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <SettingsNav />
        </div>
        <div className="flex-1">
          <div className="mb-6">
            <Skeleton className="h-7 w-36" />
            <Skeleton className="h-4 w-64 mt-2" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-[400px] w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}
