import { CustomInput } from '@/components/Inputs/CustomInput';
import { useBlogManager } from '@/contexts';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';

export function SearchBlog() {
  const { filter, setFilter } = useBlogManager();
  const [keyword, setKeyword] = useState<string>('');

  const handleSearch = (e: { key: string }) => {
    if (e.key === 'Enter' && filter) {
      setFilter({ ...filter, keyword });
    }
  };

  return (
    <CustomInput
      startIcon={<SearchIcon size={18} className="hover:cursor-pointer" />}
      placeholder="Tìm kiếm bài viết"
      className="focus-within:ring-0 w-1/3"
      contentClassName="text-black/70"
      value={keyword}
      onChange={e => setKeyword(e.target.value)}
      onKeyDown={handleSearch}
    />
  );
}
