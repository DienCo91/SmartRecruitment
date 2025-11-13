'use client';
import { Button } from '@/components/ui/button';
import InputSearch, { InputSearchRef } from '@/components/ui/input-search';
import React, { useRef, useState } from 'react';
import DashBoardJobItem from './DashBoardJobItem';
import { CustomPagination } from '../CustomPagination';

const JobAlertsList = () => {
  const [data, setData] = useState(Array(6).fill(''));
  const [page, setPage] = useState(1);
  const searchRef = useRef<InputSearchRef>(null);

  const handleSubmit = () => {
    console.log(searchRef.current?.getValue());
  };
  return (
    <>
      <div className="flex mt-[32px]">
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
      <div className="space-y-4">
        {/* {data.map((_, index) => (
          <DashBoardJobItem key={index} />
        ))} */}
      </div>
      <CustomPagination
        className="mt-[20px]"
        totalPages={10}
        currentPage={page}
        onPageChange={p => setPage(p)}
      />
    </>
  );
};

export default JobAlertsList;
