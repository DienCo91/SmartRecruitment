import { cn } from '@/lib/utils';
import { BaseProps } from '@/types';

interface Props extends BaseProps {
  title: string;
  content: string;
}

export function JobContent({ title, content, className }: Props) {
  return (
    <div className={cn('mt-3 mr-2', className)}>
      <h3 className="mb-2 font-semibold">{title}</h3>
      <div className="text-sm" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
