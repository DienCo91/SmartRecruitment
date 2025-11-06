import { JobDetail } from '@/types';
import { getLabelEducation, getLabelExperience, getLabelJobType } from '@/utils';
import { formatNumber } from '@/utils/common';
import { format } from 'date-fns';
import { GlassCard } from '../Cards/GlassCard';
import { JobOverViewItems } from './JobOverViewItem';

export function JobOverView({ job }: { job: JobDetail }) {
  return (
    <GlassCard title="Job Overview" action>
      <div className="grid grid-cols-3 gap-3">
        <JobOverViewItems.Posted content={format(job.postedAt, 'dd MMM, yyy')} />
        <JobOverViewItems.ExpiredIn content={format(job.expirationDate, 'dd MMM, yyy')} />
        <JobOverViewItems.Education content={getLabelEducation(job.educationLevel) || ''} />
        <JobOverViewItems.Salary
          content={`$${formatNumber(job.minSalary)} - $${formatNumber(job.maxSalary)}`}
        />
        <JobOverViewItems.Location
          content={
            job.location.commune + ', ' + job.location.provinceCity + ', ' + job.location.country
          }
        />
        <JobOverViewItems.JobType content={getLabelJobType(job.jobType) || ''} />
        <JobOverViewItems.Experience content={getLabelExperience(job.experienceLevel) || ''} />
      </div>
    </GlassCard>
  );
}
