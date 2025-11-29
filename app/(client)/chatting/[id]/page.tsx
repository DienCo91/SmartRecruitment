'use client';

import { AvatarUser } from '@/components/client/Avatar/AvatarUser';
import GlassCardBase from '@/components/client/Cards/GlassCardBase';
import BoxChatting from '@/components/client/Chatting/BoxChatting';
import InputChatting from '@/components/client/Chatting/InputChatting';
import { useAppSelector } from '@/lib/hooks';
import { Dot } from 'lucide-react';

const fakeData = {
  name: `Company `,
  message:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel orci vitae lorem fermentum placerat.',
  status: 'Online',
  avatar: 'https://images.pexels.com/photos/5406476/pexels-photo-5406476.jpeg',
};
const ChattingDetail = () => {
  const convCurrent = useAppSelector(state => state.chat.conversationCurrent);

  if (!convCurrent) return null;

  return (
    <GlassCardBase className="w-full hover:translate-y-[0px]">
      <div>
        <div
          className={
            'flex gap-4 px-4 py-2 items-center cursor-pointer border-white/20 border-b-[1px] '
          }
        >
          <AvatarUser
            src={convCurrent?.partnerAvatarUrl}
            classNameImage="object-cover"
            className="border-none w-[48px] h-[48px]"
          />

          <div className="flex flex-1 flex-col gap-[2px]">
            <h1 className="font-bold text-[16px]">{convCurrent?.partnerName}</h1>
            <div className="flex items-center text-green-500">
              <Dot />
              <p className="text-[14px] ">{fakeData.status}</p>
            </div>
          </div>
        </div>

        <BoxChatting convCurrent={convCurrent} />
        <InputChatting recipientId={convCurrent?.partnerId} />
      </div>
    </GlassCardBase>
  );
};

export default ChattingDetail;
