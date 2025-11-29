'use client';
import { CustomInput } from '@/components/Inputs/CustomInput';
import { SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import GlassCardBase from '../Cards/GlassCardBase';
import ChatFilter from './ChatFilter';
import ChatList from './ChatList';
import { ChatServices } from '@/services/chat.services';
import { Conversation } from '@/types';

const SIZE = 20;

const ChatContainer = () => {
  const [filter, setFilter] = useState('all');
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Conversation[]>([]);

  const getListConversation = async (page: number) => {
    try {
      const res = await ChatServices.getMyConversation({ page: page, size: SIZE });

      if (page === 1) {
        setData(res.data.content);
      } else {
        setData(prev => [...prev, ...res.data.content]);
      }

      if (res.data.content.length < SIZE) {
        setHasMore(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getListConversation(page);
  }, [filter]);

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
      <ChatList hasMore={hasMore} fetchMoreData={fetchMoreData} data={data} />
    </GlassCardBase>
  );
};

export default ChatContainer;
