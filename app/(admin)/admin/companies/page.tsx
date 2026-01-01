'use client';
import { DataTableDemo } from '@/components/admin/companies/data-table';
import { setLoading } from '@/lib/features/common/commonSlice';
import { useAppDispatch } from '@/lib/hooks';
import { AdminService } from '@/services/admin.services';
import { IEmployerDashboard } from '@/types';
import { useEffect, useState } from 'react';

const CompanyManager = () => {
  const [data, setData] = useState<IEmployerDashboard[]>([]);
  const dispatch = useAppDispatch();

  const getData = async () => {
    try {
      dispatch(setLoading(true));
      const res = await AdminService.getCompanies({ page: 1, size: 1000 });
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
      <p className="font-bold">Quản lý nhà tuyển dụng</p>
      <DataTableDemo data={data} setData={setData} />
    </div>
  );
};

export default CompanyManager;
