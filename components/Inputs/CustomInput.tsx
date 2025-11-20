import { cn } from '@/lib/utils';
import * as React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  error?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export function CustomInput({ ref, startIcon, endIcon, error, className, ...props }: Props) {
  return (
    <div className="w-full">
      <div
        className={cn(
          'flex text-neutral-300 items-center rounded-sm border bg-white/20 px-3 py-2 shadow-sm transition focus-within:ring-1 focus-within:ring-blue-500',
          error ? 'border-red-500' : 'border-gray-300',
          className
        )}
      >
        {startIcon && <span className="mr-2 text-gray-400">{startIcon}</span>}

        <input
          {...props}
          ref={ref}
          className="flex-1 w-full bg-transparent outline-none placeholder-gray-400 text-sm"
        />

        {endIcon && <span className="ml-2 text-gray-400">{endIcon}</span>}
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
