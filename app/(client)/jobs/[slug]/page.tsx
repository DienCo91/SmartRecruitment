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
import { LoadingCircle } from '@/components/Loadings/LoadingCircle';
import { Separator } from '@/components/ui/separator';
import { setLoading } from '@/lib/features/common/commonSlice';
import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { CandidateService } from '@/services/candidate.services';
import { JobServices } from '@/services/job.services';
import { JobDetail } from '@/types/job';
import { format } from 'date-fns';
import { ArrowRightIcon, HeartIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

const JobDetailPage = () => {
  const dispatch = useDispatch();
  const loading = useAppSelector((state: RootState) => state.common.isLoading);
  const [showApplyJobModal, setShowApplyJobModal] = useState<boolean>(false);
  const [job, setJob] = useState<JobDetail>();
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  const fetchJobDetail = async (slugParam: string) => {
    try {
      dispatch(setLoading(true));
      const data = await JobServices.getJobBySlug(slugParam);
      setJob(data.data);
    } catch (err) {
      console.error('Error fetching job detail:', err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleToggleFollowJob = async () => {
    if (!job) return;

    try {
      dispatch(setLoading(true));

      if (job.isFavorite) {
        await CandidateService.unfollowJob(job.id);
        setJob(prev => (prev ? { ...prev, isFavorite: false } : prev));
        toast.success('Unfollow job successfully!');
      } else {
        await CandidateService.followJob(job.id);
        setJob(prev => (prev ? { ...prev, isFavorite: true } : prev));
        toast.success('Follow job successfully!');
      }
    } catch (err) {
      console.error('Toggle follow error:', err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (!slug) return;
    fetchJobDetail(slug);
  }, []);

  if (!job && loading) return;

  if (!job) return <div>Job not found</div>;

  return (
    <GlassCard
      className="mt-10 hover:bg-transparent"
      title={<JobHeader job={job} />}
      action={
        <>
          <div className="flex items-center">
            <CustomButton
              className="hover:bg-transparent hover:text-red-500"
              onClick={handleToggleFollowJob}
            >
              <HeartIcon className="size-6" fill={job.isFavorite ? 'red' : 'none'} />
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
            <span className="text-red-400">{format(job.expirationDate, 'MMM dd, yyy')}</span>
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
          <JobOverView job={job} />
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
