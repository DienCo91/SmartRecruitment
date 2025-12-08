'use client';

import { Combobox } from '@/components/Combobox/Combobox';
import { CustomInput } from '@/components/Inputs/CustomInput';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { locations } from '@/constants/mockedData';
import { ISpecificationParams } from '@/types/blog';
import { MapPinIcon, SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function FilterCandidate({ handleClearFilter }: { handleClearFilter?: () => void }) {
  const [filters, setFilters] = useState<ISpecificationParams>({});
  const params = new URLSearchParams(window.location.search);
  const router = useRouter();

  const handleFilter = (key: keyof ISpecificationParams, value: ISpecificationParams[typeof key]) =>
    setFilters(prev => ({ ...prev, [key]: value }));

  const handleClear = () => {
    setFilters({});
    params.delete('keyword');
    params.delete('location');
    router.replace(`/candidate?${params.toString()}`);
    if (typeof handleClearFilter === 'function') handleClearFilter();
  };

  return (
    <div className="mt-[40px] flex items-center h-10 bg-[#283564] shadow rounded-sm">
      <CustomInput
        startIcon={<SearchIcon size={18} />}
        placeholder="Nhập tên hoặc email ứng viên"
        className="focus-within:ring-0 border-0 rounded-none bg-transparent shadow-none"
        value={filters.keyword || ''}
        onChange={e => handleFilter('keyword', e.target.value)}
      />
      <Separator orientation="vertical" />
      <Combobox
        options={locations}
        value={filters.location || null}
        onChange={val => handleFilter('location', val)}
        startIcon={<MapPinIcon size={18} />}
        placeholder="Chọn địa điểm"
      />

      <Button
        className="bg-blue-900 hover:bg-blue-800 hover:text-neutral-100 text-neutral-300 rounded-l-none h-full rounded-r-sm"
        onClick={() => {
          params.set('keyword', filters.keyword!);
          params.set('location', filters.location!);
          if (!filters.keyword) params.delete('keyword');
          if (!filters.location) params.delete('location');
          router.push(`/candidate?${params.toString()}`);
        }}
      >
        Tìm ứng viên
      </Button>
      <Button
        variant="outline"
        className="rounded-l-none text-white h-full cursor-pointer"
        onClick={handleClear}
      >
        Clear filter
      </Button>
    </div>
  );
}
