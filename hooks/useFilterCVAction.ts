import { EmployerService } from '@/services/employer.services';
import { DataFilter } from '@/types';
import { QueryFunctionContext, QueryKey, useInfiniteQuery } from '@tanstack/react-query';

const PAGE_SIZE = 10;

const useFilterCVAction = ({
  jobId,
  key,
  params,
}: {
  jobId?: string;
  key: string;
  params?: DataFilter;
}) => {
  const fetchData = async ({ pageParam }: QueryFunctionContext<QueryKey, number>) => {
    if (!jobId) return [];
    const res = await EmployerService.getAllCvByJob(pageParam, PAGE_SIZE, jobId, params);

    return res?.data || [];
  };

  const useFilterQuery = useInfiniteQuery({
    queryKey: [key, { jobId, params }],
    queryFn: fetchData,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.length < PAGE_SIZE ? undefined : pages.length + 1,
    enabled: !!jobId,
  });

  return { useFilterQuery };
};

export default useFilterCVAction;
