import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

interface ITextField<T extends FieldValues> extends React.ComponentProps<'input'> {
  placeholder: string;
  control: Control<T>;
  name: Path<T>;
  className?: string;
}

const TextField = <T extends FieldValues>({
  name,
  control,
  className = '',
  ...props
}: ITextField<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = props.type === 'password';
  const typeInput = isPassword ? (showPassword ? 'text' : 'password') : props.type;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="mt-[20px]">
          <div className="relative">
            <FormControl>
              <Input
                {...field}
                {...props}
                className={cn('rounded-[6px]', className)}
                type={typeInput}
              />
            </FormControl>
            {isPassword && (
              <button
                type="button"
                className="absolute right-2 top-2.5 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextField;
