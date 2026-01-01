import { LoadingCircle } from '@/components/Loadings/LoadingCircle';
import { BlogService } from '@/services/blog.service';
import { Blog } from '@/types/blog';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { GlassCard } from '../Cards/GlassCard';
import { RecentBlogCard } from './RecentBlogCard';
import { range } from 'lodash';
import { RecentBlogCardSkeleton } from '../Skeletons/RecentBlogCardSkeleton';

export function RecentBlogs() {
  const [loading, setLoading] = useState<boolean>(false);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const fetchRecentBlog = useCallback(async () => {
    try {
      setLoading(true);
      const blogs = (
        await BlogService.getListBlogs({
          sort: '-createdAt',
          limit: 3,
        })
      ).data as Blog[];
      setRecentBlogs(blogs);
    } catch {
      toast.error('Đã xảy ra lỗi');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecentBlog();
  }, [fetchRecentBlog]);

  return (
    <GlassCard
      title={<h3 className="mb-3 font-semibold text-lg">Bài viết gần đây</h3>}
      action
      classContentName="px-0"
    >
      {loading ? (
        <>
          {range(0, 3).map((_, key) => (
            <RecentBlogCardSkeleton key={key} />
          ))}
        </>
      ) : (
        recentBlogs.map(blog => <RecentBlogCard key={blog.id} blog={blog} />)
      )}
    </GlassCard>
  );
}
