'use client';

import * as React from 'react';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronDown } from 'lucide-react';

const allCategories = [
  { id: 1, name: 'IT & Software' },
  { id: 2, name: 'DevOps & Cloud' },
  { id: 3, name: 'AI / Machine Learning' },
  { id: 4, name: 'Data Analyst / Data Engineer' },
];

interface Categories {
  id: number;
  name: string;
}

interface CategorySelectorProps {
  onChange?: (tag: Categories[] | null) => void;
  value?: Categories[] | null;
}

export default function CategorySelector({ onChange, value }: CategorySelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');

  const handleSelect = (c: Categories) => {
    if (c.id === value?.[0]?.id) {
      handleClear();
      return;
    }
    onChange?.([c]);
    setOpen(false);
    setSearch('');
  };

  const handleClear = () => {
    onChange?.(null);
  };

  const filteredCategories = React.useMemo(() => {
    return allCategories.filter(tag => tag.name.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  return (
    <div className="w-full mt-[8px]">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="flex h-[38px] cursor-pointer items-center justify-between rounded-lg border bg-white/20 px-3 py-2 text-white hover:bg-white/30">
            <div className="flex items-center gap-2 truncate">
              {value?.length ? (
                <span className="truncate text-sm">{value?.[0].name}</span>
              ) : (
                <span className="text-gray-400 text-[14px]">Select a category...</span>
              )}
            </div>
            <ChevronDown size={16} className="text-white/70" />
          </div>
        </PopoverTrigger>

        <PopoverContent align="start" className="w-[300px] p-0 ">
          <Command>
            <CommandInput
              placeholder="Search tags..."
              value={search}
              onValueChange={setSearch}
              className="text-black "
            />
            <CommandList>
              <CommandGroup className="p-1 max-h-[200px] overflow-y-auto">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map(c => (
                    <CommandItem
                      key={c.id}
                      onSelect={() => handleSelect(c)}
                      className={`cursor-pointer rounded-md px-2 py-2 flex justify-between items-center `}
                    >
                      {c.name}
                      {value?.[0]?.id === c.id && <Check size={16} />}
                    </CommandItem>
                  ))
                ) : (
                  <CommandItem disabled className="text-black">
                    No tags found.
                  </CommandItem>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
