'use client';

import { Combobox } from '@/components/Combobox/Combobox';
import { CustomInput } from '@/components/Inputs/CustomInput';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { locations } from '@/constants/mockedData';
import { LayersIcon, MapPinIcon, SearchIcon } from 'lucide-react';
import { useState } from 'react';

export function FilterCandidate() {
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
        placeholder="Nhập tên hoặc email ứng viên"
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

      <Button
        className="bg-blue-900 hover:bg-blue-800 hover:text-neutral-100 text-neutral-300 rounded-l-none h-full rounded-r-sm"
        onClick={() => {
          console.log(filters);
        }}
      >
        Tìm ứng viên
      </Button>
    </div>
  );
}
