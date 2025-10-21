'use client';
import { CustomInput } from '@/components/Inputs/CustomInput';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';
import GlassCardBase from '../Cards/GlassCardBase';
import ChatFilter from './ChatFilter';
import ChatList from './ChatList';

const ChatContainer = () => {
  const [filter, setFilter] = useState('all');

  return (
    <GlassCardBase className="mr-[16px] w-[300px] hover:translate-y-[0px] px-0">
      <h1 className="font-bold text-[18px] px-4">Đoạn chat</h1>
      <CustomInput
        startIcon={<SearchIcon size={14} />}
        placeholder="Tìm kiếm"
        className="border-none rounded-4xl mx-4"
      />

      <ChatFilter filter={filter} setFilter={setFilter} />
      <ChatList />
    </GlassCardBase>
  );
};

export default ChatContainer;
