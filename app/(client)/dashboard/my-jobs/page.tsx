'use client';
import DashboardHeader from '@/components/client/Dashboard/DashboardHeader';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DashboardListMyJobs from '@/components/client/Dashboard/DashboardListMyJobs';

const jobStatus = [
  {
    value: 'all',
    label: 'All Jobs',
  },
  {
    value: 'active',
    label: 'Active',
  },
  {
    value: 'Expire',
    label: 'Expire',
  },
];

const MyJobs = () => {
  return (
    <div>
      <DashboardHeader title="My Jobs" count={589}>
        <div className="flex gap-4 text-[14px] items-center">
          <h1>Job Status</h1>
          <Select defaultValue={jobStatus[0].value}>
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
      <DashboardListMyJobs />
    </div>
  );
};

export default MyJobs;
