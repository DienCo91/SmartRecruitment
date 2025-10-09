'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { SlidersHorizontal } from 'lucide-react';
import { ChangeEvent, forwardRef, useImperativeHandle, useState } from 'react';

export interface ApplicationFilterInputSearchRef {
  getValue: () => void;
  setValue: () => void;
  clearValue: () => void;
}

interface IApplicationFilter {
  data?: string;
}

interface DataFilter {
  appropriate: number;
  gender: string;
  sort: string;
  age: string;
  language: string;
}

const ApplicationFilter = forwardRef<ApplicationFilterInputSearchRef, IApplicationFilter>(
  (props, ref) => {
    const [dataFilter, setDataFilter] = useState<DataFilter>({
      appropriate: 0,
      gender: 'all',
      sort: 'all',
      age: '0-99',
      language: 'all',
    });

    useImperativeHandle(ref, () => ({
      getValue: () => {},
      setValue: () => {},
      clearValue: () => {
        setDataFilter({
          appropriate: 0,
          gender: 'all',
          sort: 'all',
          age: '0-99',
          language: 'all',
        });
      },
    }));

    const updateFilter = (key: keyof DataFilter, value: string | number) => {
      setDataFilter(prev => ({
        ...prev,
        [key]: value,
      }));
    };

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value.replace(/^0+/, '');
      let num = Number(val);
      if (isNaN(num)) num = 0;
      if (num < 0) num = 0;
      if (num > 100) num = 100;
      updateFilter('appropriate', num);
    };

    console.log('dataFilter.appropriate', dataFilter.appropriate);

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button className="text-[16px]">
            <span>Lọc</span>
            <SlidersHorizontal />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-100" align="end">
          <div className="grid gap-4">
            <h4 className="leading-none font-medium ">Lọc CV</h4>
            <div className="grid gap-4">
              <Label htmlFor="width">Mức độ phù hợp</Label>
              <div className="flex space-x-[8px] items-center">
                <Slider
                  value={[dataFilter.appropriate]}
                  onValueChange={val => updateFilter('appropriate', val[0])}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <Input
                  type="text"
                  value={dataFilter.appropriate}
                  onChange={onChangeInput}
                  className="w-[70px] text-center"
                />
                <span>%</span>
              </div>
              <div className="flex justify-between items-center">
                <Label htmlFor="maxWidth">Giới tính</Label>
                <Select
                  value={dataFilter.gender}
                  onValueChange={val => updateFilter('gender', val)}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Giới tính</SelectLabel>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="male">Nam</SelectItem>
                      <SelectItem value="female">Nữ</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-between items-center">
                <Label htmlFor="maxWidth">Sắp xếp theo</Label>
                <Select value={dataFilter.sort} onValueChange={val => updateFilter('sort', val)}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="latest">Mới nhất</SelectItem>
                      <SelectItem value="oldest">Cũ Nhất</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Label htmlFor="age">Độ tuổi</Label>
              <div className="flex space-x-[8px] items-center">
                <Slider
                  value={dataFilter.age.split('-').map(Number)}
                  onValueChange={(val: number[]) => {
                    const [min, max] = val;
                    updateFilter('age', `${min}-${max}`);
                  }}
                  max={99}
                  step={1}
                  className="flex-1"
                />
                <div className="w-[90px] text-center border-1 rounded-md py-[6px]">
                  {dataFilter.age}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Label htmlFor="maxWidth">Ngôn Ngữ</Label>
                <Select
                  value={dataFilter.language}
                  onValueChange={val => updateFilter('language', val)}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="en">Anh</SelectItem>
                      <SelectItem value="vi">Việt Nam</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);

ApplicationFilter.displayName = 'ApplicationFilter';

export default ApplicationFilter;
