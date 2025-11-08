import { Badge } from '@/components/ui/badge';
import { CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { BiDollar } from 'react-icons/bi';
import { FaLocationDot } from 'react-icons/fa6';
import GlassCardBase from '../Cards/GlassCardBase';
import ButtonDashboard from './ButtonDashboard';
import { AppliedJobResponse } from '@/types';
import { formatDate, formatNumber } from '@/utils/common';
import { cn } from '@/lib/utils';
import { getLabelEducation, getLabelJobType } from '@/utils';

interface IApplyJobItem {
  item: AppliedJobResponse;
}

const ApplyJobItem: React.FC<IApplyJobItem> = ({ item }) => {
  return (
    <GlassCardBase className="border-t-0 mt-[20px] bg-white/2 rounded-sm px-[0]">
      <CardContent className="grid  grid-cols-[2.5fr_1fr_1fr_1fr] items-center ">
        <div className="flex items-center gap-4 min-w-0">
          <Image
            src={item.companyLogoUrl}
            alt="Logo"
            width={48}
            height={48}
            className="rounded-md object-cover flex-shrink-0 w-[48px] h-[48px]"
            unoptimized
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-[14px]">{item.jobTitle}</h3>
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
          <CheckCircle className="w-4 h-4" /> Active
        </div>

        <ButtonDashboard title="View Details" onClick={() => {}} />
      </CardContent>
    </GlassCardBase>
  );
};

export default ApplyJobItem;
