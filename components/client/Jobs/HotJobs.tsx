'use client';
import { LoadingCircle } from '@/components/Loadings/LoadingCircle';
import { JobServices } from '@/services/job.services';
import { HotJob } from '@/types';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { GlassCard } from '../Cards/GlassCard';
import { CustomPagination } from '../Paginations/CustomPagination';
import { JobCard } from './JobCard';

export function HotJobs() {
  const [loading, setLoading] = useState<boolean>(false);
  const [jobs, setJobs] = useState<HotJob[]>([]);

  const [pagination, setPagination] = useState({
    current: 1,
    total: 20,
    limit: 5,
  });

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const jobs = (await JobServices.getJobs()).data as HotJob[];
        console.log(jobs);
        setJobs(jobs);
      } catch {
        toast.error('Đã xảy ra lỗi');
      } finally {
        setLoading(false);
      }
    };

    void getData();
  }, []);

  return (
    <GlassCard
      icon="🔥"
      title="Việc làm hot"
      footer={
        <CustomPagination
          className="w-full"
          curPage={pagination.current}
          totalPage={pagination.total}
          onPageChange={page => {
            setPagination(prev => ({ ...prev, current: page }));
          }}
        />
      }
    >
      <div className="flex flex-col">
        {loading ? (
          <LoadingCircle />
        ) : Boolean(jobs.length) ? (
          jobs.map(job => <JobCard key={job.id} job={job} />)
        ) : (
          <p className="text-center">Không có hot job</p>
        )}
      </div>
    </GlassCard>
  );
}
