'use client';
import { Candidate } from '@/types';
import React, { useCallback } from 'react';
import { CustomPagination } from '../CustomPagination';
import SaveCandidateItem from './SaveCandidateItem';
import { LoadingCircle } from '@/components/Loadings/LoadingCircle';
import { EmployerService } from '@/services/employer.services';
import { toast } from 'sonner';

interface IDashboardListSaveCandidate {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  data: Candidate[];
  page: number;
  loading?: boolean;
  total: number;
  setData: React.Dispatch<React.SetStateAction<Candidate[]>>;
}

const DashboardListSaveCandidate: React.FC<IDashboardListSaveCandidate> = ({
  data,
  page,
  setPage,
  loading,
  total,
  setData,
}) => {
  const totalPage = Math.ceil(total / 10); // 10 items per page

  const removeItem = useCallback(async (id: number) => {
    await EmployerService.unSaveCandidate(id);
    setData(prev => prev.filter(item => item.id !== id));
    toast.success('Đã bỏ lưu ứng viên');
  }, []);

  return (
    <div>
      <div className="space-y-4 flex-1">
        {loading ? (
          <LoadingCircle className="mt-[100px]" />
        ) : data.length > 0 ? (
          data.map((item, index) => (
            <SaveCandidateItem
              key={item.id + '-' + index}
              item={item}
              removeItem={() => removeItem(item.id)}
            />
          ))
        ) : (
          <div className="flex items-center justify-center w-full h-full mt-[100px]">Not found</div>
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

export default DashboardListSaveCandidate;
