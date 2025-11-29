import { LoadingCircle } from '@/components/Loadings/LoadingCircle';
import { setLoading } from '@/lib/features/common/commonSlice';
import { useAppDispatch } from '@/lib/hooks';
import { EmployerService } from '@/services/employer.services';
import { MyJobPageResponse } from '@/types';
import React from 'react';
import { toast } from 'sonner';
import GlassCardBase from '../Cards/GlassCardBase';
import { CustomPagination } from '../CustomPagination';
import MyJobItem from './MyJobItem';

interface IDashboardListMyJobs {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  data: MyJobPageResponse[];
  page: number;
  loading: boolean;
  total: number;
  setData: React.Dispatch<React.SetStateAction<MyJobPageResponse[]>>;
}

const DashboardListMyJobs: React.FC<IDashboardListMyJobs> = ({
  data,
  setPage,
  page,
  loading,
  total,
  setData,
}) => {
  const dispatch = useAppDispatch();
  const totalPage = Math.ceil(total / 10); // 10 items per page

  const onMakeItExpire = async (id: string) => {
    dispatch(setLoading(true));
    try {
      const res = await EmployerService.expireJob(id);

      console.log('res', res);
      toast.success('Make expire job successfully');
      const newData = data.map(item => {
        if (item.id === id) return { ...item, status: 'EXPIRED' };
        return item;
      });

      setData(newData);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="mt-[32px] min-h-[600px] flex flex-col justify-between ">
      <GlassCardBase className="grid  grid-cols-[2fr_1fr_1.5fr_1.5fr] items-center text-[12px] font-bold bg-white/30 hover:translate-y-0">
        <h1>JOBS</h1>
        <h1>STATUS</h1>
        <h1>APPLICATIONS</h1>
        <h1>ACTIONS</h1>
      </GlassCardBase>

      <div className="space-y-4 mt-[20px] flex-1">
        {loading ? (
          <LoadingCircle />
        ) : data.length > 0 ? (
          data.map(item => (
            <MyJobItem key={item.id} item={item} onMakeItExpire={() => onMakeItExpire(item.id)} />
          ))
        ) : (
          <div className="flex items-center justify-center w-full h-full">No jobs found</div>
        )}
      </div>

      {totalPage > 1 ? (
        <CustomPagination
          className="mt-[20px]"
          totalPages={totalPage}
          currentPage={page}
          onPageChange={p => setPage(p)}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default DashboardListMyJobs;
