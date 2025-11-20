/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { cn } from '@/lib/utils';
import { TOptions } from '@/types';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { CustomPopover } from '../Popovers/CustomPopover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import _ from 'lodash';

interface Props {
  options: TOptions[];
  values: string[];
  onValueChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  onValueChange,
  values,
  placeholder = 'Select multiple...',
  className,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const displayValues = _.mapValues(_.keyBy(options, 'value'), 'label');

  const trigger = useMemo(
    () => (
      <div className="bg-white/20 rounded-sm p-3">
        <div className={cn('flex justify-between items-center', className)}>
          <div className="flex-row gap-2">
            {values.map(val => (
              <div className="bg-white/20 p-1 rounded-md">{displayValues[val]}</div>
            )) || placeholder}
          </div>

          <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-70" />
        </div>
      </div>
    ),
    [className, displayValues, placeholder, values]
  );

  const handleSelect = useCallback(
    (v: string) => {
      !values.includes(v)
        ? onValueChange(_.uniq([...values, v]))
        : onValueChange(values.filter(val => val != v));
    },
    [onValueChange, values]
  );

  return (
    <CustomPopover
      open={open}
      onOpenChange={setOpen}
      trigger={trigger}
      className="p-0"
      align="start"
    >
      <Command className="w-full">
        <CommandInput
          placeholder="Search..."
          value={search}
          onValueChange={val => setSearch(val)}
        />
        <CommandList>
          <CommandEmpty>Không có kết quả</CommandEmpty>
          <CommandGroup>
            {options.map(o => (
              <CommandItem
                key={o.value}
                onSelect={() => handleSelect(o.value)}
                className="flex justify-between cursor-pointer rounded-none"
              >
                {o.label}
                <CheckIcon
                  className={cn(
                    'mr-2 h-4 w-4',
                    values.includes(o.value) ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </CustomPopover>
  );
}
