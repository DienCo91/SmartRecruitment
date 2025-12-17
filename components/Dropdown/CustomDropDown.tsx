import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BaseProps } from '@/types';
import { ReactNode } from 'react';

interface Props extends BaseProps {
  trigger: ReactNode;
  align?: 'start' | 'center' | 'end';
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CustomDropDown({
  trigger,
  children,
  className,
  align = 'center',
  open,
  onOpenChange,
}: Props) {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align={align} className={className}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
