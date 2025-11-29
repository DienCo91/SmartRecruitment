'use client';

import { LoadingCircle } from '@/components/Loadings/LoadingCircle';
import { IMAGE_EMPTY } from '@/constants';
import { setConservationCurrent, setMessages } from '@/lib/features/chat/chatSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { ChatServices } from '@/services/chat.services';
import { Conversation } from '@/types';
import { isEmployer } from '@/utils';
import { format } from 'date-fns';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AvatarUser } from '../Avatar/AvatarUser';
import InputChatting from './InputChatting';

interface IBoxChatting {
  convCurrent: Conversation;
}

const SIZE = 20;

enum ROLE {
  CANDIDATE = 'FROM_CANDIDATE',
  EMPLOYER = 'FROM_EMPLOYER',
}

const BoxChatting: React.FC<IBoxChatting> = ({ convCurrent }) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.auth.currentUser);
  const messages = useAppSelector(state => state.chat.messages);

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { id } = useParams();

  const getMessages = async (page: number) => {
    if (!id) return;

    try {
      const res = await ChatServices.getMessageForConversation(id as string, page, SIZE);

      if (page === 1) {
        dispatch(setMessages(res.data.content));
        await ChatServices.markAsRead(id as string);
      } else {
        dispatch(setMessages([...messages, ...res.data.content]));
      }

      if (res.data.content.length < SIZE) {
        setHasMore(false);
      } else {
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getMessages(1);

    return () => {
      dispatch(setMessages([]));
    };
  }, [id]);

  const renderDateSeparator = (prevDate: string | null, currDate: string) => {
    if (!prevDate) return true;

    const prev = new Date(prevDate);
    const curr = new Date(currDate);

    return (
      prev.getFullYear() !== curr.getFullYear() ||
      prev.getMonth() !== curr.getMonth() ||
      prev.getDate() !== curr.getDate()
    );
  };

  const fetchMore = () => {
    if (!hasMore) return;
    getMessages(page);
  };

  const handleSendText = (txt: string) => {
    const employer = isEmployer(currentUser?.role);
    dispatch(
      setMessages([
        {
          content: txt,
          timestampt: new Date().toISOString(),
          direction: employer ? ROLE.EMPLOYER : ROLE.CANDIDATE,
          id: Math.random().toString(),
          isRead: true,
          conversationId: convCurrent.conversationId,
        },
        ...messages,
      ])
    );
  };

  return (
    <>
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
          dataLength={messages?.length || 0}
          next={fetchMore}
          hasMore={hasMore}
          inverse={true}
          scrollableTarget="scrollableChat"
          loader={
            !!messages?.length ? (
              <LoadingCircle className="mt-[40px]" />
            ) : (
              <LoadingCircle className="mt-[40px] h-[calc(100vh-316px)]" />
            )
          }
          style={{ display: 'flex', flexDirection: 'column-reverse', overflow: 'visible' }}
        >
          {!!messages &&
            messages?.map((msg, idx, arr) => {
              const nextMsg = arr[idx + 1] ?? null;
              const showDate = renderDateSeparator(nextMsg?.timestampt ?? null, msg.timestampt);
              const employer = isEmployer(currentUser?.role);

              const roleUserSendMessage = employer ? ROLE.EMPLOYER : ROLE.CANDIDATE;
              const isSendByMe = msg.direction === roleUserSendMessage;

              return (
                <div key={msg.id}>
                  {showDate && (
                    <div className="text-center text-xs text-gray-400 my-2">
                      {format(msg.timestampt, 'EEEE, dd/MM/yyyy')}
                    </div>
                  )}

                  <div
                    className={cn(
                      'flex items-end gap-2',
                      isSendByMe ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {!isSendByMe && (
                      <AvatarUser
                        src={convCurrent?.partnerAvatarUrl}
                        classNameImage="object-cover"
                        className="border-none w-[36px] h-[36px]"
                      />
                    )}

                    <div
                      className={cn(
                        'max-w-[70%] rounded-2xl px-3 py-2 text-sm shadow-sm my-[8px]',
                        isSendByMe
                          ? 'bg-blue-500 text-white rounded-br-none'
                          : 'bg-background text-foreground rounded-bl-none'
                      )}
                    >
                      {msg.content}
                      <div className="text-[10px] mt-1 text-accent-foreground opacity-50 text-right">
                        {format(msg.timestampt, 'HH:mm')}
                      </div>
                    </div>

                    {isSendByMe && (
                      <AvatarUser
                        src={IMAGE_EMPTY}
                        classNameImage="object-cover"
                        className="border-none w-[36px] h-[36px]"
                      />
                    )}
                  </div>
                </div>
              );
            })}
        </InfiniteScroll>
      </div>
      <InputChatting
        recipientId={convCurrent.partnerId}
        handleSendText={handleSendText}
        convId={convCurrent.conversationId}
      />
    </>
  );
};

export default BoxChatting;
