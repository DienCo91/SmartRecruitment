import { cn } from '@/lib/utils';
import React from 'react';

const LIST_FILTER = [
  {
    label: 'Tất Cả',
    value: 'all',
  },
  {
    label: 'Chưa đọc',
    value: 'unread',
  },
];

interface IChatFilter {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const ChatFilter: React.FC<IChatFilter> = ({ filter, setFilter }) => {
  const handleFilter = (value: string) => {
    setFilter(value);
  };
  return (
    <div className="flex gap-2 text-[13px] mx-4">
      {LIST_FILTER.map((item, index) => (
        <div
          onClick={() => handleFilter(item.value)}
          key={index}
          className={cn(
            'flex flex-1 justify-center py-[4px] cursor-pointer rounded-full border-[1px] border-white',
            item.value === filter ? 'bg-background text-foreground font-bold ' : 'hover:bg-white/10'
          )}
        >
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatFilter;
