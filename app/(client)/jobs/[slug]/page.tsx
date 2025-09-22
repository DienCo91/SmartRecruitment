'use client';

import { GlassCard } from '@/components/client/Cards/GlassCard';
import { JobHeader } from '@/components/client/Jobs/JobHeader';
import { Button } from '@/components/ui/button';
import { mockedJob } from '@/constants/mockedData';
import { Job } from '@/types/job';
import { ArrowRightIcon, HeartIcon } from 'lucide-react';
import { format } from 'date-fns';
import { use, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { JobContent } from '@/components/client/Jobs/JobContent';

const JobDetailPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);

  const [job, setJob] = useState<Job>(mockedJob);
  console.log(job);

  return (
    <GlassCard
      className="mt-5"
      title={<JobHeader job={job} />}
      action={
        <>
          <div className="flex items-center">
            <Button variant="ghost" className="hover:bg-transparent hover:text-red-500">
              <HeartIcon className="size-6" fill="red" />
            </Button>
            <Button variant="outline" className="bg-white/30 hover:bg-white/20 hover:text-gray-200">
              Apply now
              <ArrowRightIcon />
            </Button>
          </div>
          <p className="text-sm mt-3">
            Job expired in:{' '}
            <span className="text-red-400">{format(job.expiration_date, 'MMM dd, yyy')}</span>
          </p>
        </>
      }
    >
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-8">
          <Separator />
          {job.description && <JobContent title="Description" content={job.description} />}
          {job.responsibilities && (
            <JobContent title="Responsibilities" content={job.responsibilities} />
          )}
        </div>
        <div className="col-span-4">hahah</div>
      </div>
    </GlassCard>
  );
};

export default JobDetailPage;
