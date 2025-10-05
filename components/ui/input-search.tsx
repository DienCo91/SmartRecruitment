'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import React, { forwardRef, useImperativeHandle, useState, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface InputSearchRef {
  getValue: () => string;
  setValue: (val: string) => void;
}

interface InputSearchProps extends InputHTMLAttributes<HTMLInputElement> {
  inputClassName?: string;
  iconClassName?: string;
}

const InputSearch = forwardRef<InputSearchRef, InputSearchProps>(
  ({ className, inputClassName, iconClassName, ...rest }, ref) => {
    const [value, setValue] = useState('');

    useImperativeHandle(ref, () => ({
      getValue: () => value,
      setValue: (val: string) => setValue(val),
    }));

    return (
      <div className={cn('flex items-center px-3 flex-1', className)}>
        <Search className={cn('text-blue-primary mr-2', iconClassName)} size={18} />
        <Input
          value={value}
          onChange={e => setValue(e.target.value)}
          className={cn('border-none shadow-none focus-visible:ring-0', inputClassName)}
          {...rest}
        />
      </div>
    );
  }
);

InputSearch.displayName = 'InputSearch';

export default InputSearch;
