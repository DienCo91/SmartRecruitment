import { Skeleton } from '@/components/ui/skeleton';

export function BlogCardSkeleton() {
  return (
    <div className="flex gap-4 rounded-xl bg-muted/10 p-4">
      <div className="flex flex-1 flex-col justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-11/12" />
        </div>
      </div>

      <Skeleton className="size-28 rounded-lg shrink-0" />
    </div>
  );
}
