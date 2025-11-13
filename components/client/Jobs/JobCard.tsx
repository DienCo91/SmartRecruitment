/* eslint-disable react-hooks/exhaustive-deps */
import { CustomButton } from '@/components/Buttons/CustomButton';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Router } from '@/constants';
import { experienceLevel, jobType } from '@/constants/job';
import { addFavoriteJob, removeFavoriteJob } from '@/lib/features/favorites/favotiteSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { cn, formatDistanceNow, formatSalary } from '@/lib/utils';
import { CandidateService } from '@/services/candidate.services';
import { HotJob } from '@/types';
import { debounce } from 'lodash';
import { ArrowRightIcon, CalendarIcon, HeartIcon, MapPinIcon, WalletIcon } from 'lucide-react';
import Link from 'next/link';
import { useCallback } from 'react';
import { toast } from 'sonner';
import { CustomImage } from '../Images/CustomImage';

interface Props {
  job: HotJob;
}

export function JobCard({ job }: Props) {
  const { jobIds: favoriteJobIds } = useAppSelector(state => state.favoriteJobs);
  const isFavorited = favoriteJobIds.includes(job.id);

  const dispatch = useAppDispatch();

  const favoriteApi = useCallback(
    debounce(async (id: number, isFavorite: boolean) => {
      try {
        if (isFavorite) {
          await CandidateService.followJob(String(id));
          toast.success('Đã theo dõi công việc thành công');
        } else {
          await CandidateService.unfollowJob(String(id));
          toast.success('Đã bỏ theo dõi công việc thành công');
        }
      } catch (error) {
        console.error(error);
        toast.error('Đã xảy ra lỗi');
      }
    }, 400),
    []
  );

  const handleTogglerFavorite = (id: number, isFavorite: boolean) => {
    if (isFavorite) {
      dispatch(addFavoriteJob(id));
    } else {
      dispatch(removeFavoriteJob(id));
    }

    favoriteApi(id, isFavorite);
  };

  return (
    <div className="flex mt-3 gap-3 bg-white/5 p-3 rounded-xl shadow-sm hover:bg-white/15 hover:shadow-lg">
      <CustomImage src={job.companyLogoUrl} alt="" className="w-[80px]" />

      {/* Thông tin job */}
      <div className="flex-1 flex-col w-full">
        <div className="flex relative justify-between items-center">
          <Link
            href={Router.JOB.DETAIL(job.slug)}
            className="font-semibold text-neutral-300 hover:text-blue-400 hover:cursor-pointer w-[550px] line-clamp-2"
          >
            {job.jobTitle}
          </Link>
          <div className="absolute flex gap-1 right-0">
            <Badge variant="destructive" className="bg-red-800 block">
              Nổi bật
            </Badge>
            <Badge variant="secondary" className="block">
              {jobType[job.jobType]}
            </Badge>
          </div>
        </div>
        <span className="text-gray-400 text-sm">{job.companyName}</span>
        <div className="flex gap-2 text-xs text-gray-400 mt-1">
          <span className="flex items-center gap-1">
            <MapPinIcon size={14} />
            {job.provinceCity}
          </span>
          <span className="flex items-center gap-1">
            <WalletIcon size={14} />
            {`${formatSalary(job.minSalary)} - ${formatSalary(job.maxSalary)}`} VND
          </span>
          <span className="flex items-center gap-1">
            <CalendarIcon size={14} />
            Còn {formatDistanceNow(job.expirationDate)} để ứng tuyển
          </span>
        </div>
        <hr className="my-2" />
        <div className="flex items-center justify-between gap-2">
          <div>
            <Label className="text-xs inline">Yêu cầu: </Label>
            <Badge
              variant="outline"
              className="bg-transparent border-none shadow text-neutral-300 shadow-blue-900"
            >
              {experienceLevel[job.experienceLevel]}
            </Badge>
          </div>
          <div className="flex items-center">
            <CustomButton
              className={cn('hover:bg-transparent', !isFavorited ? 'hover:text-red-500' : '')}
              onClick={() => {
                handleTogglerFavorite(job.id, !isFavorited);
              }}
            >
              <HeartIcon
                className={cn('size-6 border-0', isFavorited ? 'text-red-500 fill-red-500' : '')}
              />
            </CustomButton>
            <CustomButton className="bg-white/30 text-white hover:bg-white/20 hover:text-gray-200">
              Apply now
              <ArrowRightIcon />
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}
