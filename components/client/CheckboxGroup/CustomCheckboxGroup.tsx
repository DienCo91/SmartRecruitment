import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { BaseProps, TOptions } from '@/types';

interface Props extends BaseProps {
  values: string[];
  options: (TOptions & { id: string | number })[];
  onCheckedValues: (vals: string[]) => void;
}

export function CustomCheckboxGroup({ values, onCheckedValues, options }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {options.map(o => (
        <div key={o.id} className="flex gap-2">
          <Checkbox
            id={o.id + ''}
            checked={values.includes(o.value)}
            onCheckedChange={isCheck =>
              isCheck
                ? onCheckedValues([...values, o.value])
                : onCheckedValues(values.filter(v => v !== o.value))
            }
          />
          <Label htmlFor={o.id + ''} className="font-normal text-xs">
            {o.label}
          </Label>
        </div>
      ))}
    </div>
  );
}
