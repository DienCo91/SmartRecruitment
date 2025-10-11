'use client';

import { Post } from '@/types/post';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { CalendarIcon, MessageCircleMoreIcon } from 'lucide-react';
import { AvatarUser } from '../Avatar/AvatarUser';
import { DecorateContent } from '../Jobs/DecorateContent';

interface Props {
  post: Post;
}

export function BlogDetail({ post }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-semibold">{post.title}</h3>
      <div className="flex items-center gap-5 text-sm font-normal">
        <AvatarUser src="" />
        <span>Hoàng Minh Khương</span>
        <div className="flex items-center gap-1 capitalize">
          <CalendarIcon size={16} />
          <span>{format(new Date(), 'dd MMM, yyyy', { locale: vi })}</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageCircleMoreIcon size={16} />
          <span>{25} Bình luận</span>
        </div>
      </div>
      <DecorateContent content={post.content} />
    </div>
  );
}
