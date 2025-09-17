import { GlassCard } from '../Cards/GlassCard';
import { JobCard } from '../Cards/JobCard';
import * as _ from 'lodash';

export function HotJobs() {
  return (
    <GlassCard icon="🔥" title="Việc làm hot" footer={<div className="absolute right-3">1/2</div>}>
      <div className="flex flex-col">
        {_.range(0, 5, 1).map((_, i) => (
          <JobCard key={i} />
        ))}
      </div>
    </GlassCard>
  );
}
