'use client';

import { UpdateOrCreateBlogFrom as UpdateBlogForm } from '@/components/client/Forms/UpdateOrCreateBlogForm';
import LoadingCustom from '@/components/ui/loading-custom';
import { BlogService } from '@/services/blog.service';
import { CreateOrUpdateBlog, DetailBlog } from '@/types/blog';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

const MyBlogEditPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [blog, setBlog] = useState<CreateOrUpdateBlog>();
  const { slug } = useParams();

  const fetchDetailMyBlog = useCallback(async () => {
    try {
      setLoading(true);
      const blog = (await BlogService.getMyBlogBySlug(slug!.toString())).data as DetailBlog;
      const tags = blog.tags.map(tag => tag.name);
      const blogCategoryIds = blog.categories.map(category => category.id);

      setBlog({ ...blog, tags, blogCategoryIds });
    } catch (e) {
      console.error(e);
      toast.error('Không lấy được chi tiết blog');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchDetailMyBlog();
  }, [fetchDetailMyBlog]);

  return (
    <div className="mt-[60px]">{loading ? <LoadingCustom /> : <UpdateBlogForm blog={blog} />}</div>
  );
};

export default MyBlogEditPage;
