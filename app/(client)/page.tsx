'use client';

import { Ads } from '@/components/client/Ads/Ads';
import { TopCompanies } from '@/components/client/Company/TopCompanies';
import { FilterJob } from '@/components/client/Filters/FilterJob';
import { HotJobs } from '@/components/client/HotJobs/HotJobs';
import { PopularTags } from '@/components/client/Tags/PopularTags';

const HomePage = () => {
  return (
    <div className="relative">
      <FilterJob />
      <div className="grid grid-cols-12 mt-[50px]">
        {/* Left card */}
        <div className="col-span-8 mr-3">
          <HotJobs />
          <TopCompanies />
        </div>
        {/* Right card */}
        <div className="col-span-4">
          <PopularTags />
          <Ads />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
