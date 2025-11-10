'use client';

import { BlogCardPrimary } from '@/components/client/Blogs/BlogCardPrimary';
import { FilterBlog } from '@/components/client/Blogs/FilterBlog';
import { PopularBlogTags } from '@/components/client/Blogs/PopularBlogTags';
import { RecentBlogs } from '@/components/client/Blogs/RecentBlogs';
import { GlassCard } from '@/components/client/Cards/GlassCard';
import { CustomPagination } from '@/components/client/Paginations/CustomPagination';
import { LoadingCircle } from '@/components/Loadings/LoadingCircle';
import { BlogService } from '@/services/blog.service';
import { Pagination } from '@/types';
import { Blog } from '@/types/blog';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const params = useSearchParams();
  const router = useRouter();
  const [pagination, setPagination] = useState<Pagination>({});

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await BlogService.getListBlogs({
        keyword: params.get('keyword') ?? '',
        page: Number(params.get('page')) - 1 < 0 ? 0 : Number(params.get('page')) - 1,
        limit: 10,
      });
      setBlogs(response.data as Blog[]);
      setPagination(response.meta as Pagination);
    } catch {
      toast.error('Đã xảy ra lỗi');
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  useEffect(() => {
    console.log(pagination.page);
  }, [pagination]);

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
        classContentName="flex flex-col gap-3 flex-1"
        footer={
          Boolean(blogs.length) && (
            <CustomPagination
              className="w-full"
              curPage={pagination.page!}
              totalPage={pagination.totalPages!}
              onPageChange={page => {
                const params = new URLSearchParams(window.location.search);
                params.set('page', String(page));
                router.push(`/blogs?${params.toString()}`);
              }}
            />
          )
        }
      >
        {loading ? (
          <LoadingCircle />
        ) : Boolean(blogs.length) ? (
          blogs.map(blog => <BlogCardPrimary key={blog.id} blog={blog} />)
        ) : (
          <p className="text-center">Không tìm thấy bài viết nào.</p>
        )}
      </GlassCard>
    </div>
  );
};

export default BlogsPage;
