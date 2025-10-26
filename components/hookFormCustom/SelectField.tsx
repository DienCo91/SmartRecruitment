'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type {
  FieldError,
  FieldValues,
  Path,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  placeholder?: string;
  options: Option[];
  register: UseFormRegister<TFieldValues>;
  setValue: UseFormSetValue<TFieldValues>;
  error?: FieldError;
  className?: string;
  classNameInput?: string;
  value: string;
}

export function SelectField<TFieldValues extends FieldValues>({
  name,
  label,
  placeholder = 'Select...',
  options,
  register,
  setValue,
  className,
  classNameInput,
  error,
  value,
}: SelectFieldProps<TFieldValues>) {
  return (
    <div className={cn('space-y-1.5 w-full ', className)}>
      <label htmlFor={name} className="block text-sm font-bold ">
        {label}
      </label>
      <Select
        {...register(name)}
        onValueChange={val =>
          setValue(name, val as PathValue<TFieldValues, typeof name>, { shouldValidate: true })
        }
        value={value}
      >
        <SelectTrigger
          className={cn(
            'w-full data-[placeholder]:text-white/40 ',
            classNameInput,
            error && 'py-[18px]'
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(opt => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-red-500 text-sm ">{error.message}</p>}
    </div>
  );
}
