'use client';

import { useEffect, useState } from 'react';
import GlassCardBase from '../Cards/GlassCardBase';
import ApplicationItem from './ApplicationItem';
import { useParams } from 'next/navigation';
import InfiniteScroll from 'react-infinite-scroll-component';
import { EmployerService } from '@/services/employer.services';
import { ApplicationBriefResponse } from '@/types';

interface IApplicationList {
  title: string;
}

export const ApplicationList: React.FC<IApplicationList> = ({ title }) => {
  const { id } = useParams();
  const jobId = id as string;

  const [items, setItems] = useState<ApplicationBriefResponse[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const PAGE_SIZE = 10;

  const fetchApplications = async () => {
    if (!jobId || loading) return;

    setLoading(true);
    try {
      const res = await EmployerService.getAllCvByJob(page, PAGE_SIZE, jobId);

      const newItems = res?.data || [];

      console.log('res?.data', res?.data);

      setItems(prev => [...prev, ...newItems]);

      if (newItems.length < PAGE_SIZE) {
        setHasMore(false);
      } else {
        setPage(prev => prev + 1);
      }
    } catch (err) {
      console.error('Error fetching CVs', err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setItems([]);
    setPage(0);
    setHasMore(true);
    fetchApplications();
  }, []);

  return (
    <GlassCardBase className="mt-[32px] w-full">
      <div className="w-full">
        <h1 className="font-bold text-[16px] mb-[20px]">{title}</h1>

        {!loading && !items.length && <p className="text-center">Chưa có đơn nào </p>}

        <InfiniteScroll
          dataLength={items.length}
          next={fetchApplications}
          hasMore={hasMore}
          loader={<p className="text-center py-3">Loading...</p>}
          height={600}
        >
          <div className="grid grid-cols-1 gap-4 w-full py-[10px]">
            {items.map((item, i) => (
              <ApplicationItem key={i} item={item} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </GlassCardBase>
  );
};
