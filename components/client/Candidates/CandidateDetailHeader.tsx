import { CustomButton } from '@/components/Buttons/CustomButton';
import { HeartIcon, MailIcon } from 'lucide-react';
import { AvatarUser } from '../Avatar/AvatarUser';
import { ICandidateDetail } from '@/types';

export function CandidateDetailHeader({
  candidateDetail,
}: {
  candidateDetail: ICandidateDetail | null;
}) {
  return (
    <div className="flex gap-3 items-center mr-5">
      <AvatarUser className="size-16" />
      <div className="flex w-full justify-between">
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold text-neutral-300 capitalize">{candidateDetail?.fullName}</h3>
          <span className="text-gray-400 text-sm">{candidateDetail?.headline}</span>
        </div>
        <div className="flex col-span-3 items-center">
          <CustomButton className="hover:bg-transparent hover:text-red-500">
            <HeartIcon className="size-6" fill="red" />
          </CustomButton>
          <CustomButton className="bg-blue-600 text-white hover:bg-blue-700 hover:text-gray-200">
            <MailIcon size={16} />
            Gửi Mail
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
