'use client';

import { useEffect, useState } from 'react';
import { GlassCard } from '@/components/client/Cards/GlassCard';
import { JobCardMini } from '@/components/client/Jobs/JobCardMini';
import { Router } from '@/constants';
import { CompanyService } from '@/services/company.services';
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CompanyJobPageResponse } from '@/types';
import { LoadingCircle } from '@/components/Loadings/LoadingCircle';

const CompanyDetailPosition = ({ companyId }: { companyId: string | number }) => {
  const [jobs, setJobs] = useState<CompanyJobPageResponse[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchJobs = async (pageNumber = 1) => {
    try {
      const res = await CompanyService.getJobCompany({
        companyId,
        page: pageNumber,
        size: 10,
      });

      const newJobs = res.data?.content ?? [];

      setJobs(prev => [...prev, ...newJobs]);
      setHasMore(res.data?.content === 10);
    } catch (error) {
      console.error('Error fetching jobs', error);
    }
  };

  useEffect(() => {
    fetchJobs(1);
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchJobs(nextPage);
  };

  return (
    <>
      <div id="open-position"></div>
      <GlassCard
        className="mt-10"
        title={<h1 className="mb-[8px] text-[20px] font-bold">Open Positions</h1>}
        action
      >
        {jobs.length > 0 ? (
          <InfiniteScroll
            dataLength={jobs.length}
            next={loadMore}
            hasMore={hasMore}
            className="pt-[16px]"
            loader={<LoadingCircle />}
          >
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-[16px]">
              {jobs.map(job => (
                <Link href={Router.JOB.DETAIL(job.slug ?? '')} key={job.id}>
                  <JobCardMini job={job} />
                </Link>
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          <div className="text-center py-4">Không tuyển dụng</div>
        )}
      </GlassCard>
    </>
  );
};

export default CompanyDetailPosition;
