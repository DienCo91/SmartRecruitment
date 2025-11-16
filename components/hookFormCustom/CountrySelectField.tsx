'use client';

import { Controller, FieldValues, Path, Control } from 'react-hook-form';
import CountrySelect from '../ui/country-select';
import { CountryRegion } from '../ui/helpers';

interface CountrySelectFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  value?: string;
  control: Control<TFieldValues>;
  error?: string;
  priorityOptions?: string[];
  whitelist?: string[];
  blacklist?: string[];
  className?: string;
  placeholder?: string;
}

export function CountrySelectField<TFieldValues extends FieldValues>({
  name,
  label,
  control,
  error,
  priorityOptions = [],
  whitelist = [],
  blacklist = [],
  className,
  placeholder = 'Country',
  value,
}: CountrySelectFieldProps<TFieldValues>) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-bold">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <CountrySelect
            value={value}
            className={className}
            placeholder={placeholder}
            priorityOptions={priorityOptions}
            whitelist={whitelist}
            blacklist={blacklist}
            onChange={(val: CountryRegion) => {
              onChange(val?.countryName);
            }}
          />
        )}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
