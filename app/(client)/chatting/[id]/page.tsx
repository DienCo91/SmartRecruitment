import GlassCardBase from '@/components/client/Cards/GlassCardBase';
import BoxChatting from '@/components/client/Chatting/BoxChatting';
import InputChatting from '@/components/client/Chatting/InputChatting';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Dot, Video } from 'lucide-react';
import React from 'react';

const fakeData = {
  name: `Company `,
  message:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel orci vitae lorem fermentum placerat.',
  status: 'Online',
  avatar: 'https://images.pexels.com/photos/5406476/pexels-photo-5406476.jpeg',
};
const ChattingDetail = () => {
  return (
    <GlassCardBase className="w-full hover:translate-y-[0px]">
      <div>
        <div
          className={
            'flex gap-4 px-4 py-2 items-center cursor-pointer border-white/20 border-b-[1px] '
          }
        >
          <Avatar className="w-[38px] h-[38px]">
            <AvatarImage src={fakeData.avatar} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex flex-1 flex-col gap-[2px]">
            <h1 className="font-bold text-[16px]">{fakeData.name}</h1>
            <div className="flex items-center text-green-500">
              <Dot />
              <p className="text-[14px] ">{fakeData.status}</p>
            </div>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button>
                <Video />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Video Call</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <BoxChatting />
        <InputChatting />
      </div>
    </GlassCardBase>
  );
};

export default ChattingDetail;
