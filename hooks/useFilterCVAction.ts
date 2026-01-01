import { JobApplicationStatus } from '@/constants/job';
import { EmployerService } from '@/services/employer.services';
import { JobServices } from '@/services/job.services';
import { DataFilter, UpdateData } from '@/types';
import {
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
    onSuccess: () => {
      toast.success('Update status successfully');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [key, { jobId, params }] });
    },
  });

  return { useFilterQuery, useUpdateStatusMutation };
};

export default useFilterCVAction;
