'use client';

import { GlassCard } from '@/components/client/Cards/GlassCard';
import { JobCard } from '@/components/client/Cards/JobCard';
import { FilterJob } from '@/components/client/Filters/FilterJob';
import * as _ from 'lodash';

const HomePage = () => {
  return (
    <div className="relative">
      <FilterJob />
      <div className="grid grid-cols-12 mt-[50px]">
        <GlassCard
          title="Việc làm hot"
          className="col-span-8"
          footer={<div className="absolute right-3">1/2</div>}
        >
          <div className="flex flex-col">
            {_.range(0, 5, 1).map((_, i) => (
              <JobCard key={i} />
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default HomePage;
