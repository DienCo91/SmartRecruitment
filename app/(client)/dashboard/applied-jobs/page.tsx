'use client';

import DashboardHeader from '@/components/client/Dashboard/DashboardHeader';
import ListApplyJob from '@/components/client/Dashboard/ListApplyJob';
import { CandidateService } from '@/services/candidate.services';
import { AppliedJobResponse } from '@/types';
import { useEffect, useState } from 'react';

const ApplyJobs = () => {
  const [data, setData] = useState<AppliedJobResponse[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleGetMyJobs = async (keyword?: string) => {
    try {
      setLoading(true);
      const res = await CandidateService.getApplyJob(page, 10, keyword);

      const entity = res?.data;
      if (entity) {
        console.log('entity.content', entity.content);
        setData(entity.content);
        setTotal(entity.totalElements);
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

  const handleSearch = async (keyword: string) => {
    setPage(1);
    handleGetMyJobs(keyword);
  };

  return (
    <div>
      <DashboardHeader title="Applied Jobs" count={total} />
      <ListApplyJob
        data={data}
        page={page}
        setPage={setPage}
        handleSearch={handleSearch}
        loading={loading}
        total={total}
      />
    </div>
  );
};

export default ApplyJobs;
