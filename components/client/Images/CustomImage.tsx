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
          'https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-blank-avatar-modern-vector-png-image_40962406.jpg'
        }
        alt={alt || 'Image optimized'}
        fill
        className={'object-contain p-1'}
      />
    </div>
  );
}
