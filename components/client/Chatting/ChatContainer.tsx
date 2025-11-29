'use client';
import { CustomInput } from '@/components/Inputs/CustomInput';
import { Router } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { ChatServices } from '@/services/chat.services';
import { Conversation } from '@/types';
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import GlassCardBase from '../Cards/GlassCardBase';
import ChatFilter from './ChatFilter';
import ChatList from './ChatList';
import { setConservationCurrent } from '@/lib/features/chat/chatSlice';

const SIZE = 20;

const ChatContainer = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState('all');
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Conversation[]>([]);
  const messagesCurrent = useAppSelector((state: RootState) => state.chat.messages);
  const lastMessageStomp = useAppSelector((state: RootState) => state.chat.lastMessageStomp);

  const getListConversation = async (page: number) => {
    try {
      const payload: {
        page?: number;
        size?: number;
        isRead?: boolean;
      } = {
        page: page,
        size: SIZE,
      };

      if (filter !== 'all') payload.isRead = false;
      const res = await ChatServices.getMyConversation(payload);

      if (page === 1) {
        setData(res.data.content);
        if (res.data.content.length > 0) {
          router.push(`${Router.CHATTING}/${res.data.content[0].conversationId}`);
          dispatch(setConservationCurrent(res.data.content[0]));
        }
      } else {
        setData(prev => [...prev, ...res.data.content]);
      }

      if (res.data.content.length < SIZE) {
        setHasMore(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    setData([]);
    setHasMore(true);
    getListConversation(page);
  }, [filter]);

  useEffect(() => {
    if (messagesCurrent[0]?.conversationId) {
      setData(prev =>
        prev.map(item => {
          if (item.conversationId === messagesCurrent[0]?.conversationId) {
            return {
              ...item,
              unreadCount: 0,
              lastMessage: messagesCurrent[0].content,
            };
          }
          return item;
        })
      );
    }
  }, [messagesCurrent]);

  useEffect(() => {
    setData(prev =>
      prev.map(item => {
        if (item.conversationId === lastMessageStomp?.conversationId) {
          return {
            ...item,
            lastMessage: lastMessageStomp.content,
            unreadCount: item.unreadCount + 1,
          };
        }
        return item;
      })
    );
  }, [lastMessageStomp]);

  const fetchMoreData = async () => {
    if (!hasMore) return;
    const nextPage = page + 1;
    await getListConversation(nextPage);
    setPage(nextPage);
  };

  return (
    <GlassCardBase className="mr-[16px] w-[300px] hover:translate-y-[0px] px-0">
      <h1 className="font-bold text-[18px] px-4">Đoạn chat</h1>
      <CustomInput
        startIcon={<SearchIcon size={14} />}
        placeholder="Tìm kiếm"
        className="border-none rounded-4xl mx-4"
      />

      <ChatFilter filter={filter} setFilter={setFilter} />
      <ChatList hasMore={hasMore} fetchMoreData={fetchMoreData} data={data} setData={setData} />
    </GlassCardBase>
  );
};

export default ChatContainer;
