'use client';
import { LoadingCircle } from '@/components/Loadings/LoadingCircle';
import { Router } from '@/constants';
import { JobServices } from '@/services/job.services';
import { CompanyJobPageResponse } from '@/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { JobCardMini } from './JobCardMini';

export function RelatedJob({ categoryId }: { categoryId?: string }) {
  const [jobs, setJobs] = useState<CompanyJobPageResponse[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const size = 10;

  const fetchData = async (page: number) => {
    try {
      const res = await JobServices.getJobs({
        page: page,
        size: size,
        categoryId: categoryId,
      });
      const content = res?.data?.content || [];
      const total = res?.data?.totalElements || 0;

      setJobs(prev => (page === 1 ? content : [...prev, ...content]));
      setHasMore(page * size < total);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage);
  };

  return (
    <>
      <div className="flex justify-between">
        <h3 className="font-semibold text-xl">Related Jobs</h3>
      </div>

      {jobs.length > 0 ? (
        <div className="grid grid-cols-3 mt-5 gap-3">
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
        </div>
      ) : (
        <div className="text-center w-full py-[60px]">Not Found Related Jobs</div>
      )}
    </>
  );
}
