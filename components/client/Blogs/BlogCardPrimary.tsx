import { CalendarIcon, MessageCircleMoreIcon } from 'lucide-react';
import { GlassCard } from '../Cards/GlassCard';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { CustomImage } from '../Images/CustomImage';
import Link from 'next/link';
import { Blog } from '@/types/blog';
import { AppImage } from '@/common';

interface Props {
  blog: Blog;
}

export function BlogCardPrimary({ blog }: Props) {
  return (
    <GlassCard title="" action classContentName="px-0">
      <div className="flex">
        <CustomImage
          src={blog.thumbnail}
          fallback={AppImage.fallback.blogFallback.src}
          alt={blog.title}
          className="h-[152px] w-[217px]"
        />

        <div className="flex flex-1 items-baseline pl-5">
          <div className="flex flex-col gap-2">
            <div className="flex gap-5 text-sm font-normal">
              <div className="flex items-center gap-1 capitalize">
                <CalendarIcon size={16} />
                <span>{format(blog.publishedAt!, 'dd MMM, yyyy', { locale: vi })}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircleMoreIcon size={16} />
                <span>{25} Bình luận</span>
              </div>
            </div>

            <Link
              href={`/blogs/${blog.slug}`}
              className="line-clamp-2 font-semibold hover:text-blue-300"
            >
              {blog.title}
            </Link>

            <p className="line-clamp-3 text-sm font-normal">{blog.description}</p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
