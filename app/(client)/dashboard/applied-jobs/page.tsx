import DashboardHeader from '@/components/client/Dashboard/DashboardHeader';
import ListApplyJob from '@/components/client/Dashboard/ListApplyJob';
import React from 'react';

const ApplyJobs = () => {
  return (
    <div>
      <DashboardHeader title="Applied Jobs" count={589} />

      <ListApplyJob />
    </div>
  );
};

export default ApplyJobs;
