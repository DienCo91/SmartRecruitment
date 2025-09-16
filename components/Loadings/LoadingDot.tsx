'use client';

import { Size } from '@/constants';
import { cn } from '@/lib/utils';
import * as _ from 'lodash';
import { useMemo } from 'react';

interface Props {
  isFullscreen?: boolean;
  dotSize?: Size;
  dotColor?: string;
}

export function LoadingDot({
  isFullscreen = false,
  dotSize = Size.SM,
  dotColor = 'bg-blue-700',
}: Props) {
  const sizeDot = useMemo(() => {
    switch (dotSize) {
      case Size.XS:
        return 'size-[4px]';
      case Size.SM:
        return 'size-[8px]';
      case Size.MD:
        return 'size-[16px]';
      case Size.LG:
        return 'size-[24px]';
      case Size['2XL']:
        return 'size-[48px]';
    }
  }, [dotSize]);

  return (
    <div
      className={cn(
        'p-4 h-4 w-4 flex items-center justify-center bg-black/10',
        isFullscreen ? 'h-screen w-screen' : ''
      )}
    >
      <ul className="flex gap-2">
        {_.range(0, 3).map((_, i) => (
          <li
            key={i}
            className={cn(
              `rounded-full animate-[dot-bounce_1.4s_infinite] [animation-delay:${0.2 * i}s]`,
              dotColor,
              sizeDot
            )}
          />
        ))}
      </ul>
    </div>
  );
}
