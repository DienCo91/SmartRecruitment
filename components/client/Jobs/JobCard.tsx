// import { BaseProps } from "@/types";

import { CustomButton } from '@/components/Buttons/CustomButton';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { experienceLevel, ExperienceLevel, Router } from '@/constants';
import { formatDistanceNow, formatSalary } from '@/lib/utils';
import { HotJob } from '@/types';
import { ArrowRightIcon, CalendarIcon, HeartIcon, MapPinIcon, WalletIcon } from 'lucide-react';
import Link from 'next/link';
import { CustomImage } from '../Images/CustomImage';

interface Props {
  job: HotJob;
}

export function JobCard({ job }: Props) {
  console.log(job);
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
              Fulltime
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
            <CustomButton className="hover:bg-transparent hover:text-red-500">
              <HeartIcon className="size-6" fill="red" />
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
