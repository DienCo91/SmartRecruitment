'use client';

import { Ads } from '@/components/client/Ads/Ads';
import { Blogs } from '@/components/client/Blogs/Blogs';
import { TopCompanies } from '@/components/client/Company/TopCompanies';
import { FilterJob, IFilter } from '@/components/client/Filters/FilterJob';
import { HotJobs } from '@/components/client/Jobs/HotJobs';
import { PopularTags } from '@/components/client/Tags/PopularTags';
import { EducationLevel, ExperienceLevel, JobType } from '@/constants/job';
import { FilterState, setFilters } from '@/lib/features/filters/filterSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.filter);

  const handleSubmit = (values: IFilter) => {
    const [minSalary, maxSalary] = values.salary.split('-');
    const newFilter: FilterState = {
      ...filter,
      keyword: values.search,
      location: values.location,
      educationLevels: values.education as EducationLevel[],
      experienceLevel: values.exp as ExperienceLevel,
      jobTypes: values.jobType as JobType[],
      minSalary: minSalary ? +minSalary : undefined,
      maxSalary: maxSalary ? +maxSalary : undefined,
      categoryId: values.categories,
    };

    dispatch(setFilters(newFilter));
  };

  return (
    <div className="relative">
      <FilterJob handleSubmit={handleSubmit} />
      <div className="grid grid-cols-12 mt-[40px]">
        {/* Left card */}
        <div className="col-span-8 mr-3">
          <HotJobs />
          <TopCompanies />
        </div>
        {/* Right card */}
        <div className="col-span-4">
          <PopularTags />
          <Ads />
          <Blogs />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
