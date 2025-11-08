'use client';

import { LoadingCircle } from '@/components/Loadings/LoadingCircle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Dot } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const allChats = Array.from({ length: 50 }, (_, i) => ({
  name: `Company ${i + 1}`,
  message:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel orci vitae lorem fermentum placerat.',
  time: '12:00',
  avatar: 'https://images.pexels.com/photos/5406476/pexels-photo-5406476.jpeg',
}));

const ChatList = () => {
  const [items, setItems] = useState(allChats.slice(0, 10));
  const [hasMore, setHasMore] = useState(true);
  const { id } = useParams();

  const fetchMoreData = () => {
    if (items.length >= allChats.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setItems(allChats.slice(0, items.length + 10));
    }, 800);
  };

  return (
    <div id="scrollableDiv" className="overflow-auto h-full">
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        scrollableTarget="scrollableDiv"
        loader={<LoadingCircle />}
      >
        <div className="flex flex-col">
          {items.map((item, index) => {
            const isActive = index.toString() === id;
            return (
              <Link
                href={`/chatting/${index}`}
                key={index}
                className={cn(
                  'flex gap-4 px-4 py-3 cursor-pointer ',
                  isActive ? 'bg-white/20 backdrop-blur-md' : 'hover:backdrop-blur-sm'
                )}
              >
                <Avatar className="w-[48px] h-[48px]">
                  <AvatarImage src={item.avatar} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="flex flex-1 flex-col gap-[2px]">
                  <h1 className="font-bold text-[14px]">{item.name}</h1>
                  <div className="flex items-center text-[14px] opacity-80">
                    <p className="line-clamp-1 flex-1">{item.message}</p>
                    <Dot className="w-[20px] h-[20px]" />
                    <p>{item.time}</p>
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
