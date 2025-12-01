/* eslint-disable @typescript-eslint/no-unused-expressions */
import { cn } from '@/lib/utils';
import { TOptions } from '@/types';
import _ from 'lodash';
import { CheckIcon, ChevronDownIcon, XIcon } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { CustomInput } from '../Inputs/CustomInput';
import { CustomPopover } from '../Popovers/CustomPopover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';

interface Props {
  options: TOptions[];
  values: string[];
  onValueChange: (values: string[]) => void;
  placeholder?: string;
  inputPlaceholder?: string;
  enableAddValueManual?: boolean;
  className?: string;
  itemClassName?: string;
}

export function MultiSelect({
  options,
  onValueChange,
  values,
  placeholder = 'Select multiple...',
  enableAddValueManual,
  className,
  itemClassName,
  inputPlaceholder,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [inputValue, setInputValue] = useState('');

  const displayValues = _.mapValues(_.keyBy(options, 'value'), 'label');

  const closeButton = useCallback(
    (val: string) => (
      <XIcon
        size={18}
        className="border rounded-full cursor-pointer text-gray-400 border-gray-400 hover:text-gray-300 hover:border-gray-300"
        onClick={e => {
          e.stopPropagation();
          onValueChange(values.filter(v => v !== val));
        }}
      />
    ),
    [onValueChange, values]
  );

  const trigger = useMemo(
    () => (
      <div className="bg-white/20 rounded-sm p-2 border">
        <div className={cn('flex justify-between items-center', className)}>
          <div className="flex flex-wrap gap-2">
            {Boolean(values.length) ? (
              values.map(val => (
                <div
                  className={cn(
                    'flex items-center gap-3 bg-white/20 p-1 rounded-md',
                    itemClassName
                  )}
                  key={val}
                >
                  {displayValues[val] || val}
                  {closeButton(val)}
                </div>
              ))
            ) : (
              <p className="text-gray-400">{placeholder}</p>
            )}
            {open && enableAddValueManual && (
              <CustomInput
                placeholder={inputPlaceholder || 'Nhập giá trị mới'}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onMouseDown={e => e.stopPropagation()}
                onClick={e => e.stopPropagation()}
                onFocus={e => e.stopPropagation()}
                onKeyDown={e => {
                  if (e.key === 'Enter' && inputValue.trim() !== '') {
                    onValueChange(_.uniq([...values, inputValue.trim()]));
                    setInputValue('');
                  }
                }}
              />
            )}
          </div>

          {!Boolean(values.length) && (
            <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-70" />
          )}
        </div>
      </div>
    ),
    [
      className,
      closeButton,
      displayValues,
      enableAddValueManual,
      inputPlaceholder,
      inputValue,
      itemClassName,
      onValueChange,
      open,
      placeholder,
      values,
    ]
  );

  const handleSelect = useCallback(
    (v: string) => {
      !values.includes(String(v))
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
                    values.includes(String(o.value)) ? 'opacity-100' : 'opacity-0'
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
