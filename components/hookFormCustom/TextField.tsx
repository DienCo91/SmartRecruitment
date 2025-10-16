import { useState } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import React from 'react';

interface TextFieldProps<T extends FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  className?: string;
  classNameLabel?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  isActiveBorderRedError?: boolean;
}

const TextField = <T extends FieldValues>({
  control,
  name,
  label,
  type,
  className,
  startIcon,
  endIcon,
  classNameLabel,
  isActiveBorderRedError = false,
  ...props
}: TextFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const typeInput = isPassword ? (showPassword ? 'text' : 'password') : type;

  const classNameActiveBorderRedError = isActiveBorderRedError
    ? 'aria-[invalid=true]:border-white focus-visible:aria-[invalid=true]:ring-transparent'
    : '';

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          let value = e.target.value;

          value = value.replace(/\D/g, '');

          if (value.length > 1 && value.startsWith('0')) {
            value = value.replace(/^0+/, '');
          }

          field.onChange(value === '' ? '' : value);
        };

        const isNumericField = props.inputMode === 'numeric' && type !== 'password';

        return (
          <FormItem className="w-full">
            {label && (
              <FormLabel className={cn('text-sm font-semibold text-white/80 ', classNameLabel)}>
                {label}
              </FormLabel>
            )}
            <div className="relative flex items-center">
              {startIcon && <span className="absolute left-[10px] text-gray-400">{startIcon}</span>}
              <FormControl>
                <Input
                  {...field}
                  {...props}
                  value={field.value ?? ''}
                  onChange={isNumericField ? handleNumericChange : field.onChange}
                  type={typeInput}
                  className={cn(
                    'w-full rounded-lg border bg-white/20 placeholder:text-white/40',
                    'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0',
                    'disabled:opacity-60 disabled:cursor-not-allowed ',
                    startIcon ? 'pl-[40px]' : '',
                    endIcon || isPassword ? 'pr-9' : '',
                    classNameActiveBorderRedError,
                    className
                  )}
                />
              </FormControl>
              {isPassword ? (
                <button
                  type="button"
                  className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-300 transition-all duration-200 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              ) : (
                endIcon && <span className="absolute right-2 text-gray-400">{endIcon}</span>
              )}
            </div>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default TextField;
