'use client';

import { FilterJob, IFilter } from '@/components/client/Filters/FilterJob';
import ListJob from '@/components/client/FindJobs/list-job';
import { JobServices } from '@/services/job.services';
import { JobItem, ParamGetJob } from '@/types';
import { getLabelLocationByValue, parseSalaryRange } from '@/utils/common';
import { useEffect, useState } from 'react';

const FindJob = () => {
  const [items, setItems] = useState<JobItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const size = 20;

  const fetchData = async (data: ParamGetJob) => {
    try {
      const res = await JobServices.getJobs({
        ...data,
        page: data.page,
        size: size,
      });

      const content = res?.data || [];

      setItems(prev => (data.page === 1 ? content : [...prev, ...content]));
      setHasMore(res?.meta.hasNext);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchData({ page: 1 });
  }, []);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    fetchData({ page: nextPage });
    setPage(nextPage);
  };

  const handleSubmit = (filters: IFilter) => {
    const salary = parseSalaryRange(filters.salary);
    const params = {
      page: 1,
      keyword: filters.search,
      location: filters?.location ? getLabelLocationByValue(filters?.location) : '',
      // category: filters.categories || undefined,
      jobTypes: filters.jobType.filter(Boolean),
      educationLevels: filters.education.filter(Boolean),
      experienceLevel: filters.exp,
      minSalary: salary.minSalary,
      maxSalary: salary?.maxSalary ?? undefined,
    };

    setItems([]);
    setHasMore(true);
    setPage(1);
    fetchData(params);
  };

  return (
    <div>
      <FilterJob handleSubmit={handleSubmit} isActiveCategory={false} />
      <ListJob items={items} hasMore={hasMore} fetchMoreData={fetchMoreData} />
    </div>
  );
};

export default FindJob;
