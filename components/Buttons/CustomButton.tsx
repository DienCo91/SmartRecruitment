import { cn } from '@/lib/utils';
import * as React from 'react';
import { Button } from '../ui/button';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children: string;
}

export function CustomButton({ startIcon, endIcon, className, children, ...props }: Props) {
  return (
    <div className="w-full">
      <Button
        {...props}
        className={cn(
          'flex items-center rounded-sm bg-transparent px-3 py-2 shadow-sm transition cursor-pointer text-gray-400 font-medium',
          className
        )}
      >
        {startIcon && <span className="mr-2 text-gray-400">{startIcon}</span>}
        {children}
        {endIcon && <span className="ml-2 text-gray-400">{endIcon}</span>}
      </Button>
    </div>
  );
}
