import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { JobApplicationStatus } from '@/constants/job';
import { cn } from '@/lib/utils';
import { ApplicationBriefResponse, UpdateData } from '@/types';
import { getLabelEducation, getLabelExperience } from '@/utils';
import { downloadFile, formatDate, handleSendMail } from '@/utils/common';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { debounce } from 'lodash';
import { Download, EllipsisVertical, Mail, VerifiedIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';
import { IoCloseCircle } from 'react-icons/io5';
import GlassCardBase from '../Cards/GlassCardBase';

interface IApplicationItem {
  item: ApplicationBriefResponse;
  handleUpdateStatus: (payload: UpdateData) => void;
}

const ApplicationItem: React.FC<IApplicationItem> = ({ item, handleUpdateStatus }) => {
  const { id } = useParams();

  const info = [
    getLabelExperience(item.experienceLevel || 'NO_EXPERIENCE'),
    `Education: ${getLabelEducation(item.educationLevel || 'NO_EDUCATION')}`,
    `Applied:${formatDate(item.appliedAt)}`,
  ];

  const handleChangeStatus = useCallback(
    debounce((status: JobApplicationStatus) => {
      handleUpdateStatus({
        applicationId: item.applicationId,
        jobId: id as string,
        status,
      });
    }, 400),
    []
  );

  const handleReject = () => {
    handleChangeStatus(JobApplicationStatus.REJECTED);
  };

  const handleAccept = () => {
    handleChangeStatus(JobApplicationStatus.ACCEPTED);
  };

  const status = useMemo(() => {
    if (item.status === JobApplicationStatus.ACCEPTED) {
      return {
        label: 'Accepted',
        style: 'bg-green-500 ',
      };
    }

    if (item.status === JobApplicationStatus.REJECTED) {
      return {
        label: 'Rejected',
        style: 'bg-red-500 ',
      };
    }

    return {
      label: 'Processing',
      style: 'bg-blue-500 ',
    };
  }, [item.status]);

  return (
    <GlassCardBase className="hover:translate-y-[0px]">
      <div className="flex space-x-2 p-[10px] justify-around relative">
        {status && (
          <div
            className={cn(
              'absolute top-[-24px] right-0 text-[14px] rounded-sm px-[12px] py-[2px] text-white font-semibold',
              status.style
            )}
          >
            {status.label}
          </div>
        )}

        <Avatar className="w-[44px] h-[44px] shadow-md">
          <AvatarImage
            src={
              item?.candidateAvatarUrl ||
              'https://images.pexels.com/photos/33514898/pexels-photo-33514898.jpeg'
            }
          />
          <AvatarFallback>{item.candidateName?.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span>{item?.candidateName}</span>
          <span>{item?.candidateHeadline}</span>
        </div>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="p-2 rounded-full hover:bg-[#cccccc50] transition-all duration-200 ease-in-out focus:outline-none focus:ring-0">
              <EllipsisVertical size={20} />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              sideOffset={8}
              className="z-50 w-40 rounded-md bg-white shadow-md overflow-hidden cursor-pointer"
            >
              <DropdownMenu.Item
                onClick={() => handleSendMail(item.candidateEmail)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600
                         hover:bg-blue-100 hover:text-blue-700
                         focus:outline-none focus:ring-0"
              >
                <Mail className="w-4 h-4" />
                <span>Send Mail</span>
              </DropdownMenu.Item>

              {[JobApplicationStatus.REJECTED, JobApplicationStatus.PROCESSING].includes(
                item.status as JobApplicationStatus
              ) && (
                <DropdownMenu.Item
                  onClick={handleAccept}
                  className="flex items-center gap-2 px-3 py-2 text-sm  text-green-400
                hover:bg-green-100
                         focus:outline-none focus:ring-0"
                >
                  <VerifiedIcon className="w-4 h-4" />
                  <span>Accept</span>
                </DropdownMenu.Item>
              )}

              {[JobApplicationStatus.ACCEPTED, JobApplicationStatus.PROCESSING].includes(
                item.status as JobApplicationStatus
              ) && (
                <DropdownMenu.Item
                  onClick={handleReject}
                  className="flex items-center gap-2 px-3 py-2 text-sm  text-red-400
                          hover:bg-red-100 
                         focus:outline-none focus:ring-0"
                >
                  <IoCloseCircle className="w-4 h-4" />
                  <span>Reject</span>
                </DropdownMenu.Item>
              )}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
      <Separator className=" " />
      <ul className="text-sm space-y-1 list-disc pl-5">
        {info.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <Button onClick={() => downloadFile(item.resumeUrl)} className="mt-[10px]">
        <Download />
        <h1>Download CV</h1>
      </Button>
    </GlassCardBase>
  );
};

export default ApplicationItem;
