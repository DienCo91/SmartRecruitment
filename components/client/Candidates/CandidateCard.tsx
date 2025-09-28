import { CustomButton } from '@/components/Buttons/CustomButton';
import { ArrowRightIcon, HeartIcon, LightbulbIcon, MapPinIcon } from 'lucide-react';
import { useState } from 'react';
import { AvatarUser } from '../Avatar/AvatarUser';
import { GlassCard } from '../Cards/GlassCard';
import { GlassDialog } from '../Dialogs/GlassDialog';
import { CandidateDetailContent } from './CandidateDetailContent';
import { CandidateDetailHeader } from './CandidateDetailHeader';

export function CandidateCard() {
  const [showDetailUserModel, setShowDetailUserModel] = useState<boolean>(false);

  return (
    <GlassCard title="" classContentName="px-0" className="my-4 bg-transparent">
      <div className="flex gap-3">
        <AvatarUser className="size-16" />
        <div className="grid grid-cols-12">
          <div className="col-span-9 ">
            <h3 className="font-semibold text-neutral-300 capitalize">Hoàng minh Khương</h3>
            <span className="text-gray-400 text-sm">Backend developer</span>
            <div className="flex gap-2 text-xs text-gray-400 mt-1">
              <span className="flex items-center gap-1">
                <MapPinIcon size={14} />
                Hà Nội
              </span>
              <span className="flex items-center gap-1">
                <LightbulbIcon size={14} />1 năm kinh nghiệm
              </span>
            </div>
          </div>
          <div className="flex col-span-3 items-center">
            <CustomButton className="hover:bg-transparent hover:text-red-500">
              <HeartIcon className="size-6" fill="red" />
            </CustomButton>
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
        <GlassDialog
          size="xl"
          open
          onClose={() => setShowDetailUserModel(false)}
          title={<CandidateDetailHeader />}
        >
          <CandidateDetailContent />
        </GlassDialog>
      )}
    </GlassCard>
  );
}
