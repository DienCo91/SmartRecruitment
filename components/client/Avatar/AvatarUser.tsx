import { AppImage } from '@/common';
import { Avatar as BaseAvatar, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { BaseProps } from '@/types';

interface Props extends BaseProps {
  src?: string;
  fallbackSrc: string;
}

function AvatarBase({ src, fallbackSrc, className }: Props) {
  return (
    <BaseAvatar className={cn('border', className)}>
      <AvatarImage src={src || fallbackSrc} className="object-contain bg-white" />
    </BaseAvatar>
  );
}

export function AvatarUser(props: Omit<Props, 'fallbackSrc'>) {
  return <AvatarBase {...props} fallbackSrc={AppImage.avatarFallback.src} />;
}

export function AvatarCompany(props: Omit<Props, 'fallbackSrc'>) {
  return <AvatarBase {...props} fallbackSrc={AppImage.logo.src} />;
}
