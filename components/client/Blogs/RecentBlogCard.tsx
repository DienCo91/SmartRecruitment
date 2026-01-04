import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import Link from 'next/link';
import { GlassCard } from '../Cards/GlassCard';
import { CustomImage } from '../Images/CustomImage';
import { Blog } from '@/types/blog';
import { AppImage } from '@/common';

interface Props {
  blog: Blog;
}

export function RecentBlogCard({ blog }: Props) {
  return (
    <GlassCard title="" action classContentName="px-0" className="mb-3">
      <div className="flex">
        <CustomImage
          src={blog.thumbnail}
          fallback={AppImage.fallback.blogFallback.src}
          alt={blog.title}
          className="h-[75px] w-[100px]"
        />

        <div className="flex flex-1 items-baseline pl-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm font-normal">
              <div className="flex items-center gap-1 capitalize">
                <span>{format(blog.publishedAt!, 'dd MMM, yyyy', { locale: vi })}</span>
              </div>
              <span className="rounded-full size-1 bg-gray-300" />
              <div className="flex items-center gap-1">
                <span>{blog.commentCount} Bình luận</span>
              </div>
            </div>

            <Link
              href={`/blogs/${blog.slug}`}
              className="line-clamp-2 font-semibold hover:text-blue-300"
              title="10 lý do nghỉ việc công ty cũ khéo léo và thuyết phục nhà tuyển dụng"
            >
              {blog.title}
            </Link>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
