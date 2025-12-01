'use client';

import DashboardHeader from '@/components/client/Dashboard/DashboardHeader';
import DashboardListSaveCandidate from '@/components/client/Dashboard/DashboardListSaveCandidate';
import { EmployerService } from '@/services/employer.services';
import { Candidate } from '@/types';
import React, { useEffect, useState } from 'react';

const SaveCandidate = () => {
  const [data, setData] = useState<Candidate[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleGetMyJobs = async () => {
    try {
      setLoading(true);
      const res = await EmployerService.getSavedCandidate(page, 10);

      const entity = res?.data;
      if (entity) {
        setData(entity);
        setTotal(res.meta.totalElements);
      }
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetMyJobs();
  }, [page]);

  return (
    <div>
      <DashboardHeader title="Ứng viên đã lưu" />
      <br />
      <DashboardListSaveCandidate
        data={data}
        page={page}
        setPage={setPage}
        loading={loading}
        total={total}
        setData={setData}
      />
    </div>
  );
};

export default SaveCandidate;
