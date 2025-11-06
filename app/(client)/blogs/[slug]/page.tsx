'use client';

import { BlogDetail } from '@/components/client/Blogs/BlogDetail';
import { FilterBlog } from '@/components/client/Blogs/FilterBlog';
import { PopularBlogTags } from '@/components/client/Blogs/PopularBlogTags';
import { RecentBlogs } from '@/components/client/Blogs/RecentBlogs';
import { GlassCard } from '@/components/client/Cards/GlassCard';
import { Comments } from '@/components/client/Comments/Comments';
import { LoadingCircle } from '@/components/Loadings/LoadingCircle';
import { BlogService } from '@/services/blog.service';
import { Blog } from '@/types/blog';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState<Blog>();
  const [loading, setLoading] = useState<boolean>(false);
  const fetchBlog = useCallback(async () => {
    try {
      setLoading(true);
      const blog = (await BlogService.getBlogBySlug(String(slug))).data as Blog;
      console.log(blog);
      setBlog(blog);
    } catch {
      toast.error('Đã có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);
  return (
    <GlassCard className="mt-10 hover:bg-transparent" title="" action footer={<Comments />}>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-8">
          {loading ? (
            <LoadingCircle />
          ) : blog ? (
            <BlogDetail blog={blog} />
          ) : (
            <p>Không tìm thấy blog.</p>
          )}
        </div>
        <div className="col-span-4 flex flex-col gap-5">
          <FilterBlog />
          <RecentBlogs />
          <PopularBlogTags />
        </div>
      </div>
    </GlassCard>
  );
};

export default BlogDetailPage;
