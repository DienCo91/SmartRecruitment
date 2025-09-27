'use client';

import { CustomButton } from '@/components/Buttons/CustomButton';
import { Combobox } from '@/components/Combobox/Combobox';
import { CustomInput } from '@/components/Inputs/CustomInput';
import { CustomPopover } from '@/components/Popovers/CustomPopover';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  categoties,
  educations,
  experiences,
  jobLevels,
  jobTypes,
  locations,
  salaries,
} from '@/constants/mockedData';
import { ChevronDownIcon, LayersIcon, ListFilterIcon, MapPinIcon, SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { CustomCheckboxGroup } from '../CheckboxGroup/CustomCheckboxGroup';
import { CustomRadioGroup } from '../RadioGroup/CustomRadioGroup';

export function FilterJob() {
  const initFilter = {
    search: '',
    location: null,
    categotie: null,
    exp: 'underOneYear',
    salary: '$50-$1000',
    jobType: ['all'],
    education: ['all'],
    jobLevel: 'entryLevel',
  };

  type Filter = typeof initFilter;
  const [filters, setFilters] = useState<typeof initFilter>(initFilter);

  const handleFilter = (key: keyof Filter, value: Filter[typeof key]) =>
    setFilters(prev => ({ ...prev, [key]: value }));

  return (
    <div className="mt-[40px] flex items-center h-10 bg-[#283564] shadow rounded-sm">
      <CustomInput
        startIcon={<SearchIcon size={18} />}
        placeholder="Vị trí tuyển dụng, tên công ty"
        className="focus-within:ring-0 border-0 rounded-none bg-transparent shadow-none"
        value={filters.search}
        onChange={e => handleFilter('search', e.target.value)}
      />
      <Separator orientation="vertical" />
      <Combobox
        options={locations}
        value={filters.location}
        onChange={val => handleFilter('location', val)}
        startIcon={<MapPinIcon size={18} />}
        placeholder="Chọn địa điểm"
      />
      <Separator orientation="vertical" />
      <Combobox
        options={categoties}
        value={filters.categotie}
        onChange={val => handleFilter('categotie', val)}
        startIcon={<LayersIcon size={18} />}
        placeholder="Chọn danh mục"
      />
      <Separator orientation="vertical" />

      <CustomPopover
        trigger={
          <CustomButton
            className="hover:cursor-pointer hover:bg-transparent shadow-none"
            startIcon={<ListFilterIcon size={18} />}
            endIcon={<ChevronDownIcon size={18} className="text-gray-400" />}
          >
            Lọc chi tiết
          </CustomButton>
        }
        align="end"
        className="w-[800px] text-neutral-300 shadow-md"
      >
        <div className="flex justify-between gap-3">
          <div className="">
            <span className="text-sm">Kinh nghiệm</span>
            <Separator className="my-2" />
            <CustomRadioGroup
              options={experiences}
              value={filters.exp}
              onValueChange={val => handleFilter('exp', val)}
            />
          </div>

          <div className="">
            <span className="text-sm">Thu nhập</span>
            <Separator className="my-2" />
            <CustomRadioGroup
              options={salaries}
              value={filters.salary}
              onValueChange={val => handleFilter('salary', val)}
            />
          </div>

          <div className="">
            <span className="text-sm">Loại công việc</span>
            <Separator className="my-2" />
            <CustomCheckboxGroup
              options={jobTypes}
              values={filters.jobType}
              onCheckedValues={vals => handleFilter('jobType', vals)}
            />
          </div>

          <div className="">
            <span className="text-sm">Trình độ</span>
            <Separator className="my-2" />
            <CustomCheckboxGroup
              options={educations}
              values={filters.education}
              onCheckedValues={vals => handleFilter('education', vals)}
            />
          </div>

          <div className="">
            <span className="text-sm">Level công việc</span>
            <Separator className="my-2" />
            <CustomRadioGroup
              options={jobLevels}
              value={filters.jobLevel}
              onValueChange={val => handleFilter('jobLevel', val)}
            />
          </div>
        </div>
      </CustomPopover>

      <Button
        className="bg-blue-900 hover:bg-blue-800 hover:text-neutral-100 text-neutral-300 rounded-l-none h-full rounded-r-sm"
        onClick={() => {
          console.log(filters);
        }}
      >
        Tìm Job
      </Button>
    </div>
  );
}
