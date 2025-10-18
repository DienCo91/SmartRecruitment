'use client';

import { FilterJob } from '@/components/client/Filters/FilterJob';
import ListJob from '@/components/client/FindJobs/list-job';

const FindJob = () => {
  return (
    <div>
      <FilterJob />
      <ListJob />
    </div>
  );
};

export default FindJob;
