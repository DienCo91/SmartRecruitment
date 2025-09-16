import { AppImage } from '@/common';
import { Avatar as BaseAvatar, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { BaseProps } from '@/types';

interface Props extends BaseProps {
  src?: string;
}

export function Avatar({ src, className }: Props) {
  return (
    <BaseAvatar className={cn('border', className)}>
      <AvatarImage src={src || AppImage.avatarFallback.src} />
    </BaseAvatar>
  );
}
