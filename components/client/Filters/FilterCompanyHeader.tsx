'use client';

import { TypeFilterCompanyHeader } from '@/app/(client)/company/page';
import { Combobox } from '@/components/Combobox/Combobox';
import { CustomInput } from '@/components/Inputs/CustomInput';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { locations } from '@/constants/mockedData';
import { MapPinIcon, SearchIcon } from 'lucide-react';
import { useState } from 'react';

interface IFilterCompanyHeader {
  handleSubmit?: (value: TypeFilterCompanyHeader) => void;
  handleClearFilter?: () => void;
}

export function FilterCompanyHeader({ handleSubmit, handleClearFilter }: IFilterCompanyHeader) {
  const initFilter = {
    search: '',
    location: '',
  };

  type Filter = typeof initFilter;
  const [filters, setFilters] = useState<typeof initFilter>(initFilter);

  const handleFilter = (key: keyof Filter, value: Filter[typeof key]) =>
    setFilters(prev => ({ ...prev, [key]: value }));

  const handleClear = () => {
    setFilters(initFilter);
    if (typeof handleClearFilter === 'function') handleClearFilter();
  };

  return (
    <div className="mt-[40px] flex lg:items-center bg-[#283564] shadow rounded-sm flex-col lg:flex-row ">
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

      <Button
        className="bg-blue-900 hover:bg-blue-800 hover:text-neutral-100 text-neutral-300 rounded-l-none h-full rounded-r-sm"
        onClick={() => {
          if (typeof handleSubmit === 'function') handleSubmit(filters);
        }}
      >
        Tìm kiếm
      </Button>
      <Button
        variant="outline"
        className="rounded-none lg:rounded-r-md text-white h-full cursor-pointer"
        onClick={handleClear}
      >
        Clear filter
      </Button>
    </div>
  );
}
