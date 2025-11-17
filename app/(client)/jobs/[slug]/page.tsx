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
import { ROLE_USER } from '@/constants';
import { setLoading } from '@/lib/features/common/commonSlice';
import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { CandidateService } from '@/services/candidate.services';
import { JobServices } from '@/services/job.services';
import { JobDetail } from '@/types/job';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { debounce } from 'lodash';
import { ArrowRightIcon, CheckCheckIcon, HeartIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

const JobDetailPage = () => {
  const dispatch = useDispatch();
  const loading = useAppSelector((state: RootState) => state.common.isLoading);
  const [showApplyJobModal, setShowApplyJobModal] = useState<boolean>(false);
  const [job, setJob] = useState<JobDetail>();
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
  const currentUser = useAppSelector(state => state.auth.currentUser);

  const isCandidate = currentUser?.role === ROLE_USER.CANDIDATE;

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

  const handleFetchToggleFollowJob = useCallback(
    debounce(
      async (isFav: boolean, id: string) => {
        try {
          if (isFav) {
            await CandidateService.unfollowJob(id);
            setJob(prev => (prev ? { ...prev, isFavorite: false } : prev));
            toast.success('Unfollow job successfully!');
          } else {
            await CandidateService.followJob(id);
            setJob(prev => (prev ? { ...prev, isFavorite: true } : prev));
            toast.success('Follow job successfully!');
          }
        } catch (err) {
          console.error('Toggle follow error:', err);
        }
      },
      400,
      { trailing: true }
    ),
    []
  );

  const handleToggleFollowJob = () => {
    if (!job) return;

    const isFav = job.isFavorite;

    if (isFav) {
      setJob(prev => (prev ? { ...prev, isFavorite: false } : prev));
    } else {
      setJob(prev => (prev ? { ...prev, isFavorite: true } : prev));
    }

    handleFetchToggleFollowJob(isFav, job.id);
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
          {isCandidate && (
            <div className="flex items-center">
              <CustomButton
                className="hover:bg-transparent hover:text-red-500"
                onClick={handleToggleFollowJob}
              >
                <HeartIcon className="size-6" fill={job.isFavorite ? 'red' : 'none'} />
              </CustomButton>
              {job.isApplied ? (
                <CustomButton className="bg-green-500 text-white hover:bg-green-500">
                  Applied <CheckCheckIcon />
                </CustomButton>
              ) : (
                <CustomButton
                  onClick={() => setShowApplyJobModal(true)}
                  className="bg-white/30 text-white hover:bg-white/20 hover:text-gray-200"
                >
                  Ứng tuyển nhay
                  <ArrowRightIcon />
                </CustomButton>
              )}
            </div>
          )}
          <p className="text-sm mt-3">
            Ngày hết hạn:{' '}
            <span className="text-red-400 capitalize">
              {format(job.expirationDate, 'dd MMM, yyy', { locale: vi })}
            </span>
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
      <RelatedJob categoryId={job.jobCategories[0]?.name} />

      {showApplyJobModal && (
        <ApplyJobForm job={job} onClose={() => setShowApplyJobModal(false)} setJob={setJob} />
      )}
    </GlassCard>
  );
};

export default JobDetailPage;
