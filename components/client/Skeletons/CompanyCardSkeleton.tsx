import { Skeleton } from '@/components/ui/skeleton';

export function CompanyCardSkeleton() {
  return (
    <div className="flex gap-4 rounded-xl bg-muted/10 p-4">
      <Skeleton className="size-20 rounded-lg" />

      <div className="flex flex-col justify-between flex-1">
        <div className="space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/3" />
        </div>

        <Skeleton className="mt-3 h-3 w-20" />
      </div>
    </div>
  );
}
