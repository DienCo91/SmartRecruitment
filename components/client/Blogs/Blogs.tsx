import Link from 'next/link';
import { GlassCard } from '../Cards/GlassCard';
import { BlogCard } from './BlogCard';
import { Router } from '@/constants';
import { useCallback, useEffect, useState } from 'react';
import { Blog } from '@/types/blog';
import { BlogService } from '@/services/blog.service';

export function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const fetchBlogs = useCallback(async () => {
    const blogs = (await BlogService.getListBlogs({ page: 0, limit: 4 })).data as Blog[];
    setBlogs(blogs);
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
        {blogs.map(blog => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </GlassCard>
  );
}
