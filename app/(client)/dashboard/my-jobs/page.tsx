'use client';
import DashboardHeader from '@/components/client/Dashboard/DashboardHeader';
import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DashboardListMyJobs from '@/components/client/Dashboard/DashboardListMyJobs';
import { EmployerService } from '@/services/employer.services';
import { MyJobPageResponse } from '@/types';

const jobStatus = [
  {
    value: 'ALL',
    label: 'All Jobs',
  },
  {
    value: 'ACTIVE',
    label: 'Active',
  },
  {
    value: 'EXPIRED',
    label: 'Expire',
  },
];

const MyJobs = () => {
  const [data, setData] = useState<MyJobPageResponse[]>([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState(jobStatus[0].value);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleGetMyJobs = async () => {
    try {
      setLoading(true);
      const res = await EmployerService.getMyJobs(page, 10, filter);
      setData(res.data?.content || []);
      setTotal(res.data?.totalElements || 0);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetMyJobs();
  }, [filter, page]);

  return (
    <div>
      <DashboardHeader title="My Jobs " count={total || 0}>
        <div className="flex gap-4 text-[14px] items-center">
          <h1>Job Status</h1>
          <Select defaultValue={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              {jobStatus.map(item => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </DashboardHeader>

      <DashboardListMyJobs
        data={data}
        page={page}
        setPage={setPage}
        loading={loading}
        total={total}
        setData={setData}
      />
    </div>
  );
};

export default MyJobs;
