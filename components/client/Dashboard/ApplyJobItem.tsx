'use client';
import { Badge } from '@/components/ui/badge';
import { CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { AppliedJobResponse } from '@/types';
import { getLabelJobType } from '@/utils';
import { formatDate, formatNumber } from '@/utils/common';
import { CheckCircle, XCircle } from 'lucide-react';
import Image from 'next/image';
import { BiDollar } from 'react-icons/bi';
import { FaLocationDot } from 'react-icons/fa6';
import GlassCardBase from '../Cards/GlassCardBase';
import ButtonDashboard from './ButtonDashboard';
import { useRouter } from 'next/navigation';
import { Router } from '@/constants';
import { CustomImage } from '../Images/CustomImage';

interface IApplyJobItem {
  item: AppliedJobResponse;
}

const ApplyJobItem: React.FC<IApplyJobItem> = ({ item }) => {
  const router = useRouter();

  return (
    <GlassCardBase className="border-t-0 mt-[20px] bg-white/2 rounded-sm px-[0]">
      <CardContent className="grid  grid-cols-[2.5fr_1fr_1fr_1fr] items-center ">
        <div className="flex items-center gap-4 min-w-0">
          <div>
            <CustomImage
              src={item.companyLogoUrl}
              alt="Logo"
              className="w-[60px] h-[60px]"
              classNameImage="object-cover"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-[14px] line-clamp-2">{item.jobTitle}</h3>
              <Badge variant="secondary" className="bg-blue-50 text-blue-600">
                {getLabelJobType(item.type)}
              </Badge>
            </div>
            <div className="flex gap-4 text-sm flex-wrap mt-[8px]">
              <div className="flex items-center gap-1">
                <FaLocationDot /> {item.provinceCity}
              </div>
              <div className="flex items-center gap-1">
                <BiDollar size={14} /> ${formatNumber(item.minSalary)} - $
                {formatNumber(item.maxSalary)}
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm whitespace-nowrap">{formatDate(item.appliedDate)}</div>

        <div
          className={cn('flex items-center  gap-1 text-green-500 font-medium', {
            'text-red-500': item.jobStatus !== 'ACTIVE',
          })}
        >
          {item.jobStatus !== 'ACTIVE' ? (
            <div className="flex items-center gap-1 text-red-500 text-[14px]">
              <XCircle className="w-4 h-4" />
              Expired
            </div>
          ) : (
            <div className="flex items-center gap-1 text-green-500 text-[14px]">
              <CheckCircle className="w-4 h-4" />
              Active
            </div>
          )}
        </div>

        <ButtonDashboard
          disabled={item.jobStatus !== 'ACTIVE'}
          className={item.jobStatus !== 'ACTIVE' ? 'pointer-events-none text-red-600' : ''}
          title={item.jobStatus !== 'ACTIVE' ? 'Đã hết hạn' : 'Xem chi tiết'}
          onClick={() => router.push(Router.JOB.DETAIL(item.slug))}
        />
      </CardContent>
    </GlassCardBase>
  );
};

export default ApplyJobItem;
