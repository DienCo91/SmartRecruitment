'use client';

import { LoadingCircle } from '@/components/Loadings/LoadingCircle';
import LoadingCustom from '@/components/ui/loading-custom';
import { QueryKey } from '@/constants/queryKey';
import useFilterCVAction from '@/hooks/useFilterCVAction';
import { ApplicationBriefResponse, DataFilter, UpdateData } from '@/types';
import { useParams } from 'next/navigation';
import InfiniteScroll from 'react-infinite-scroll-component';
import GlassCardBase from '../Cards/GlassCardBase';
import ApplicationItem from './ApplicationItem';

interface IApplicationList {
  title: string;
  params?: DataFilter;
  onViewDetailApplication: (item: ApplicationBriefResponse) => void;
}

export const ApplicationList: React.FC<IApplicationList> = ({
  title,
  params,
  onViewDetailApplication,
}) => {
  const { id } = useParams();
  const jobId = id as string;

  const { useFilterQuery, useUpdateStatusMutation } = useFilterCVAction({
    jobId,
    key: title === 'Đơn đã nộp' ? QueryKey.application.allCV : QueryKey.application.filterCV,
    params,
  });
  const { isPending, data, fetchNextPage, hasNextPage } = useFilterQuery;
  const { mutate, isPending: isUpdatePending } = useUpdateStatusMutation;

  const handleUpdateStatus = (payload: UpdateData) => {
    mutate(payload);
  };

  return (
    <GlassCardBase className="mt-[32px] w-full">
      <div className="w-full">
        <h1 className="font-bold text-[16px] mb-[20px]">{title}</h1>

        {!isPending && !data?.pages.flat()?.length && (
          <p className="text-center">Chưa có đơn nào </p>
        )}

        {(isPending || isUpdatePending) && <LoadingCustom className="bg-[#00000059] rounded-xl" />}

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
                <ApplicationItem
                  key={item.candidateId}
                  item={item}
                  handleUpdateStatus={handleUpdateStatus}
                  onViewDetailApplication={onViewDetailApplication}
                />
              ))
            )}
          </div>
        </InfiniteScroll>
      </div>
    </GlassCardBase>
  );
};
