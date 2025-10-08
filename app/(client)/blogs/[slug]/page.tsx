'use client';

import { BlogDetail } from '@/components/client/Blogs/BlogDetail';
import { FilterBlog } from '@/components/client/Blogs/FilterBlog';
import { PopularBlogTags } from '@/components/client/Blogs/PopularBlogTags';
import { RecentBlogs } from '@/components/client/Blogs/RecentBlogs';
import { GlassCard } from '@/components/client/Cards/GlassCard';
import { mockedPost } from '@/constants/mockedData';
import { Post } from '@/types/post';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const JobDetailPage = () => {
  const { slug } = useParams();
  console.log(slug);
  const [post, setPost] = useState<Post>(mockedPost);

  return (
    <GlassCard className="mt-10 hover:bg-transparent" title="" action>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-8">
          <BlogDetail post={post} />
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

export default JobDetailPage;
