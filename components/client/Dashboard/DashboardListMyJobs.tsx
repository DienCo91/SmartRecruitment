import React, { useState } from 'react';
import GlassCardBase from '../Cards/GlassCardBase';
import { CustomPagination } from '../CustomPagination';
import MyJobItem from './MyJobItem';

const DashboardListMyJobs = () => {
  const [data, setData] = useState(Array(6).fill(''));
  const [page, setPage] = useState(1);
  return (
    <div className="mt-[32px]">
      <GlassCardBase className="grid  grid-cols-[2fr_1fr_1.5fr_1.5fr] items-center text-[12px] font-bold bg-white/30 hover:translate-y-0">
        <h1>JOBS</h1>
        <h1>STATUS</h1>
        <h1>APPLICATIONS</h1>
        <h1>ACTIONS</h1>
      </GlassCardBase>

      <div className="space-y-4 mt-[20px]">
        {data.map((_, index) => (
          <MyJobItem key={index} />
        ))}
      </div>

      <CustomPagination
        className="mt-[20px]"
        totalPages={10}
        currentPage={page}
        onPageChange={p => setPage(p)}
      />
    </div>
  );
};

export default DashboardListMyJobs;
