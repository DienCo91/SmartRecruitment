import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ApplicationBriefResponse } from '@/types';
import { getLabelEducation, getLabelExperience } from '@/utils';
import { downloadFile, formatDate, handleSendMail } from '@/utils/common';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Download, EllipsisVertical, Mail } from 'lucide-react';
import React from 'react';
import { IoCloseCircle } from 'react-icons/io5';
import GlassCardBase from '../Cards/GlassCardBase';

interface IApplicationItem {
  item: ApplicationBriefResponse;
}

const ApplicationItem: React.FC<IApplicationItem> = ({ item }) => {
  const info = [
    getLabelExperience(item.experienceLevel || 'NO_EXPERIENCE'),
    `Education: ${getLabelEducation(item.educationLevel || 'NO_EDUCATION')}`,
    `Applied:${formatDate(item.appliedAt)}`,
  ];

  const handleReject = () => {};

  return (
    <GlassCardBase>
      <div className="flex space-x-2 p-[10px] justify-around">
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
                onClick={() => handleSendMail(item.email)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600
                         hover:bg-blue-100 hover:text-blue-700
                         focus:outline-none focus:ring-0"
              >
                <Mail className="w-4 h-4" />
                <span>Send Mail</span>
              </DropdownMenu.Item>

              <DropdownMenu.Item
                onClick={handleReject}
                className="flex items-center gap-2 px-3 py-2 text-sm  text-red-400
                          hover:bg-red-100 
                         focus:outline-none focus:ring-0"
              >
                <IoCloseCircle className="w-4 h-4" />
                <span>Reject</span>
              </DropdownMenu.Item>
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
