'use client';

import { auth, authReady } from '@/lib/firebase';
import { connectStomp, disconnectStomp } from '@/lib/stompClient';
import { ChatServices } from '@/services/chat.services';
import { Conversation } from '@/types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Message {
  id: string;
  direction: 'FROM_CANDIDATE' | 'FROM_EMPLOYER';
  isRead: boolean;
  content: string;
  timestampt: string;
}

interface IBoxChatting {
  convCurrent: Conversation | null;
}

const BoxChatting: React.FC<IBoxChatting> = ({ convCurrent }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { id } = useParams();

  const getMessages = async () => {
    if (!id) return;

    try {
      const res = await ChatServices.getMessageForConversation(id as string);

      console.log('res', res);
      // setMessages(data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const initConnectStomp = async () => {
    await authReady;
    const token = await auth?.currentUser?.getIdToken();

    if (!token) return;

    connectStomp(
      token,
      msg => console.log('msg', msg),
      notify => console.log('Notification:', notify)
    );
  };

  useEffect(() => {
    getMessages();
    initConnectStomp();
    return () => disconnectStomp();
  }, [id]);

  const renderDateSeparator = (prevDate: Date | null, currDate: Date) => {
    if (!prevDate) return true;
    const diffHours = Math.abs(currDate.getTime() - prevDate.getTime()) / 36e5;
    return diffHours > 24;
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
      {/* <InfiniteScroll
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
          const showDate = renderDateSeparator(nextMsg?.timestampt ?? null, msg.timestampt);

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
                  <AvatarUser
                    src={msg.avatar}
                    classNameImage="object-cover"
                    className="border-none w-[36px] h-[36px]"
                  />
                )}

                <div
                  className={cn(
                    'max-w-[70%] rounded-2xl px-3 py-2 text-sm shadow-sm',
                    msg.user === 'me'
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-background text-foreground rounded-bl-none'
                  )}
                >
                  {msg.text}
                  <div className="text-[10px] mt-1 text-accent-foreground opacity-50 text-right">
                    {format(msg.createdAt, 'HH:mm')}
                  </div>
                </div>

                {msg.user === 'me' && (
                  <AvatarUser
                    src={msg.avatar}
                    classNameImage="object-cover"
                    className="border-none w-[36px] h-[36px]"
                  />
                )}
              </div>
            </div>
          );
        })}
      </InfiniteScroll> */}
    </div>
  );
};

export default BoxChatting;
