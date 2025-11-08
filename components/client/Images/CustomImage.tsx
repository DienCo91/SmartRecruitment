import { cn } from '@/lib/utils';
import { BaseProps } from '@/types';
import Image from 'next/image';

interface Props extends BaseProps {
  src: string;
  alt: string;
}

export function CustomImage({ src, alt, className }: Props) {
  return (
    <div
      className={cn(
        'w-20 h-20 relative rounded-md overflow-hidden bg-white/80 shadow-sm shadow-blue-900',
        className
      )}
    >
      <Image
        src={
          src ||
          'https://cdn-new.topcv.vn/unsafe/80x/https://static.topcv.vn/company_logos/UdiO7Pguf3akX65drUOKRz0N5dcyKWWr_1737604772____3a6bc78024143aefa7a42eaf3e57e674.png'
        }
        alt={alt || 'Image optimized'}
        fill
        className={'object-contain p-1'}
      />
    </div>
  );
}
