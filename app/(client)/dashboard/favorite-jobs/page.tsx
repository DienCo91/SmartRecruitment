import DashboardHeader from '@/components/client/Dashboard/DashboardHeader';
import FavoriteJobsList from '@/components/client/Dashboard/FavoriteJobsList';
import React from 'react';

const FavoriteJobs = () => {
  return (
    <div>
      <DashboardHeader title="Favorite Jobs" count={17} />
      <FavoriteJobsList />
    </div>
  );
};

export default FavoriteJobs;
