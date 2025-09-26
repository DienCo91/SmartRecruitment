'use client';
import React, { Dispatch, SetStateAction } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

import { GlassCard } from '@/components/client/Cards/GlassCard';

const options = [
  {
    id: 'government',
    label: 'Chính phủ',
  },
  {
    id: 'semi-government',
    label: 'Bán Công',
  },
  {
    id: 'private-company',
    label: 'Công ty tư nhân',
  },
  {
    id: 'international-agencies',
    label: 'Các cơ quan quốc tế',
  },
  {
    id: 'others',
    label: 'Khác',
  },
];

interface IFilterCompany {
  setOptionSelected: Dispatch<SetStateAction<string[]>>;
  optionSelected: string[];
}
const FilterCompany: React.FC<IFilterCompany> = ({ setOptionSelected, optionSelected }) => {
  const handleSelectOption = (id: string) => {
    if (optionSelected.includes(id)) {
      setOptionSelected(optionSelected.filter(o => o !== id));
    } else {
      setOptionSelected([...optionSelected, id]);
    }
  };
  return (
    <GlassCard title="Lọc">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="no-underline hover:no-underline cursor-pointer text-[16px]">
            Loại Đơn Vị
          </AccordionTrigger>
          {options.map(option => {
            const checked = optionSelected.includes(option.id);

            return (
              <AccordionContent key={option.id} onClick={() => handleSelectOption(option.id)}>
                <div className="flex items-center gap-3  py-[10px]">
                  <Checkbox id={option.id} className="rounded-full" checked={checked} />
                  <Label
                    htmlFor={option.id}
                    onClick={e => {
                      e.preventDefault();
                      handleSelectOption(option.id);
                    }}
                  >
                    {option.label}
                  </Label>
                </div>
              </AccordionContent>
            );
          })}
        </AccordionItem>
      </Accordion>
    </GlassCard>
  );
};

export default FilterCompany;
