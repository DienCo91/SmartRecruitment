'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

export interface InputSearchRef {
  getValue: () => string;
  setValue: (val: string) => void;
}

const InputSearch = forwardRef<InputSearchRef>((props, ref) => {
  const [value, setValue] = useState('');

  useImperativeHandle(ref, () => ({
    getValue: () => value,
    setValue: (val: string) => setValue(val),
  }));

  return (
    <div className="flex items-center px-3 flex-1 ">
      <Search className="text-blue-primary mr-2" size={18} />
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Job title, keyword..."
        className="border-none shadow-none focus-visible:ring-0"
      />
    </div>
  );
});

InputSearch.displayName = 'InputSearch';

export default InputSearch;
