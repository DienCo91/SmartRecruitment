import { LoadingCircle } from '@/components/Loadings/LoadingCircle';
import { setFilters } from '@/lib/features/filters/filterSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { JobServices } from '@/services/job.services';
import { TagData } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { GlassCard } from '../Cards/GlassCard';
import { Tag } from './Tag';

export function PopularTags() {
  const [tags, setTags] = useState<TagData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.filter);

  const handleFilterTag = (tagId: number) => {
    const newFilter = { ...filter, tagId: tagId };
    dispatch(setFilters(newFilter));
  };

  const fetchPopularTags = useCallback(async () => {
    try {
      setLoading(true);
      const tags = (await JobServices.getPopularTags()).data;
      setTags(tags);
    } catch (e) {
      console.error(e);
      toast.error('Đã xảy ra lỗi');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPopularTags();
  }, [fetchPopularTags]);

  return (
    <GlassCard
      icon={<span className="text-violet-400 font-bold">#</span>}
      title="Tag phổ biến"
      classContentName="flex flex-wrap p-0"
    >
      {loading ? (
        <LoadingCircle />
      ) : Boolean(tags.length) ? (
        tags.map(tag => (
          <Tag key={tag.id} content={tag.name} onClick={() => handleFilterTag(tag.id)} />
        ))
      ) : (
        <p>Không tồn tại tag phổ biến</p>
      )}
    </GlassCard>
  );
}
