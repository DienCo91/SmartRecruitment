'use client';

import * as React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import type { FieldError, FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form';

interface DatePickerFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  placeholder?: string;
  setValue: UseFormSetValue<TFieldValues>;
  value?: Date;
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
  const [date, setDate] = React.useState<Date | undefined>(value);

  const handleSelect = (selected?: Date) => {
    setDate(selected);
    if (selected) {
      setValue(name, selected as PathValue<TFieldValues, typeof name>, {
        shouldValidate: true,
      });
    }
  };

  return (
    <div className={cn('space-y-1.5', className)}>
      <label className="block text-sm font-bold">{label}</label>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground',
              classNameInput
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'dd/MM/yyyy') : placeholder}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            captionLayout="dropdown"
            defaultMonth={date ?? new Date(2000, 0)}
            disabled={day => day > new Date()}
          />
        </PopoverContent>
      </Popover>

      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
