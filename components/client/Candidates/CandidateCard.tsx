import { AppImage } from '@/common';
import { CustomButton } from '@/components/Buttons/CustomButton';
import { setLoading } from '@/lib/features/common/commonSlice';
import { useAppDispatch } from '@/lib/hooks';
import { EmployerService } from '@/services/employer.services';
import { Candidate } from '@/types';
import { getLabelExperience } from '@/utils';
import { ArrowRightIcon, Bookmark, LightbulbIcon, MapPinIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { AvatarUser } from '../Avatar/AvatarUser';
import { GlassCard } from '../Cards/GlassCard';
import CandidateDetailModal from './CandidateDetailModal';

export function CandidateCard({ candidate }: { candidate: Candidate }) {
  const dispatch = useAppDispatch();
  const [showDetailUserModel, setShowDetailUserModel] = useState(false);
  const [candidateState, setCandidateState] = useState(candidate);

  const {
    fullName,
    avatarUrl,
    headline,
    experienceLevel,
    location,
    follow = false,
  } = candidateState;

  const handleToggleSaveCandidate = async () => {
    try {
      dispatch(setLoading(true));
      if (!follow) {
        await EmployerService.saveCandidate(candidateState.id);
        setCandidateState({ ...candidateState, follow: true });
        toast.success('Lưu ứng viên thành công');
      } else {
        await EmployerService.unSaveCandidate(candidateState.id);
        setCandidateState({ ...candidateState, follow: false });
        toast.success('Bỏ lưu ứng viên thành công');
      }
    } catch (e) {
      toast.error('Lỗi khi lưu / bỏ lưu ứng viên');
      console.log('e', e);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <GlassCard title="" classContentName="px-0" className="my-4 bg-transparent">
      <div className="flex gap-3 flex-wrap">
        <AvatarUser className="size-16" src={avatarUrl || AppImage.avatarFallback.src} />

        <div className="grid grid-cols-12 w-full">
          <div className="col-span-12 sm:col-span-9">
            <h3 className="font-semibold text-neutral-300 capitalize">
              {fullName || 'Chưa cập nhật tên'}
            </h3>
            <span className="text-gray-400 text-sm">
              {headline || 'Chưa có tiêu đề nghề nghiệp'}
            </span>

            <div className="flex gap-2 text-xs text-gray-400 mt-1">
              {location?.provinceCity && (
                <span className="flex items-center gap-1">
                  <MapPinIcon size={14} />
                  {location.provinceCity}
                </span>
              )}
              {experienceLevel && (
                <span className="flex items-center gap-1">
                  <LightbulbIcon size={14} />
                  {getLabelExperience(experienceLevel)}
                </span>
              )}
            </div>
          </div>

          <div className="flex col-span-12 sm:col-span-3 items-center justify-end">
            <button onClick={handleToggleSaveCandidate} className="focus:outline-none">
              <Bookmark
                fill={follow ? 'white' : 'transparent'}
                stroke="white"
                strokeWidth={1.5}
                className="mr-[12px] transition-all hover:scale-110"
                size={30}
              />
            </button>

            <CustomButton
              className="bg-white/30 text-white hover:bg-white/20 hover:text-gray-200"
              onClick={() => setShowDetailUserModel(true)}
            >
              Xem chi tiết
              <ArrowRightIcon />
            </CustomButton>
          </div>
        </div>
      </div>

      {showDetailUserModel && (
        <CandidateDetailModal
          setShowDetailUserModel={setShowDetailUserModel}
          candidateId={candidateState.id}
        />
      )}
    </GlassCard>
  );
}
