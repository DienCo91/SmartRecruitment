'use client';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { GoStack } from 'react-icons/go';
import { useState } from 'react';
import { GoChevronDown } from 'react-icons/go';

const categories = [
  { id: 'it', label: 'IT' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'design', label: 'Design' },
  { id: 'finance', label: 'Finance' },
  { id: 'hr', label: 'Human Resources' },
];

const PopoverSelectCategory = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleCategory = (id: string) => {
    setSelected(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="border-none shadow-none rounded-none flex items-center  hover:text-blue-primary gap-2 flex-1 h-[56px]"
        >
          <GoStack className="text-blue-primary" />
          <span className="text-[14px] text-gray-500 max-w-[200px] truncate mx-[8px] ">
            {selected.length > 0 ? selected.join(', ') : 'Select Category'}
          </span>
          <GoChevronDown className="text-gray-500" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-56" side="bottom" align="start" avoidCollisions={false}>
        <div className="flex flex-col gap-3">
          {categories.map(cat => (
            <label key={cat.id} className="flex items-center space-x-2 cursor-pointer">
              <Checkbox
                checked={selected.includes(cat.id)}
                onCheckedChange={() => toggleCategory(cat.id)}
              />
              <span className="text-sm">{cat.label}</span>
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverSelectCategory;
