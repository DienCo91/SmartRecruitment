import { Skeleton } from '@/components/ui/skeleton';

export function CompanyOpenPositionSkeleton() {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-muted/10 p-4">
      <div className="flex items-center gap-4">
        <Skeleton className="h-14 w-14 rounded-lg shrink-0" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />

          <div className="flex gap-4">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </div>

      <Skeleton className="h-9 w-32 rounded-md" />
    </div>
  );
}
