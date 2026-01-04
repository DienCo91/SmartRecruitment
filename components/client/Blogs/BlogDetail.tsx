'use client';

import { Blog } from '@/types/blog';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { CalendarIcon, MessageCircleMoreIcon } from 'lucide-react';
import { AvatarUser } from '../Avatar/AvatarUser';
import { DecorateContent } from '../Jobs/DecorateContent';

interface Props {
  blog: Blog;
  countComment?: number;
}

export function BlogDetail({ blog, countComment }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-semibold">{blog.title}</h3>
      <div className="flex items-center gap-5 text-sm font-normal">
        <AvatarUser src={blog.author.avatar} />
        <span>{blog.author.email}</span>
        <div className="flex items-center gap-1 capitalize">
          <CalendarIcon size={16} />
          <span>{format(blog.publishedAt!, 'dd MMM, yyyy', { locale: vi })}</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageCircleMoreIcon size={16} />
          <span>{countComment} Bình luận</span>
        </div>
      </div>
      <DecorateContent content={blog.content} />
    </div>
  );
}
