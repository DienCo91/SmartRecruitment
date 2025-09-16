'use client';
import WrapperCommon from '@/layout/wrapper-common';
import { useRef } from 'react';
import InputSearch, { InputSearchRef } from './input-search';
import PopoverLocation, { PopoverLocationRef } from './popover-location';
import PopoverSelectCategory from './popover-select-category';
import PopoverAdvanceFilter from './popover-advance-filter';
import { Button } from '@/components/ui/button';

const DividerY = () => <div className="w-[1px] h-[32px] bg-[#E4E5E8]"></div>;

const SearchJob = () => {
  const locationRef = useRef<PopoverLocationRef>(null);
  const searchRef = useRef<InputSearchRef>(null);

  return (
    <WrapperCommon classNameWrapper="bg-grey-primary pb-[32px]">
      <h1 className="py-[24px] text-[18px]">Find Job</h1>

      <div className="bg-white flex items-center  rounded-md shadow-sm overflow-hidden px-[8px]">
        <InputSearch ref={searchRef} />
        <DividerY />
        <PopoverLocation ref={locationRef} />
        <DividerY />
        <PopoverSelectCategory />
        <DividerY />
        <PopoverAdvanceFilter />
        <Button className="bg-blue-primary px-[32px] py-[16px] rounded-[4px] h-[44px] cursor-pointer">
          Find Job
        </Button>
      </div>
    </WrapperCommon>
  );
};

export default SearchJob;
