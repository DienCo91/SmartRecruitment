'use client';

import { BlogCardPrimary } from '@/components/client/Blogs/BlogCardPrimary';
import { FilterBlog } from '@/components/client/Blogs/FilterBlog';
import { PopularBlogTags } from '@/components/client/Blogs/PopularBlogTags';
import { RecentBlogs } from '@/components/client/Blogs/RecentBlogs';
import { GlassCard } from '@/components/client/Cards/GlassCard';
import { CustomPagination } from '@/components/client/Paginations/CustomPagination';
import { BlogCardPrimarySkeleton } from '@/components/client/Skeletons/BlogCardPrimary';
import { QueryType } from '@/constants';
import { BlogService } from '@/services/blog.service';
import { Pagination } from '@/types';
import { Blog } from '@/types/blog';
import _, { range } from 'lodash';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const params = useSearchParams();
  const router = useRouter();
  const [pagination, setPagination] = useState<Pagination>({ limit: 5 });

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const query = _.omitBy(
        {
          keyword: params.get('keyword') || undefined,
          page: !isNaN(Number(params.get('page')))
            ? Math.max(0, Number(params.get('page')) - 1)
            : undefined,
          categoryIds: params.getAll(QueryType.QUERY_CATEGORY).map(Number),
          tagId: Number(params.get(QueryType.QUEY_TAG)) || undefined,
          limit: pagination.limit,
        },
        _.isNil
      );
      const response = await BlogService.getListBlogs(query);
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
          <>
            {range(0, 5).map((_, key) => (
              <BlogCardPrimarySkeleton key={key} />
            ))}
          </>
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
