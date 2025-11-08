'use client';

import { LoadingCircle } from '@/components/Loadings/LoadingCircle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { format, subHours } from 'date-fns';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Message {
  id: string;
  user: 'me' | 'other';
  avatar?: string;
  text: string;
  createdAt: Date;
}

const generateMockMessages = (count: number, startIndex: number) => {
  const now = new Date();
  return Array.from({ length: count }).map((_, i) => ({
    id: `${startIndex + i}`,
    user: i % 2 === 0 ? 'me' : 'other',
    text: `Message ${startIndex + i}`,
    createdAt: subHours(now, (startIndex + i) * 2),
    avatar:
      (startIndex + i) % 2 === 0
        ? 'https://i.pravatar.cc/150?img=1'
        : 'https://i.pravatar.cc/150?img=2',
  })) as Message[];
};

import React from 'react';

const BoxChatting = () => {
  const [messages, setMessages] = useState<Message[]>(generateMockMessages(15, 1));
  const [hasMore, setHasMore] = useState(true);
  const MAX = 60;

  const renderDateSeparator = (prevDate: Date | null, currDate: Date) => {
    if (!prevDate) return true;
    const diffHours = Math.abs(currDate.getTime() - prevDate.getTime()) / 36e5;
    return diffHours > 24;
  };

  const fetchMore = (limit = 16) => {
    const newMsgs = Array.from({ length: limit }).map((_, i) => {
      return {
        id: `m-${messages.length + i}`,
        user: i % 2 === 0 ? 'me' : 'other',
        text: `Older message ${i}`,
        createdAt: subHours(new Date(), i * 3),
        avatar: i % 2 === 0 ? 'https://i.pravatar.cc/150?img=1' : 'https://i.pravatar.cc/150?img=2',
      } as Message;
    });

    setTimeout(() => {
      setMessages(prev => {
        const next = [...prev, ...newMsgs];
        if (next.length >= MAX) setHasMore(false);
        return next;
      });
    }, 700);
  };

  return (
    <div
      id="scrollableChat"
      style={{
        height: 'calc(100vh - 240px)',
        overflowY: 'auto',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
      }}
      className="p-4 bg-surface"
    >
      <InfiniteScroll
        dataLength={messages.length}
        next={fetchMore}
        hasMore={hasMore}
        inverse={true}
        scrollableTarget="scrollableChat"
        loader={<LoadingCircle className="mt-[40px]" />}
        style={{ display: 'flex', flexDirection: 'column-reverse', overflow: 'visible' }}
      >
        {messages.map((msg, idx, arr) => {
          const nextMsg = arr[idx + 1] ?? null;
          const showDate = renderDateSeparator(nextMsg?.createdAt ?? null, msg.createdAt);

          return (
            <div key={msg.id}>
              {showDate && (
                <div className="text-center text-xs text-gray-400 my-2">
                  {format(msg.createdAt, 'EEEE, dd/MM/yyyy')}
                </div>
              )}

              <div
                className={cn(
                  'flex items-end gap-2',
                  msg.user === 'me' ? 'justify-end' : 'justify-start'
                )}
              >
                {msg.user === 'other' && (
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={msg.avatar} alt="avatar" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={cn(
                    'max-w-[70%] rounded-2xl px-3 py-2 text-sm shadow-sm',
                    msg.user === 'me'
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-white text-gray-900 rounded-bl-none'
                  )}
                >
                  {msg.text}
                  <div className="text-[10px] mt-1 text-black opacity-50 text-right">
                    {format(msg.createdAt, 'HH:mm')}
                  </div>
                </div>

                {msg.user === 'me' && (
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={msg.avatar} alt="avatar" />
                    <AvatarFallback>Me</AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default BoxChatting;
