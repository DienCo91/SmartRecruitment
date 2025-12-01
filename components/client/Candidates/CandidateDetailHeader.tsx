'use client';

import { CustomButton } from '@/components/Buttons/CustomButton';
import { HeartIcon, MailIcon, MessageCircleMore } from 'lucide-react';
import { AvatarUser } from '../Avatar/AvatarUser';
import { ICandidateDetail } from '@/types';
import { GlassDialog } from '../Dialogs/GlassDialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { setLoading } from '@/lib/features/common/commonSlice';
import { toast } from 'sonner';
import { ChatServices } from '@/services/chat.services';
import { Router } from '@/constants';
import { useRouter } from 'next/navigation';

export function CandidateDetailHeader({
  candidateDetail,
}: {
  candidateDetail: ICandidateDetail | null;
}) {
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
          <CustomButton className="hover:bg-transparent hover:text-red-500">
            <HeartIcon className="size-6" fill="red" />
          </CustomButton>
          <CustomButton className="bg-blue-600 text-white hover:bg-blue-700 hover:text-gray-200">
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
