import { Badge } from '@/components/ui/badge';
import { CompanyJobPageResponse } from '@/types';
import { GlassCard } from '../Cards/GlassCard';
import { getLabelJobType } from '@/utils';
import { formatNumber } from '@/utils/common';

export function JobCardMini({ job }: { job: CompanyJobPageResponse }) {
  if (!job) return null;
  return (
    <GlassCard
      className="hover:cursor-pointer"
      title={
        <div className="flex gap-3">
          {/* <CustomImage src="" alt="" /> */}
          <div className="space-x-2 space-y-1">
            <p className="font-semibold line-clamp-1 text-sm" title="Company name">
              {job?.jobTitle}
            </p>
            <Badge className="rounded-full text-red-700 bg-red-100 capitalize">featured</Badge>
            {/* <span className="text-xs flex items-center gap-1">
              <MapPinIcon size={14} />
              {job.jobTitle}
            </span> */}
          </div>
        </div>
      }
      action
    >
      {/* <div className="flex">
        <p className="font-semibold line-clamp-1" title="Senior Front-End Developer (Angular)">
          {job.jobTitle}
        </p>
      </div> */}
      <div className="text-xs flex items-center">
        <span>{getLabelJobType(job?.jobType)}</span>
        <span className="size-1 inline-block rounded-full border bg-white mx-2" />
        <span>
          ${formatNumber(job.minSalary)} - ${formatNumber(job.maxSalary)}
        </span>
      </div>
    </GlassCard>
  );
}
