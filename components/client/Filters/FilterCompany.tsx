'use client';
import { GlassCard } from '@/components/client/Cards/GlassCard';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { COMPANY_SIZE, INDUSTRY_TYPE, ORGANIZATION_TYPE } from '@/constants/company';
import { CalendarIcon } from 'lucide-react';
import React, { forwardRef, ForwardRefRenderFunction, useImperativeHandle, useState } from 'react';

export interface FilterCompanyRef {
  getFilters: () => {
    organizationType?: string;
    industryType?: string;
    teamSize?: string;
    year?: number;
  };
  clearFilters: () => void;
}

const currentYear = new Date().getFullYear();
const minYear = 1900;

const FilterCompany: ForwardRefRenderFunction<FilterCompanyRef> = (_, ref) => {
  const [organizationType, setOrganizationType] = useState<string>();
  const [industryType, setIndustryType] = useState<string>();
  const [teamSize, setTeamSize] = useState<string>();
  const [year, setYear] = useState<number>();

  const handleSelectSingle = (
    option: string,
    selected: string | undefined,
    setter: React.Dispatch<React.SetStateAction<string | undefined>>
  ) => {
    if (selected === option) setter(undefined);
    else setter(option);
  };

  useImperativeHandle(ref, () => ({
    getFilters: () => ({
      organizationType,
      industryType,
      teamSize,
      year,
    }),
    clearFilters: () => {
      setOrganizationType(undefined);
      setIndustryType(undefined);
      setTeamSize(undefined);
      setYear(undefined);
    },
  }));

  return (
    <GlassCard title="Lọc">
      {/* ORGANIZATION TYPE */}
      <Accordion type="single" collapsible className="border-b rounded-none border-white/20">
        <AccordionItem value="org">
          <AccordionTrigger className="cursor-pointer text-[16px] no-underline hover:no-underline ">
            Organization Type
          </AccordionTrigger>
          {ORGANIZATION_TYPE.map(option => {
            const checked = organizationType === option.value;
            return (
              <AccordionContent
                key={option.value}
                onClick={() =>
                  handleSelectSingle(option.value, organizationType, setOrganizationType)
                }
              >
                <div className="flex items-center gap-3 py-[10px]">
                  <Checkbox id={option.value} checked={checked} className="rounded-full" />
                  <Label
                    htmlFor={option.value}
                    onClick={e => {
                      e.preventDefault();
                      handleSelectSingle(option.value, organizationType, setOrganizationType);
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

      {/* INDUSTRY TYPE */}
      <Accordion type="single" collapsible className="border-b rounded-none border-white/20">
        <AccordionItem value="industry">
          <AccordionTrigger className="cursor-pointer text-[16px] no-underline hover:no-underline ">
            Industry Type
          </AccordionTrigger>
          {INDUSTRY_TYPE.map(option => {
            const checked = industryType === option.value;
            return (
              <AccordionContent
                key={option.value}
                onClick={() => handleSelectSingle(option.value, industryType, setIndustryType)}
              >
                <div className="flex items-center gap-3 py-[10px]">
                  <Checkbox id={option.value} checked={checked} className="rounded-full" />
                  <Label
                    htmlFor={option.value}
                    onClick={e => {
                      e.preventDefault();
                      handleSelectSingle(option.value, industryType, setIndustryType);
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

      {/* TEAM SIZE */}
      <Accordion type="single" collapsible className="border-b rounded-none border-white/20">
        <AccordionItem value="team-size">
          <AccordionTrigger className="cursor-pointer text-[16px] no-underline hover:no-underline ">
            Team Size
          </AccordionTrigger>
          {COMPANY_SIZE.map(option => {
            const checked = teamSize === option.value;
            return (
              <AccordionContent
                key={option.value}
                onClick={() => handleSelectSingle(option.value, teamSize, setTeamSize)}
              >
                <div className="flex items-center gap-3 py-[10px]">
                  <Checkbox id={option.value} checked={checked} className="rounded-full" />
                  <Label
                    htmlFor={option.value}
                    onClick={e => {
                      e.preventDefault();
                      handleSelectSingle(option.value, teamSize, setTeamSize);
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

      {/* YEAR OF ESTABLISHMENT */}
      <Accordion type="single" collapsible className="border-b rounded-none border-white/20">
        <AccordionItem value="year">
          <AccordionTrigger className="cursor-pointer text-[16px] no-underline hover:no-underline ">
            Year of Establishment
          </AccordionTrigger>
          <AccordionContent>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between bg-transparent border-white/20 text-white "
                >
                  {year ? year : 'Year'}
                  <CalendarIcon className="ml-2 h-4 w-4 opacity-70" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2  text-blue-primary border border-white/10">
                <div className="grid grid-cols-4 gap-2 h-[100px] overflow-y-auto">
                  {Array.from({ length: currentYear - minYear + 1 }).map((_, i) => {
                    const y = currentYear - i;
                    return (
                      <Button
                        key={y}
                        variant={y === year ? 'default' : 'ghost'}
                        className={`text-sm hover:text-white hover:bg-blue-primary`}
                        onClick={() => setYear(y)}
                      >
                        {y}
                      </Button>
                    );
                  })}
                </div>
              </PopoverContent>
            </Popover>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </GlassCard>
  );
};

export default forwardRef(FilterCompany);
