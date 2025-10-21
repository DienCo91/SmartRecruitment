import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export function LoadingCircle({ className }: Props) {
  return (
    <div className={cn('w-full text-center', className)}>
      <span className="inline-block size-6 border-2 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
