'use client';

import { CustomButton } from '@/components/Buttons/CustomButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Router } from '@/constants';
import { setLoading } from '@/lib/features/common/commonSlice';
import { useAppDispatch } from '@/lib/hooks';
import { ChatServices } from '@/services/chat.services';
import { ICandidateDetail } from '@/types';
import { handleSendMail } from '@/utils/common';
import { HeartIcon, MailIcon, MessageCircleMore } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { AvatarUser } from '../Avatar/AvatarUser';
import { GlassDialog } from '../Dialogs/GlassDialog';

export function CandidateDetailHeader({ candidateDetail }: { candidateDetail: ICandidateDetail }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const handleSendMessage = async () => {
    if (!candidateDetail) return;
    dispatch(setLoading(true));
    try {
      const res = await ChatServices.sendMessage(candidateDetail.id, value);

      toast.success('Send message successfully!');
      setOpen(false);
      setValue('');
      router.push(`${Router.CHATTING}/${res.data.conversationId}`);
    } catch (error) {
      console.log('error', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const onClose = () => {
    setOpen(false);
    setValue('');
  };

  return (
    <div className="flex gap-3 items-center mr-5">
      <AvatarUser
        src={candidateDetail?.avatarUrl || ''}
        classNameImage="object-cover"
        className="border-none w-[48px] h-[48px]"
      />
      <div className="flex w-full justify-between">
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold text-neutral-300 capitalize">{candidateDetail?.fullName}</h3>
          <span className="text-gray-400 text-sm">{candidateDetail?.headline}</span>
        </div>
        <div className="flex col-span-3 items-center">
          <CustomButton
            className="bg-blue-600 text-white hover:bg-blue-700 hover:text-gray-200"
            onClick={() => handleSendMail(candidateDetail.email!)}
          >
            <MailIcon size={16} />
            Gửi Mail
          </CustomButton>
          <CustomButton
            className="bg-blue-600 text-white hover:bg-blue-700 hover:text-gray-200 ml-2"
            onClick={() => setOpen(true)}
          >
            Inbox
            <MessageCircleMore />
          </CustomButton>
        </div>
      </div>

      <GlassDialog
        size="sm"
        onClose={onClose}
        title={<p className="my-[16px]">Send message</p>}
        open={open}
        contentClassName="pb-[16px]"
      >
        <div className=" text-white">
          <Input
            placeholder="Your message..."
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <Button onClick={handleSendMessage} className="w-full mt-4">
            Send
          </Button>
        </div>
      </GlassDialog>
    </div>
  );
}
