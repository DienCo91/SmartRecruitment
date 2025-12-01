'use client';
import { LoadingCircle } from '@/components/Loadings/LoadingCircle';
import { useAppSelector } from '@/lib/hooks';
import { JobServices } from '@/services/job.services';
import { HotJob, Pagination } from '@/types';
import * as _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { GlassCard } from '../Cards/GlassCard';
import { CustomPagination } from '../Paginations/CustomPagination';
import { JobCard } from './JobCard';

export function HotJobs() {
  const [loading, setLoading] = useState<boolean>(false);
  const [jobs, setJobs] = useState<HotJob[]>([]);
  const filter = useAppSelector(state => state.filter);

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 5,
  });

  const fetchHotJobs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await JobServices.getJobs(
        _.assign(
          {
            page: pagination.page,
            size: pagination.limit,
          },
          filter
        )
      );
      const jobs = response.data as HotJob[];
      const paginate = response.meta as Pagination;
      setJobs(jobs);
      setPagination(paginate);
    } catch {
      toast.error('Đã xảy ra lỗi');
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, filter]);

  useEffect(() => {
    fetchHotJobs();
  }, [fetchHotJobs]);

  return (
    <GlassCard
      icon="🔥"
      title="Việc làm hot"
      footer={
        <>
          {Boolean(pagination.totalPages) && (
            <CustomPagination
              className="w-full"
              curPage={pagination.page!}
              totalPage={pagination.totalPages!}
              onPageChange={page => {
                setPagination(prev => ({ ...prev, page: page }));
              }}
            />
          )}
        </>
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
