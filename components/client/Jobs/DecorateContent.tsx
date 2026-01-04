import { cn } from '@/lib/utils';
import { BaseProps } from '@/types';

interface Props extends BaseProps {
  title?: string;
  content: string;
}

export function DecorateContent({ title, content, className }: Props) {
  return (
    <div className={cn('mt-3 mr-2', className)}>
      {title && <h3 className="mb-2 font-semibold">{title}</h3>}
      <div
        className="max-w-none whitespace-normal break-words quill-render"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
