'use client';
import React, { useState } from 'react';
import GlassCardBase from '../Cards/GlassCardBase';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { FaLocationDot } from 'react-icons/fa6';
import { BiDollar } from 'react-icons/bi';
import { MdOutlineDateRange } from 'react-icons/md';
import { FaBookmark } from 'react-icons/fa';
import ButtonDashboard from './ButtonDashboard';
import { X } from 'lucide-react';
import { GlassDialog } from '../Dialogs/GlassDialog';
import DashboardConfirmDeleteHeader from './DashboardConfirmDeleteHeader';
import DashboardConfirmDeleteContent from './DashboardConfirmDeleteContent';
import DashboardConfirmDeleteFooter from './DashboardConfirmDeleteFooter';

interface IDashBoardJobItem {
  onDeleteById?: (id: string) => void;
}

const DashBoardJobItem: React.FC<IDashBoardJobItem> = ({ onDeleteById }) => {
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
      <Image
        src="https://images.pexels.com/photos/33199238/pexels-photo-33199238.jpeg"
        alt="Logo"
        width={48}
        height={48}
        className="rounded-md object-cover flex-shrink-0 w-[48px] h-[48px]"
        unoptimized
      />

      <div className="space-y-2 flex flex-col flex-1">
        <div className="flex space-x-2 flex-wrap">
          <h1 className="font-bold text-[14px]">Technical Support Specialist</h1>
          <Badge variant="secondary" className="bg-blue-50 text-blue-600">
            Full Time
          </Badge>
        </div>
        <div className="flex space-x-2 flex-wrap text-[12px]">
          <div className="flex items-center gap-1">
            <FaLocationDot /> Washington
          </div>
          <div className="flex items-center gap-1">
            <BiDollar size={14} /> 50k-80k/month
          </div>
          {/* TODO: add case expire date */}
          <div className="flex items-center gap-1">
            <MdOutlineDateRange size={14} /> 4 Days Remaining
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <GlassCardBase className="p-[12px] hover:translate-y-[0px]">
          <FaBookmark size={14} />
        </GlassCardBase>
        <ButtonDashboard title="Apply Now" />
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
