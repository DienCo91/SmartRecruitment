import { Skeleton } from '@/components/ui/skeleton';

export function JobCardSkeleton() {
  return (
    <div className="rounded-xl bg-muted/10 p-3 my-2">
      <div className="flex gap-4">
        <Skeleton className="size-14 rounded-md" />

        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />

          <div className="flex gap-3">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>

        <Skeleton className="h-6 w-16 rounded-full" />
      </div>

      <Skeleton className="my-4 h-px w-full" />

      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-32 rounded-full" />
        <div className="flex gap-2">
          <Skeleton className="size-9 rounded-md" />
          <Skeleton className="h-9 w-28 rounded-md" />
        </div>
      </div>
    </div>
  );
}
