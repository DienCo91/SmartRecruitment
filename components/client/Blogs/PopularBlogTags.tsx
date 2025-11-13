import { QueryType } from '@/constants';
import { BlogService } from '@/services/blog.service';
import { TagData } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { GlassCard } from '../Cards/GlassCard';
import { Tag } from '../Tags/Tag';
import { useRouter, useSearchParams } from 'next/navigation';

export function PopularBlogTags() {
  const searchParam = useSearchParams();
  const [tags, setTags] = useState<TagData[]>();
  const params = new URLSearchParams(window.location.search);
  const router = useRouter();

  const handleFilterTag = (tagId: number) => {
    params.set(QueryType.QUEY_TAG, String(tagId));
    router.push(`/blogs?${params.toString()}`);
  };

  const fecthPopularTags = useCallback(async () => {
    try {
      const popularTags = (await BlogService.getPopularTags()).data as TagData[];
      setTags(popularTags);
    } catch {
      toast.error('Lỗi ko lấy được tag phổ biến của blog');
    }
  }, []);

  useEffect(() => {
    fecthPopularTags();
  }, [fecthPopularTags]);

  return (
    <GlassCard title="Tag phổ biến" action classContentName="flex flex-wrap p-0">
      {tags?.map(tag => (
        <Tag
          key={tag.id}
          content={tag.name}
          onClick={() => handleFilterTag(tag.id)}
          active={tag.id === Number(searchParam.get(QueryType.QUEY_TAG))}
        />
      ))}
    </GlassCard>
  );
}
