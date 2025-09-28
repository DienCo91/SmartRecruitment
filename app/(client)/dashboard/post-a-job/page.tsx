'use client';
import DashboardFormPostJob from '@/components/client/Dashboard/DashboardFormPostJob';
import DashboardHeader from '@/components/client/Dashboard/DashboardHeader';

import React from 'react';

const PostAJob = () => {
  return (
    <div>
      <DashboardHeader title="Post a Job" />
      <DashboardFormPostJob />
    </div>
  );
};

export default PostAJob;
