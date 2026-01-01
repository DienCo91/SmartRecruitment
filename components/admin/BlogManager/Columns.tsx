/* eslint-disable @typescript-eslint/no-empty-object-type */
import { AppImage } from '@/common';
import { CustomImage } from '@/components/client/Images/CustomImage';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { renderStatus } from '@/helpers/functions';
import { Blog, BlogStatus, ISpecificationBlogManageParams } from '@/types/blog';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDownIcon } from 'lucide-react';
import { DeleteBlogAction } from './DeleteBlogAction';
import { DetailBlogAction } from './DetailBlogAction';
import { FilterStatusHeader } from './FilterStatusHeader';
import { PublishBlogAction } from './PublishBlogAction';

export interface AdminBlogColumns
  extends Pick<Blog, 'id' | 'thumbnail' | 'title' | 'createdAt' | 'status' | 'author'> {}

export const columnsAdminBlog = (
  filter: ISpecificationBlogManageParams
): ColumnDef<AdminBlogColumns>[] => [
  {
    accessorKey: 'stt',
    header: () => <Typography variant="small">STT</Typography>,
    cell: ({ row }) => (
      <Typography className="text-center">
        {(filter.page! - 1) * filter.limit! + row.index + 1}
      </Typography>
    ),
  },
  {
    accessorKey: 'thumbnail',
    header: () => <Typography variant="small">Ảnh</Typography>,
    cell: ({ row }) => {
      const blog = row.original;
      return (
        <CustomImage
          src={blog.thumbnail}
          fallback={AppImage.bgCompanyProfile.src}
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
          <Typography variant="small">Tiêu đề</Typography>,
          <ArrowUpDownIcon className="h-4 w-4 stroke-foreground" />
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
          <Typography variant="small">Ngày tạo</Typography>
          <ArrowUpDownIcon className="h-4 w-4 stroke-foreground" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const blog = row.original;
      return <p>{format(new Date(blog.createdAt!), 'dd/MM/yyyy')}</p>;
    },
  },
  {
    accessorKey: 'author',
    header: () => <Typography variant="small">Tác giả</Typography>,
    cell: ({ row }) => {
      const blog = row.original;
      return (
        <div title={blog.author.fullName || blog.author.email}>
          <CustomImage
            src={blog.author.avatar!}
            fallback={AppImage.fallback.companyFallback.src}
            alt={blog.title}
            classNameImage="object-cover"
            className="size-10 rounded-full"
          />
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: () => <FilterStatusHeader />,
    cell: ({ row }) => {
      const blog = row.original;
      return renderStatus(blog!.status as BlogStatus);
    },
  },
  {
    accessorKey: 'actions',
    header: () => <Typography variant="small">Hành động</Typography>,
    cell: ({ row }) => {
      const blog = row.original;
      return (
        <div className="flex items-center">
          {blog.status !== BlogStatus.PUBLISHED && <PublishBlogAction id={blog.id} />}
          <DetailBlogAction blog={blog} />
          <DeleteBlogAction blog={blog} />
        </div>
      );
    },
  },
];
