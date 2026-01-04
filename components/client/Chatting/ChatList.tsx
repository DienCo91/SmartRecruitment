'use client';

import { LoadingCircle } from '@/components/Loadings/LoadingCircle';
import { setConservationCurrent } from '@/lib/features/chat/chatSlice';
import { useAppDispatch } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { Conversation } from '@/types';
import { format } from 'date-fns';
import { Dot } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { Dispatch, SetStateAction } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AvatarUser } from '../Avatar/AvatarUser';

interface IChatList {
  hasMore: boolean;
  fetchMoreData: () => void;
  data: Conversation[];
  setData: Dispatch<SetStateAction<Conversation[]>>;
}

const ChatList: React.FC<IChatList> = ({ hasMore, fetchMoreData, data, setData }) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const onClick = async (item: Conversation) => {
    dispatch(setConservationCurrent(item));
    setData(prev =>
      prev.map(item => {
        if (item.conversationId === item.conversationId) {
          return {
            ...item,
            unreadCount: 0,
          };
        }
        return item;
      })
    );
  };

  if (!data || (data.length === 0 && !hasMore)) {
    return (
      <div className="flex justify-center mt-4 text-[14px] text-gray-400">
        Không có đoạn chat nào
      </div>
    );
  }

  return (
    <div id="scrollableDiv" className="overflow-auto h-full">
      <InfiniteScroll
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={hasMore}
        scrollableTarget="scrollableDiv"
        loader={<LoadingCircle />}
        style={{ overflow: 'hidden' }}
      >
        <div className="flex flex-col">
          {data.map(item => {
            const isActive = item.conversationId.toString() === id;
            return (
              <Link
                onClick={() => onClick(item)}
                href={`/chatting/${item.conversationId}`}
                key={item.conversationId}
                className={cn(
                  'flex gap-4 px-4 py-3 cursor-pointer ',
                  isActive ? 'bg-white/20 backdrop-blur-md' : 'hover:backdrop-blur-sm'
                )}
              >
                <div className="relative">
                  <AvatarUser
                    src={item.partnerAvatarUrl}
                    classNameImage="object-cover"
                    className="border-none w-[48px] h-[48px]"
                  />
                  {!!item.unreadCount && (
                    <div className="w-[12px] h-[12px] absolute top-[-2px] left-[4px]">
                      <span className="absolute top-[-4px] left-[-4px] inline-flex w-[20px] h-[20px] animate-ping-small  rounded-full bg-red-500 "></span>
                      <div className=" bg-red-500 rounded-full w-[12px] h-[12px]" />
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-[2px]">
                  <div className="flex ">
                    <h1 className="font-bold text-[14px] flex-1">{item.partnerName}</h1>
                  </div>
                  <div className="flex items-center text-[14px] opacity-80">
                    <p
                      className={cn(
                        'line-clamp-1 flex-1',
                        item.unreadCount > 0 && 'font-bold text-white'
                      )}
                    >
                      {item.lastMessage}
                    </p>
                    <Dot className="w-[20px] h-[20px]" />
                    <p>{format(item.lastMessageAt, 'HH:mm dd/MM/yyyy')}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default ChatList;
