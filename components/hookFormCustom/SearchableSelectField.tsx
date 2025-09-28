'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type {
  FieldError,
  FieldValues,
  Path,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

interface SelectFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  placeholder?: string;
  options: string[];
  register: UseFormRegister<TFieldValues>;
  setValue: UseFormSetValue<TFieldValues>;
  error?: FieldError;
  className?: string;
  classNameInput?: string;
}

export function SearchableSelectField<TFieldValues extends FieldValues>({
  name,
  label,
  placeholder = 'Select...',
  options,
  setValue,
  error,
  className,
  classNameInput,
}: SelectFieldProps<TFieldValues>) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string | null>(null);

  return (
    <div className={cn('space-y-1.5 w-full', className)}>
      <label htmlFor={name} className="block text-sm font-bold">
        {label}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              'w-full flex justify-between items-center border rounded-md px-3 py-2 text-sm',
              classNameInput
            )}
          >
            {selected ? selected : placeholder}
            <ChevronsUpDown className="h-4 w-4 opacity-50" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup className="max-h-[200px] overflow-y-scroll w-[400px]">
              {options.map(opt => (
                <CommandItem
                  key={opt.replace(/\s+/g, '-').toLowerCase()}
                  value={opt}
                  onSelect={() => {
                    setSelected(opt);
                    setValue(name, opt as PathValue<TFieldValues, typeof name>, {
                      shouldValidate: true,
                    });
                    setOpen(false);
                  }}
                >
                  {opt}
                  {selected === opt && <Check className="ml-auto h-4 w-4" />}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}
