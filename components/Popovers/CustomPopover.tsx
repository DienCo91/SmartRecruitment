import { BaseProps } from '@/types';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Props extends BaseProps {
  trigger: ReactNode;
  align?: 'start' | 'center' | 'end';
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CustomPopover({
  trigger,
  children,
  className,
  align = 'center',
  open,
  onOpenChange,
}: Props) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        align={align}
        className={cn('bg-[#384878] shadow-xs shadow-blue-400 border-none', className)}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}
