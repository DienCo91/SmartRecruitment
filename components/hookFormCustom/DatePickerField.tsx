'use client';

import * as React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { FieldError, FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form';

interface DatePickerFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  placeholder?: string;
  setValue: UseFormSetValue<TFieldValues>;
  value?: Date | null;
  error?: FieldError;
  classNameInput?: string;
  className?: string;
}

export function DatePickerField<TFieldValues extends FieldValues>({
  name,
  label,
  placeholder = 'Pick a date',
  setValue,
  value,
  error,
  classNameInput,
  className,
}: DatePickerFieldProps<TFieldValues>) {
  const [date, setDate] = React.useState<Date | undefined>(value ?? undefined);

  const handleSelect = (selected: Date | undefined) => {
    setDate(selected);
    if (selected) {
      setValue(name, selected as PathValue<TFieldValues, typeof name>, { shouldValidate: true });
    }
  };

  return (
    <div className={cn('space-y-1.5 ', className)}>
      <label className="block text-sm font-bold">{label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal bg-transparent hover:bg-transparent hover:text-white',
              !date && 'text-muted-foreground hover:text-muted-foreground',
              classNameInput
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-white hover:text-white" />
            {date ? format(date, 'dd/MM/yyyy') : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={date} onSelect={handleSelect} />
        </PopoverContent>
      </Popover>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}
