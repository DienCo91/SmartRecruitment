import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { BaseProps, TOptions } from '@/types';

interface Props extends BaseProps {
  value: string;
  options: (TOptions & { id: string | number })[];
  onValueChange: (val: string) => void;
}

export function CustomRadioGroup({ value, onValueChange, options = [] }: Props) {
  return (
    <RadioGroup value={value} onValueChange={onValueChange}>
      {options.map((o, i) => (
        <div key={i} className="flex items-center gap-3">
          <RadioGroupItem className="size-3" value={o.value} id={o.id + ''} />
          <Label htmlFor={o.id + ''} className="font-normal text-xs">
            {o.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
