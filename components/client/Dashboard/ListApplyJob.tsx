'use client';
import { Button } from '@/components/ui/button';
import InputSearch, { InputSearchRef } from '@/components/ui/input-search';
import { useRef, useState } from 'react';
import GlassCardBase from '../Cards/GlassCardBase';
import { CustomPagination } from '../CustomPagination';
import ApplyJobItem from './ApplyJobItem';

const ListApplyJob = () => {
  const [data, setData] = useState(Array(6).fill(''));
  const [page, setPage] = useState(1);
  const searchRef = useRef<InputSearchRef>(null);

  const handleSubmit = () => {
    console.log(searchRef.current?.getValue());
  };

  return (
    <div className="w-full mt-[40px]">
      <div className="flex">
        <InputSearch
          ref={searchRef}
          className="border-[1px] mr-[32px] mb-[32px] rounded-md "
          placeholder="Search"
          iconClassName="text-white"
        />
        <Button onClick={handleSubmit} size={'lg'}>
          Submit
        </Button>
      </div>
      <GlassCardBase className="grid grid-cols-[2.5fr_1fr_1fr_1fr] text-sm font-semibold  px-8 py-3 rounded-sm bg-white/30 hover:bg-white/30 hover:translate-y-[0px]">
        <div>JOBS</div>
        <div className="">DATE APPLIED</div>
        <div className="">STATUS</div>
        <div className="">ACTION</div>
      </GlassCardBase>

      {data.map((_, index) => (
        <ApplyJobItem key={index} />
      ))}
      <CustomPagination
        className="mt-[20px]"
        totalPages={10}
        currentPage={page}
        onPageChange={p => setPage(p)}
      />
    </div>
  );
};

export default ListApplyJob;
