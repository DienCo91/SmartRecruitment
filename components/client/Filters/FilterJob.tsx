'use client';

import { CustomButton } from '@/components/Buttons/CustomButton';
import { Combobox } from '@/components/Combobox/Combobox';
import { CustomInput } from '@/components/Inputs/CustomInput';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { TOptions } from '@/types';
import { ChevronDownIcon, LayersIcon, ListFilterIcon, MapPinIcon, SearchIcon } from 'lucide-react';
import { useState } from 'react';

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
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="mt-5 flex items-center h-10 bg-[#283564] shadow rounded-sm">
      <CustomInput
        startIcon={<SearchIcon size={18} />}
        placeholder="Vị trí tuyển dụng, tên công ty"
        className="focus-within:ring-0 border-0 rounded-none bg-transparent shadow-none"
      />
      <Separator orientation="vertical" />
      <Combobox
        options={locations}
        value={selectedLocation}
        onChange={setSelectedLocation}
        startIcon={<MapPinIcon size={18} />}
        placeholder="Chọn địa điểm"
      />
      <Separator orientation="vertical" />
      <Combobox
        options={categoties}
        value={selectedCategory}
        onChange={setSelectedCategory}
        startIcon={<LayersIcon size={18} />}
        placeholder="Chọn danh mục"
      />
      <Separator orientation="vertical" />
      <CustomButton
        className="hover:cursor-pointer hover:bg-transparent shadow-none"
        startIcon={<ListFilterIcon size={18} />}
        endIcon={<ChevronDownIcon size={18} className="text-gray-400" />}
        onClick={() => {
          //
        }}
      >
        Lọc chi tiết
      </CustomButton>
      <Button
        className="bg-blue-900 hover:bg-blue-800 hover:text-neutral-100 text-neutral-300 rounded-l-none h-full rounded-r-sm"
        onClick={() => {
          //
        }}
      >
        Tìm Job
      </Button>
    </div>
  );
}
