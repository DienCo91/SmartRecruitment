'use client';

import { SearchBlog } from '@/components/admin/BlogManager/SearchBlog';
import { TableBlogManagement } from '@/components/admin/BlogManager/TableBlogManagement';
import { Typography } from '@/components/ui/typography';
import { BlogManagerProvider } from '@/providers/BlogManagerProvider';

const BlogManagerPage = () => {
  return (
    <BlogManagerProvider>
      <div className="p-[16px] space-y-3">
        <Typography variant="h5">Quản lý bài viết</Typography>
        <SearchBlog />
        <TableBlogManagement />
      </div>
    </BlogManagerProvider>
  );
};

export default BlogManagerPage;
