import Link from 'next/link';
import { GlassCard } from '../Cards/GlassCard';
import { BlogCard } from './BlogCard';
import { Router } from '@/constants';
import { useCallback, useEffect, useState } from 'react';
import { Blog } from '@/types/blog';
import { BlogService } from '@/services/blog.service';
import { range } from 'lodash';
import { BlogCardSkeleton } from '../Skeletons/BlogCardSkeleton';

export function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const blogs = (await BlogService.getListBlogs({ page: 0, limit: 4 })).data as Blog[];
      setBlogs(blogs);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <GlassCard
      icon="📚"
      title="Blog"
      action={
        <Link href={Router.BLOGS} className="hover:text-white cursor-pointer text-sm">
          Xem tất cả
        </Link>
      }
      className="mt-5"
      classContentName="p-0"
    >
      <div className="flex flex-col gap-3">
        {loading ? (
          <>
            {range(0, 4).map((_, key) => (
              <BlogCardSkeleton key={key} />
            ))}
          </>
        ) : (
          blogs.map(blog => <BlogCard key={blog.id} blog={blog} />)
        )}
      </div>
    </GlassCard>
  );
}
