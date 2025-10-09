import { Button } from '@/components/ui/button';
import { ArrowDownToLine, ArrowRight, Bookmark, EllipsisVertical, Mail } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import GlassCardBase from '../Cards/GlassCardBase';
import { GlassDialog } from '../Dialogs/GlassDialog';
import { CandidateDetailContent } from '../Candidates/CandidateDetailContent';
import { CandidateDetailHeader } from '../Candidates/CandidateDetailHeader';

const SaveCandidateItem = () => {
  const [showDetailUserModel, setShowDetailUserModel] = useState<boolean>(false);

  const handleSendMail = () => {};

  const handleDownloadCV = () => {};

  return (
    <>
      <GlassCardBase>
        <div className="flex">
          <Image
            src="https://images.pexels.com/photos/33199238/pexels-photo-33199238.jpeg"
            alt="Logo"
            width={48}
            height={48}
            className="rounded-md object-cover flex-shrink-0 w-[48px] h-[48px]"
            unoptimized
          />
          <div className="flex flex-col flex-1 ml-[12px]">
            <h1 className="text-[16px] font-bold">Guy Hawkins</h1>
            <span className="text-[14px] opacity-80">Technical Support Specialist</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Bookmark fill="white" className="border-white" color="white" size={24} />
            <Button size={'lg'} onClick={() => setShowDetailUserModel(true)}>
              <h1>View Profile</h1>
              <ArrowRight />
            </Button>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-0">
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
                    onSelect={handleSendMail}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 
                         hover:bg-blue-100 hover:text-blue-700 
                         focus:outline-none focus:ring-0"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send Mail</span>
                  </DropdownMenu.Item>

                  <DropdownMenu.Item
                    onSelect={handleDownloadCV}
                    className="flex items-center gap-2 px-3 py-2 text-sm  text-blue-600 
                         hover:bg-blue-100 hover:text-blue-700 
                         focus:outline-none focus:ring-0"
                  >
                    <ArrowDownToLine className="w-4 h-4" />
                    <span>Download CV</span>
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
          title={<CandidateDetailHeader />}
        >
          <CandidateDetailContent />
        </GlassDialog>
      )}
    </>
  );
};

export default SaveCandidateItem;
