'use client';

import { useMemo, useState } from 'react';
import { GlassCard } from '../Cards/GlassCard';
import { CompanyCard } from './CompanyCard';
import * as _ from 'lodash';
import { CustomPagination } from '../Paginations/CustomPagination';

export function TopCompanies() {
  const [pagination, setPagination] = useState({
    current: 1,
    total: 20,
    limit: 6,
  });

  const pages = useMemo(() => {
    return _.range(0, pagination.limit, 1).map((_, i) => <CompanyCard key={i} />);
  }, [pagination]);

  return (
    <GlassCard
      icon="🕋"
      title="Top công ty"
      className="mt-5"
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
      <div className="grid grid-cols-2 gap-3">{pages}</div>
    </GlassCard>
  );
}
