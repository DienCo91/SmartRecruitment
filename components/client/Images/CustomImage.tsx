import { LoadingCircle } from '@/components/Loadings/LoadingCircle';
import { IMAGE_EMPTY } from '@/constants';
import { cn } from '@/lib/utils';
import { BaseProps } from '@/types';
import Image from 'next/image';
import { useState } from 'react';

interface Props extends BaseProps {
  src: string;
  fallback?: string;
  alt: string;
  classNameImage?: string;
}

export function CustomImage({ src, alt, className, classNameImage }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(src || IMAGE_EMPTY);

  const handleError = () => {
    if (currentSrc !== IMAGE_EMPTY) {
      setCurrentSrc(IMAGE_EMPTY);
    } else {
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    console.log('1', 1);
    setIsLoading(false);
  };

  return (
    <div
      className={cn(
        'w-20 h-20 relative rounded-md overflow-hidden bg-white/80 shadow-sm shadow-blue-900',
        className
      )}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingCircle />
        </div>
      )}
      <Image
        src={currentSrc}
        alt={alt || 'Image optimized'}
        fill
        className={cn(
          'object-contain transition-opacity duration-300',
          {
            'opacity-0': isLoading,
            'opacity-100': !isLoading,
          },
          classNameImage
        )}
        onLoadingComplete={handleLoad}
        onError={handleError}
      />
    </div>
  );
}
