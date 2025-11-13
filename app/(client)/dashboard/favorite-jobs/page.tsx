'use client';

import DashboardHeader from '@/components/client/Dashboard/DashboardHeader';
import FavoriteJobsList from '@/components/client/Dashboard/FavoriteJobsList';
import { CandidateService } from '@/services/candidate.services';
import { JobFav } from '@/types';
import React, { useEffect, useState } from 'react';

const FavoriteJobs = () => {
  const [data, setData] = useState<JobFav[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleGetMyJobs = async (keyword?: string) => {
    try {
      setLoading(true);
      const res = await CandidateService.getFavoriteJob(page, 10, keyword);
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
      <DashboardHeader title="Favorite Jobs" count={total} />
      <FavoriteJobsList
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

export default FavoriteJobs;
