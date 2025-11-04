'use client';

import { BlogCardPrimary } from '@/components/client/Blogs/BlogCardPrimary';
import { FilterBlog } from '@/components/client/Blogs/FilterBlog';
import { PopularBlogTags } from '@/components/client/Blogs/PopularBlogTags';
import { RecentBlogs } from '@/components/client/Blogs/RecentBlogs';
import { GlassCard } from '@/components/client/Cards/GlassCard';
import { CustomPagination } from '@/components/client/Paginations/CustomPagination';
import { LoadingCircle } from '@/components/Loadings/LoadingCircle';
import { BlogService } from '@/services/blog.service';
import { Blog } from '@/types/blog';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    current: 1,
    total: 20,
    limit: 6,
  });

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await BlogService.getListBlogs();
      setBlogs(response.data as Blog[]);
    } catch {
      toast.error('Đã xảy ra lỗi');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, []);

  // const pages = useMemo(() => {
  //   return _.range(0, pagination.limit, 1).map((_, i) => <BlogCardPrimary key={i} />);
  // }, [pagination]);

  return (
    <div className="grid grid-cols-12 gap-3 mt-[60px]">
      <div className="col-span-4 flex flex-col gap-5">
        <FilterBlog />
        <RecentBlogs />
        <PopularBlogTags />
      </div>
      <GlassCard
        title=""
        className="col-span-8"
        classContentName="flex flex-col gap-3"
        footer={
          <CustomPagination
            className="w-full"
            curPage={pagination.current}
            totalPage={pagination.total}
            onPageChange={page => {
              setPagination(prev => ({ ...prev, current: page }));
            }}
          />
        }
      >
        {loading ? (
          <LoadingCircle />
        ) : (
          blogs.map(blog => <BlogCardPrimary key={blog.id} blog={blog} />)
        )}
      </GlassCard>
    </div>
  );
};

export default BlogsPage;
