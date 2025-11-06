import React, { useState } from 'react';
import GlassCardBase from '../Cards/GlassCardBase';
import { CustomPagination } from '../CustomPagination';
import MyJobItem from './MyJobItem';
import { MyJobPageResponse } from '@/types';
import { LoadingCircle } from '@/components/Loadings/LoadingCircle';

interface IDashboardListMyJobs {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  data: MyJobPageResponse[];
  page: number;
  loading: boolean;
  total: number;
}

const DashboardListMyJobs: React.FC<IDashboardListMyJobs> = ({
  data,
  setPage,
  page,
  loading,
  total,
}) => {
  const totalPage = total / 10; // 10 items per page

  return (
    <div className="mt-[32px] min-h-[600px] flex flex-col justify-between ">
      <GlassCardBase className="grid  grid-cols-[2fr_1fr_1.5fr_1.5fr] items-center text-[12px] font-bold bg-white/30 hover:translate-y-0">
        <h1>JOBS</h1>
        <h1>STATUS</h1>
        <h1>APPLICATIONS</h1>
        <h1>ACTIONS</h1>
      </GlassCardBase>

      <div className="space-y-4 mt-[20px]">
        {loading ? (
          <LoadingCircle />
        ) : data.length > 0 ? (
          data.map(item => <MyJobItem key={item.id} item={item} />)
        ) : (
          <div className="flex items-center justify-center w-full h-full">No jobs found</div>
        )}
      </div>

      {totalPage > 1 ? (
        <CustomPagination
          className="mt-[20px]"
          totalPages={totalPage}
          currentPage={page}
          onPageChange={p => setPage(p)}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default DashboardListMyJobs;
