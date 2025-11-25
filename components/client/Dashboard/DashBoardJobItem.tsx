'use client';
import { Badge } from '@/components/ui/badge';
import { JobFav } from '@/types';
import { getLabelJobType } from '@/utils';
import { formatNumber } from '@/utils/common';
import { HeartIcon, X } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { BiDollar } from 'react-icons/bi';
import { FaLocationDot } from 'react-icons/fa6';
import { MdOutlineDateRange } from 'react-icons/md';
import GlassCardBase from '../Cards/GlassCardBase';
import { GlassDialog } from '../Dialogs/GlassDialog';
import ButtonDashboard from './ButtonDashboard';
import DashboardConfirmDeleteContent from './DashboardConfirmDeleteContent';
import DashboardConfirmDeleteFooter from './DashboardConfirmDeleteFooter';
import DashboardConfirmDeleteHeader from './DashboardConfirmDeleteHeader';
import { useRouter } from 'next/navigation';
import { Router } from '@/constants';
import { CustomImage } from '../Images/CustomImage';

interface IDashBoardJobItem {
  onDeleteById?: (id: string) => void;
  item: JobFav;
}

const DashBoardJobItem: React.FC<IDashBoardJobItem> = ({ onDeleteById, item }) => {
  const router = useRouter();
  const [isShowDialog, setIsShowDialog] = useState(false);

  const onCloseDialog = () => {
    setIsShowDialog(false);
  };

  const onConfirmDelete = () => {
    if (onDeleteById) onDeleteById('1');
    setIsShowDialog(false);
  };

  return (
    <GlassCardBase className="flex flex-row flex-wrap relative">
      <CustomImage
        src={item.companyLogoUrl}
        alt="Logo"
        className="w-[60px] h-[60px]"
        classNameImage="object-cover"
      />
      <div className="space-y-2 flex flex-col flex-1">
        <div className="flex space-x-2 flex-wrap">
          <h1 className="font-bold text-[14px]">{item.jobTitle}</h1>
          <Badge variant="secondary" className="bg-blue-50 text-blue-600">
            {getLabelJobType(item.type)}
          </Badge>
        </div>
        <div className="flex space-x-2 flex-wrap text-[12px]">
          <div className="flex items-center gap-1">
            <FaLocationDot /> {item.provinceCity}
          </div>
          <div className="flex items-center gap-1">
            <BiDollar size={14} /> ${formatNumber(item.minSalary)} - ${formatNumber(item.maxSalary)}
          </div>
          {/* TODO: add case expire date */}
          <div className="flex items-center gap-1">
            <MdOutlineDateRange size={14} />{' '}
            {item.daysRemaining > 0 ? `${item.daysRemaining} days` : 'Expired'}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <GlassCardBase className="p-[12px] hover:translate-y-[0px]">
          <HeartIcon className={'size-4 border-0 text-red-500 fill-red-500'} />
        </GlassCardBase>
        {item.daysRemaining > 0 && (
          <ButtonDashboard
            title="View Detail"
            onClick={() => router.push(Router.JOB.DETAIL(item.slug))}
          />
        )}
      </div>

      {onDeleteById && (
        <div className="absolute top-[-10px] right-[-10px] p-[4px] bg-[red] rounded-full cursor-pointer hover:bg-red-400">
          <X size={14} onClick={() => setIsShowDialog(true)} className="text-white" />
        </div>
      )}

      {isShowDialog && onDeleteById && (
        <GlassDialog
          size="xl"
          open
          onClose={onCloseDialog}
          title={<DashboardConfirmDeleteHeader />}
          footer={
            <DashboardConfirmDeleteFooter onCancel={onCloseDialog} onConfirm={onConfirmDelete} />
          }
        >
          <DashboardConfirmDeleteContent />
        </GlassDialog>
      )}
    </GlassCardBase>
  );
};

export default DashBoardJobItem;
