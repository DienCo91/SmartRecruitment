import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export function LoadingCircle({ className }: Props) {
  return (
    <div className={cn('flex items-center justify-center w-full h-full', className)}>
      <span className="inline-block size-6 border-2 border-t-transparent border-gray-400 rounded-full animate-spin" />
    </div>
  );
}
