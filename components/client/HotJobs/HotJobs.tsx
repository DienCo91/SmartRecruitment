import { GlassCard } from '../Cards/GlassCard';
import { JobCard } from '../Cards/JobCard';
import * as _ from 'lodash';
import { CustomPagination } from '../Paginations/CustomPagination';
import { useMemo, useState } from 'react';

export function HotJobs() {
  const [pagination, setPagination] = useState({
    current: 1,
    total: 20,
    limit: 5,
  });

  const pages = useMemo(() => {
    return _.range(0, pagination.limit, 1).map((_, i) => <JobCard key={i} />);
  }, [pagination]);

  return (
    <GlassCard
      icon="🔥"
      title="Việc làm hot"
      footer={
        <CustomPagination
          className="w-full"
          curPage={pagination.current}
          totalPage={pagination.total}
          onPageChange={page => {
            setPagination(prev => ({ ...prev, current: page }));
          }}
        />
      }
    >
      <div className="flex flex-col">{pages}</div>
    </GlassCard>
  );
}
