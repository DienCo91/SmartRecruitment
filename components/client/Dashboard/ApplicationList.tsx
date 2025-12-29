'use client';

import LoadingCustom from '@/components/ui/loading-custom';
import useFilterCVAction from '@/hooks/useFilterCVAction';
import { ApplicationBriefResponse, DataFilter } from '@/types';
import { useParams } from 'next/navigation';
import InfiniteScroll from 'react-infinite-scroll-component';
import GlassCardBase from '../Cards/GlassCardBase';
import ApplicationItem from './ApplicationItem';
import { LoadingCircle } from '@/components/Loadings/LoadingCircle';
import { QueryKey } from '@/constants/queryKey';

interface IApplicationList {
  title: string;
  params?: DataFilter;
}

export const ApplicationList: React.FC<IApplicationList> = ({ title, params }) => {
  const { id } = useParams();
  const jobId = id as string;

  const { useFilterQuery } = useFilterCVAction({
    jobId,
    key: title === 'Đơn đã nộp' ? QueryKey.application.allCV : QueryKey.application.filterCV,
    params,
  });
  const { isPending, data, fetchNextPage, hasNextPage } = useFilterQuery;

  return (
    <GlassCardBase className="mt-[32px] w-full">
      <div className="w-full">
        <h1 className="font-bold text-[16px] mb-[20px]">{title}</h1>

        {!isPending && !data?.pages.flat()?.length && (
          <p className="text-center">Chưa có đơn nào </p>
        )}

        {isPending && <LoadingCustom className="bg-transparent" />}

        <InfiniteScroll
          dataLength={data?.pages?.flat().length || 0}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<LoadingCircle className="h-auto" />}
          height={600}
        >
          <div className="grid grid-cols-1 gap-4 w-full py-[10px]">
            {data?.pages.flatMap(items =>
              items.map((item: ApplicationBriefResponse) => (
                <ApplicationItem key={item.candidateId} item={item} />
              ))
            )}
          </div>
        </InfiniteScroll>
      </div>
    </GlassCardBase>
  );
};
