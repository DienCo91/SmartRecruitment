'use client';
import { DataTableDemo } from '@/components/admin/candidates/data-table';
import { Typography } from '@/components/ui/typography';
import { setLoading } from '@/lib/features/common/commonSlice';
import { useAppDispatch } from '@/lib/hooks';
import { AdminService } from '@/services/admin.services';
import { ICandidateDashboard } from '@/types';
import React, { useEffect, useState } from 'react';

const CandidateManager = () => {
  const [data, setData] = useState<ICandidateDashboard[]>([]);
  const dispatch = useAppDispatch();

  const getData = async () => {
    try {
      dispatch(setLoading(true));
      const res = await AdminService.getCandidates({ page: 1, size: 1000 });
      setData(res.data.content);
    } catch (error) {
      console.log('error', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="p-[16px]">
      <Typography variant="h5">Quản lý ứng viên</Typography>
      <DataTableDemo data={data} setData={setData} />
    </div>
  );
};

export default CandidateManager;
