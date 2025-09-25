import { format } from 'date-fns';
import { GlassCard } from '../Cards/GlassCard';
import { JobOverViewItems } from './JobOverViewItem';
import { Job } from '@/types';
import { educationLevel, experienceLevel, jobType, salaryType } from '@/constants';

export function JobOverView(
  jobOverview: Pick<
    Job,
    | 'posted_at'
    | 'expiration_date'
    | 'education_level'
    | 'min_salary'
    | 'max_salary'
    | 'salary_type'
    | 'location_id'
    | 'job_type'
    | 'experience_level'
  >
) {
  return (
    <GlassCard title="Job Overview" action>
      <div className="grid grid-cols-3 gap-3">
        <JobOverViewItems.Posted content={format(jobOverview.posted_at, 'dd MMM, yyy')} />
        <JobOverViewItems.ExpiredIn content={format(jobOverview.expiration_date, 'dd MMM, yyy')} />
        <JobOverViewItems.Education content={educationLevel[jobOverview.education_level]} />
        <JobOverViewItems.Salary
          content={`${jobOverview.min_salary} - ${jobOverview.max_salary} /${salaryType[jobOverview.salary_type]}`}
        />
        <JobOverViewItems.Location content={String(jobOverview.location_id)} />
        <JobOverViewItems.JobType content={jobType[jobOverview.job_type]} />
        <JobOverViewItems.Experience content={experienceLevel[jobOverview.experience_level]} />
      </div>
    </GlassCard>
  );
}
