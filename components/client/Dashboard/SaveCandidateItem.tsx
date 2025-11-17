import { Button } from '@/components/ui/button';
import { Candidate } from '@/types';
import { handleSendMail } from '@/utils/common';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ArrowDownToLine, ArrowRight, Bookmark, EllipsisVertical, Mail } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { CandidateDetailContent } from '../Candidates/CandidateDetailContent';
import { CandidateDetailHeader } from '../Candidates/CandidateDetailHeader';
import GlassCardBase from '../Cards/GlassCardBase';
import { GlassDialog } from '../Dialogs/GlassDialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const SaveCandidateItem = ({ item, removeItem }: { item: Candidate; removeItem: () => void }) => {
  const [showDetailUserModel, setShowDetailUserModel] = useState<boolean>(false);

  return (
    <>
      <GlassCardBase>
        <div className="flex">
          <Image
            src={
              item?.avatarUrl ||
              'https://images.pexels.com/photos/33199238/pexels-photo-33199238.jpeg'
            }
            alt="Logo"
            width={48}
            height={48}
            className="rounded-md object-cover flex-shrink-0 w-[48px] h-[48px]"
            unoptimized
          />
          <div className="flex flex-col flex-1 ml-[12px]">
            <h1 className="text-[16px] font-bold">{item?.fullName ?? ''}</h1>
            <span className="text-[14px] opacity-80">{item?.headline ?? ''}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Bookmark
                  fill="white"
                  className="border-white hover:opacity-50 cursor-pointer"
                  color="white"
                  size={24}
                  onClick={removeItem}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Remove</p>
              </TooltipContent>
            </Tooltip>

            <Button
              size={'lg'}
              className="cursor-pointer"
              onClick={() => setShowDetailUserModel(true)}
            >
              <h1>View Profile</h1>
              <ArrowRight />
            </Button>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-0 cursor-pointer">
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
                    onSelect={() => handleSendMail(item.email)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600
                         hover:bg-blue-100 hover:text-blue-700
                         focus:outline-none focus:ring-0"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send Mail</span>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>
      </GlassCardBase>
      {showDetailUserModel && (
        <GlassDialog
          size="xl"
          open
          onClose={() => setShowDetailUserModel(false)}
          title={<CandidateDetailHeader candidateDetail={null} />}
        >
          <CandidateDetailContent candidateDetail={null} />
        </GlassDialog>
      )}
    </>
  );
};

export default SaveCandidateItem;
