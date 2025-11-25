import { AppImage } from '@/common';
import { cn } from '@/lib/utils';
import { BaseProps } from '@/types';
import Image from 'next/image';
import { useState } from 'react';

interface Props extends BaseProps {
  src: string;
  fallback?: string;
  alt: string;
  imageClassName?: string;
}

export function CustomImage({ src, alt, fallback, className, imageClassName }: Props) {
  const [imgSrc, setImgSrc] = useState<string>(src);

  return (
    <div
      className={cn(
        'w-20 h-20 relative rounded-md overflow-hidden bg-white/80 shadow-sm shadow-blue-900',
        className
      )}
    >
      <Image
        src={imgSrc}
        alt={alt || 'Image optimized'}
        onError={() => setImgSrc(fallback || AppImage.fallback.companyFallback.src)}
        fill
        className={cn('object-cover p-0', imageClassName)}
      />
    </div>
  );
}
