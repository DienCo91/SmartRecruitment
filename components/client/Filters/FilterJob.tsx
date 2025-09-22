'use client';

import { CustomButton } from '@/components/Buttons/CustomButton';
import { Combobox } from '@/components/Combobox/Combobox';
import { CustomInput } from '@/components/Inputs/CustomInput';
import { CustomPopover } from '@/components/Popovers/CustomPopover';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { TOptions } from '@/types';
import { ChevronDownIcon, LayersIcon, ListFilterIcon, MapPinIcon, SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { CustomCheckboxGroup } from '../CheckboxGroup/CustomCheckboxGroup';
import { CustomRadioGroup } from '../RadioGroup/CustomRadioGroup';

export function FilterJob() {
  const locations: TOptions[] = [
    {
      value: 'hanoi',
      label: 'Hà Nội',
    },
    {
      value: 'hochiminh',
      label: 'Hồ Chí Minh',
    },
    {
      value: 'danang',
      label: 'Đà Nẵng',
    },
    {
      value: 'thaibinh',
      label: 'Thái Bình',
    },
  ];

  const categoties = [
    {
      value: 'it',
      label: 'IT & Máy tính',
    },
    {
      value: 'marketing',
      label: 'Marketing',
    },
    {
      value: 'bussiness',
      label: 'Kinh doanh',
    },
  ];

  const experiences = [
    { id: 1, value: 'underOneYear', label: 'Fresher' },
    { id: 2, value: '1-2Year', label: '1-2 Years' },
    { id: 3, value: '2-4Year', label: '2-4 Years' },
    { id: 4, value: '4-6Year', label: '4-6 Years' },
    { id: 5, value: '6-8Year', label: '6-8 Years' },
    { id: 6, value: '8-10Year', label: '8-10 Years' },
    { id: 7, value: '10-15Year', label: '10-15 Years' },
    { id: 8, value: '15+Year', label: '15+ Years' },
  ];

  const salaries = [
    { id: '$50-$1000', value: '$50-$1000', label: '$50-$1000' },
    { id: '$1000-$2000', value: '$1000-$2000', label: '$1000-$2000' },
    { id: '$3000-$4000', value: '$3000-$4000', label: '$3000-$4000' },
    { id: '$4000-$6000', value: '$4000-$6000', label: '$4000-$6000' },
    { id: '$6000-$8000', value: '$6000-$8000', label: '$6000-$8000' },
    { id: '$8000-$10000', value: '$8000-$10000', label: '$8000-$10000' },
    { id: '$10000-$15000', value: '$10000-$15000', label: '$10000-$15000' },
    { id: '$15000+', value: '$15000+', label: '$15000+' },
  ];

  const jobTypes = [
    { id: 'all', value: 'all', label: 'All' },
    { id: 'fulltime', value: 'fulltime', label: 'Full Time' },
    { id: 'parttime', value: 'parttime', label: 'Part Time' },
    { id: 'internship', value: 'internship', label: 'Internship' },
    { id: 'remote', value: 'remote', label: 'Remote' },
    { id: 'temporary', value: 'temporary', label: 'Temporary' },
  ];

  const educations = [
    { id: 'all', value: 'all', label: 'All' },
    { id: 'highSchool', value: 'highSchool', label: 'High School' },
    { id: 'intermediate', value: 'intermediate', label: 'Intermediate' },
    { id: 'graduation', value: 'graduation', label: 'Graduation' },
    { id: 'masterDegree', value: 'masterDegree', label: 'Master Degree' },
  ];

  const jobLevels = [
    { id: 'entryLevel', value: 'entryLevel', label: 'Entry Level' },
    { id: 'midLevel', value: 'midLevel', label: 'Mid Level' },
    { id: 'expertLevel', value: 'expertLevel', label: 'Expert Level' },
  ];

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
    <div className="mt-[20px] flex items-center h-10 bg-[#283564] shadow rounded-sm">
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
