'use client';

import { ChartAreaInteractive } from '@/components/admin/dashboard/chart';
import { SectionCards } from '@/components/admin/dashboard/section-card';
import { setLoading } from '@/lib/features/common/commonSlice';
import { useAppDispatch } from '@/lib/hooks';
import { AdminService } from '@/services/admin.services';
import { useEffect, useState } from 'react';

export interface IDataDashBoard {
  totalCandidates: number;
  totalCompanies: number;
  totalJobs: number;
  totalBlogs: number;
}

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<IDataDashBoard>();
  const getDashBoard = async () => {
    dispatch(setLoading(true));
    try {
      const res = await AdminService.getDashboard();
      setData(res.data);
    } catch (e) {
      console.log('e', e);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getDashBoard();
  }, []);

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6 p-[16px]">
      <SectionCards data={data} />
      <ChartAreaInteractive />
    </div>
  );
}
