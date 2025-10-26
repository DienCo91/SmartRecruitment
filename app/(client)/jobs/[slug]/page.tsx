'use client';

import { CustomButton } from '@/components/Buttons/CustomButton';
import { GlassCard } from '@/components/client/Cards/GlassCard';
import { CompanyOverView } from '@/components/client/Company/CompanyOverview';
import { ApplyJobForm } from '@/components/client/Forms/ApplyJobForm';
import { DecorateContent } from '@/components/client/Jobs/DecorateContent';
import { JobHeader } from '@/components/client/Jobs/JobHeader';
import { JobOverView } from '@/components/client/Jobs/JobOverView';
import { Jobtags } from '@/components/client/Jobs/JobTags';
import { RelatedJob } from '@/components/client/Jobs/RelatedJob';
import { Separator } from '@/components/ui/separator';
import { mockedJob } from '@/constants/mockedData';
import { Job } from '@/types/job';
import { format } from 'date-fns';
import { ArrowRightIcon, HeartIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const JobDetailPage = () => {
  const [showApplyJobModal, setShowApplyJobModal] = useState<boolean>(false);
  const [job, setJob] = useState<Job>(mockedJob);
  const { slug } = useParams();

  return (
    <GlassCard
      className="mt-10 hover:bg-transparent"
      title={<JobHeader {...job} />}
      action={
        <>
          <div className="flex items-center">
            <CustomButton className="hover:bg-transparent hover:text-red-500">
              <HeartIcon className="size-6" fill="red" />
            </CustomButton>
            <CustomButton
              onClick={() => setShowApplyJobModal(true)}
              className="bg-white/30 text-white hover:bg-white/20 hover:text-gray-200"
            >
              Apply now
              <ArrowRightIcon />
            </CustomButton>
          </div>
          <p className="text-sm mt-3">
            Job expired in:{' '}
            <span className="text-red-400">{format(job.expiration_date, 'MMM dd, yyy')}</span>
          </p>
        </>
      }
    >
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-7">
          <Separator className="bg-gray-500" />
          {job.description && <DecorateContent title="Job Description" content={job.description} />}
          {job.responsibilities && (
            <DecorateContent title="Responsibilities" content={job.responsibilities} />
          )}
          {/* {job.tags &&  */}
          <Jobtags />
          {/* } */}
        </div>
        <div className="col-span-5 space-y-5">
          <JobOverView {...job} />
          <CompanyOverView company={job.company} />
        </div>
      </div>
      <Separator className="my-5 bg-gray-500" />
      <RelatedJob />

      {showApplyJobModal && (
        <ApplyJobForm title={job.title} onClose={() => setShowApplyJobModal(false)} />
      )}
    </GlassCard>
  );
};

export default JobDetailPage;
