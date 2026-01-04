import { QueryKey as QueryKeyConstants } from '@/constants';
import { EmployerService } from '@/services/employer.services';
import { JobServices } from '@/services/job.services';
import { ApplicationBriefResponse, DataFilter, UpdateData } from '@/types';
import {
  InfiniteData,
  keepPreviousData,
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'sonner';

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
  const queryClient = useQueryClient();

  const fetchData = async ({ pageParam }: QueryFunctionContext<QueryKey, number>) => {
    if (!jobId) return [];
    const res = await EmployerService.getAllCvByJob(pageParam, PAGE_SIZE, jobId, params);

    return res?.data || [];
  };

  //fetch inf
  const useFilterQuery = useInfiniteQuery({
    queryKey: [key, { jobId, params }],
    queryFn: fetchData,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.length < PAGE_SIZE ? undefined : pages.length + 1,
    enabled: !!jobId,
    placeholderData: prev => prev,
  });

  //update status
  const useUpdateStatusMutation = useMutation({
    mutationFn: (data: UpdateData) => {
      return JobServices.updateApplication({
        applicationId: data.applicationId,
        jobId: data.jobId as string,
        status: data.status,
      });
    },
    onSuccess: (_res, variables) => {
      toast.success('Update status successfully');

      // Update ALL CV list
      queryClient.setQueriesData<InfiniteData<ApplicationBriefResponse[]>>(
        { queryKey: [QueryKeyConstants.application.allCV] },
        oldData => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map(page =>
              page.map(item =>
                item.applicationId === variables.applicationId
                  ? { ...item, status: variables.status }
                  : item
              )
            ),
          };
        }
      );

      //  Update FILTER CV list
      queryClient.setQueriesData<InfiniteData<ApplicationBriefResponse[]>>(
        { queryKey: [QueryKeyConstants.application.filterCV] },
        oldData => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map(page =>
              page.map(item =>
                item.applicationId === variables.applicationId
                  ? { ...item, status: variables.status }
                  : item
              )
            ),
          };
        }
      );
    },
  });

  return { useFilterQuery, useUpdateStatusMutation };
};

export default useFilterCVAction;
