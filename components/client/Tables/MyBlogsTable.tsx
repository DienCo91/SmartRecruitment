/* eslint-disable @typescript-eslint/no-empty-object-type */

import { AppImage } from '@/common';
import { Button } from '@/components/ui/button';
import { renderStatus } from '@/helpers/functions';
import { useAppSelector } from '@/lib/hooks';
import { BlogService } from '@/services/blog.service';
import { Pagination } from '@/types';
import { Blog, BlogStatus } from '@/types/blog';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDownIcon, EyeIcon, SquarePenIcon, TrashIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ConfirmDeleteDialog } from '../Dialogs/ConfirmDeleteDialog';
import { CustomImage } from '../Images/CustomImage';
import { DataTable } from './DataTable';
import { useRouter } from 'next/navigation';
import { Router } from '@/constants';

interface BlogColumns extends Pick<
  Blog,
  'id' | 'thumbnail' | 'title' | 'createdAt' | 'status' | 'slug'
> {}

export function MyBlogsTable() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const [blogDelete, setBlogDelete] = useState<BlogColumns>();
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
  });
  const router = useRouter();
  const currentUser = useAppSelector(state => state.auth.currentUser);

  const handleDeleteBlog = useCallback(async (id: number) => {
    try {
      await BlogService.deleteBlog(id);
      setBlogs(prev => prev.filter(blog => blog.id != id));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const columns: ColumnDef<BlogColumns>[] = [
    {
      accessorKey: 'stt',
      header: 'STT',
      cell: ({ row }) => (
        <p className="text-center">{(pagination.page! - 1) * pagination.limit! + row.index + 1}</p>
      ),
    },
    {
      accessorKey: 'thumbnail',
      header: 'Ảnh',
      cell: ({ row }) => {
        const blog = row.original;
        return (
          <CustomImage
            src={blog.thumbnail}
            fallback={AppImage.fallback.blogFallback.src}
            alt={blog.title}
            classNameImage="object-cover"
            className="h-full w-40 aspect-video"
          />
        );
      },
    },
    {
      accessorKey: 'title',
      header: ({ column }) => {
        return (
          <Button
            variant="transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Tiêu đề
            <ArrowUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const blog = row.original;
        return <p className="font-semibold">{blog.title}</p>;
      },
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => {
        return (
          <Button
            variant="transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Ngày tạo
            <ArrowUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const blog = row.original;
        return <p>{format(new Date(blog.createdAt!), 'dd/MM/yyyy')}</p>;
      },
    },
    {
      accessorKey: 'status',
      header: 'Trạng thái',
      cell: ({ row }) => {
        const blog = row.original;
        return renderStatus(blog!.status as BlogStatus);
      },
    },
    {
      accessorKey: 'actions',
      header: 'Hành động',
      cell: ({ row }) => {
        const blog = row.original;
        return (
          <div className="flex items-center">
            {blog.status != BlogStatus.PUBLISHED ? (
              <Button
                variant="ghost"
                onClick={() => router.push(`${Router.MY_BLOG}/edit/${blog.slug}`)}
              >
                <SquarePenIcon size={18} />
              </Button>
            ) : (
              <Button variant="ghost" onClick={() => router.push(`${Router.BLOGS}/${blog.slug}`)}>
                <EyeIcon size={18} />
              </Button>
            )}
            <Button
              variant="ghost"
              onClick={() => {
                setShowConfirmDialog(true);
                setBlogDelete(blog);
              }}
            >
              <TrashIcon size={18} />
            </Button>
          </div>
        );
      },
    },
  ];

  const fetchMyBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const { data: blogs, meta } = await BlogService.getMyBlogs(currentUser!.id, {
        page: pagination.page,
        limit: pagination.limit,
        sort: '-createdAt',
      });
      setBlogs(blogs);
      setPagination(meta);
    } catch (e) {
      console.error(e);
      toast.error('Không lấy được các bài viết của tôi');
    } finally {
      setLoading(false);
    }
  }, [currentUser, pagination.limit, pagination.page]);

  useEffect(() => {
    fetchMyBlogs();
  }, [fetchMyBlogs]);

  return (
    <>
      <DataTable
        columns={columns}
        data={blogs}
        pagination={pagination}
        setPagination={setPagination}
        isLoading={loading}
      />

      {showConfirmDialog && (
        <ConfirmDeleteDialog
          title="Bạn có chắc muốn xóa"
          description="Hành động này sẽ xóa blog của bạn và không thể khôi phục"
          onClose={() => setShowConfirmDialog(false)}
          onDelete={() => handleDeleteBlog(blogDelete!.id)}
        />
      )}
    </>
  );
}
