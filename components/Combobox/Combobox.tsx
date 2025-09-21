import { cn } from '@/lib/utils';
import { BaseProps, TOptions } from '@/types';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { CustomPopover } from '../Popovers/CustomPopover';
import { Button } from '../ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';

interface Props extends BaseProps {
  startIcon?: React.ReactNode;
  placeholder?: string;
  options: TOptions[];
  align?: 'start' | 'center' | 'end';
  value: string | null;
  onChange: (value: string) => void;
}

export function Combobox({
  options,
  startIcon,
  placeholder = 'Select option...',
  value,
  onChange,
  className,
  align = 'center',
}: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const trigger = useMemo(
    () => (
      <Button
        className={cn(
          'text-sm bg-transparent border-none hover:bg-transparent shadow-none text-neutral-300',
          value ? '' : 'text-gray-400'
        )}
      >
        <div className={cn('flex justify-between w-[200px]', className)}>
          {options.find(o => o.value === value)?.label || placeholder}
          {!open ? (
            <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-70" />
          ) : (
            <ChevronUpIcon className="ml-2 h-4 w-4 shrink-0 opacity-70" />
          )}
        </div>
      </Button>
    ),
    [className, open, options, placeholder, value]
  );

  return (
    <div className="flex items-center">
      <span className="mx-2">{startIcon}</span>
      <CustomPopover
        trigger={trigger}
        align={align}
        open={open}
        onOpenChange={setOpen}
        className="p-0"
      >
        <Command className="bg-transparent">
          <CommandInput placeholder="Search..." className="text-neutral-300" />
          <CommandList>
            <CommandEmpty>No options.</CommandEmpty>
            <CommandGroup className="p-0">
              {options.map((o, i) => (
                <CommandItem
                  key={i}
                  value={o.value}
                  onSelect={curValue => {
                    onChange(curValue);
                    setOpen(!open);
                  }}
                  className="flex justify-between text-neutral-300 data-[selected=true]:bg-white/30 data-[selected=true]:text-neutral-300 cursor-pointer rounded-none"
                >
                  {o.label}
                  <CheckIcon
                    className={cn(
                      'mr-2 h-4 w-4 text-neutral-300',
                      value === o.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CustomPopover>
    </div>
  );
}
