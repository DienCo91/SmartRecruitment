import DashboardHeader from '@/components/client/Dashboard/DashboardHeader';
import DashboardListSaveCandidate from '@/components/client/Dashboard/DashboardListSaveCandidate';
import React from 'react';

const SaveCandidate = () => {
  return (
    <div>
      <DashboardHeader title="Saved Candidates" />
      <DashboardListSaveCandidate />
    </div>
  );
};

export default SaveCandidate;
