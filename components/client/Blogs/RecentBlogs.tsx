import { GlassCard } from '../Cards/GlassCard';
import * as _ from 'lodash';
import { RecentBlogCard } from './RecentBlogCard';
import { useCallback, useEffect, useState } from 'react';
import { Blog } from '@/types/blog';
import { BlogService } from '@/services/blog.service';
import { toast } from 'sonner';
import { LoadingDot } from '@/components/Loadings/LoadingDot';
import { Size } from '@/constants';
import { LoadingCircle } from '@/components/Loadings/LoadingCircle';

export function RecentBlogs() {
  const [loading, setLoading] = useState<boolean>(false);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const fetchRecentBlog = useCallback(async () => {
    try {
      setLoading(true);
      const blogs = (
        await BlogService.getListBlogs({
          sort: '-createdAt',
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
  }, []);

  return (
    <GlassCard
      title={<h3 className="mb-3 font-semibold text-lg">Bài viết gần đây</h3>}
      action
      classContentName="px-0"
    >
      {loading ? (
        <LoadingCircle />
      ) : (
        recentBlogs.map(blog => <RecentBlogCard key={blog.id} blog={blog} />)
      )}
    </GlassCard>
  );
}
