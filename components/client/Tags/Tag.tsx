import { cn } from '@/lib/utils';

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  content: string;
  active?: boolean;
}

export function Tag({ content, active = false, ...props }: Props) {
  return (
    <span
      {...props}
      className={cn(
        'bg-white/10 rounded-full px-2 py-2 mx-1 mb-2 text-xs hover:text-white hover:cursor-pointer',
        active ? 'text-white bg-white/30 shadow' : ''
      )}
    >
      {content}
    </span>
  );
}
