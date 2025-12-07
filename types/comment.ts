/* eslint-disable @typescript-eslint/no-empty-object-type */
import { CurrentUser } from '@/lib/features/auth/type';

export interface Comment {
  id: number;
  parentId?: number;
  content: string;
  createdAt: Date;
  createdBy: CurrentUser;
  childs: Comment[];
}

export interface CreateComment extends Pick<Comment, 'parentId' | 'content'> {}
