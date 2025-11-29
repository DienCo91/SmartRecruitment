import { AppImage } from '@/common';
import { LoadingCircle } from '@/components/Loadings/LoadingCircle';
import { Avatar as BaseAvatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { BaseProps } from '@/types';
import { useState, useEffect } from 'react';

interface Props extends BaseProps {
  src?: string;
  fallbackSrc: string;
  classNameImage?: string;
}

function AvatarBase({ src, fallbackSrc, className, classNameImage }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const imgSrc = hasError ? fallbackSrc : src || fallbackSrc;

  return (
    <BaseAvatar className={cn('border', className)}>
      {isLoading && (
        <AvatarFallback className="bg-gray-100 ">
          <LoadingCircle />
        </AvatarFallback>
      )}
      <AvatarImage
        src={imgSrc}
        alt="Avatar"
        className={cn(
          'object-contain bg-white',
          {
            'opacity-0': isLoading,
            'opacity-100': !isLoading,
          },
          classNameImage
        )}
        onLoad={handleLoad}
        onError={handleError}
      />
    </BaseAvatar>
  );
}

export function AvatarUser(props: Omit<Props, 'fallbackSrc'>) {
  return <AvatarBase {...props} fallbackSrc={AppImage.avatarFallback.src} />;
}

export function AvatarCompany(props: Omit<Props, 'fallbackSrc'>) {
  return <AvatarBase {...props} fallbackSrc={AppImage.logo.src} />;
}
