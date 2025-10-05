'use client';
import React, { useState } from 'react';
import { CustomPagination } from '../CustomPagination';
import SaveCandidateItem from './SaveCandidateItem';

const DashboardListSaveCandidate = () => {
  const [data, setData] = useState(Array(6).fill(''));
  const [page, setPage] = useState(1);
  return (
    <div>
      <div className="space-y-4 mt-[20px]">
        {data.map((_, index) => (
          <SaveCandidateItem key={index} />
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

export default DashboardListSaveCandidate;
