import { AppImage } from '@/common';
import { cn } from '@/lib/utils';
import { BaseProps } from '@/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Props extends BaseProps {
  src: string;
  fallback?: string;
  alt: string;
  classNameImage?: string;
}

export function CustomImage({
  src,
  alt,
  fallback = AppImage.avatarFallback.src,
  className,
  classNameImage,
}: Props) {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  return (
    <div
      className={cn(
        'relative h-20 w-20 overflow-hidden rounded-md bg-white/80 shadow-sm shadow-blue-900',
        className
      )}
    >
      <Image src={fallback} alt="fallback" fill className="object-cover" priority />

      {!error && src && (
        <Image
          src={src}
          alt={alt}
          fill
          className={cn('object-cover transition-opacity duration-300', classNameImage)}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}
