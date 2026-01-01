import { Skeleton } from '@/components/ui/skeleton';

export function BlogCardPrimarySkeleton() {
  return (
    <div className="flex gap-5 rounded-xl bg-muted/10 p-5">
      <Skeleton className="h-36 w-56 rounded-lg shrink-0" />

      <div className="flex flex-1 flex-col justify-between">
        <div className="space-y-3">
          <div className="flex gap-4">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-20" />
          </div>

          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="h-5 w-3/5" />

          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-11/12" />
          <Skeleton className="h-3 w-5/6" />
        </div>
      </div>
    </div>
  );
}
