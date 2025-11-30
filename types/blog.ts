import { AuthorOfBlog } from './auth';

export interface ISpecificationParams {
  page?: number;
  limit?: number;
  sort?: string;
  keyword?: string;
  categoryIds?: number[];
  tagId?: number;
  location?: string;
}

export enum BlogStatus {
  DRAFT = 'DRAFT',
  REQUESTED = 'REQUESTED',
  PUBLISHED = 'PUBLISHED',
}

export const blogStatus = {
  [BlogStatus.DRAFT]: 'Nháp',
  [BlogStatus.REQUESTED]: 'Đang chờ',
  [BlogStatus.PUBLISHED]: 'Đã được duyệt',
};

export interface Blog {
  id: number;
  user_id: number;
  thumbnail: string;
  title: string;
  slug: string;
  content: string;
  description: string;
  cover_image_url: string;
  status?: 'PUBLISHED' | 'DRAFT' | 'REQUESTED';
  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  author: AuthorOfBlog;
}

export interface BlogCategory {
  id: number;
  name: string;
}

export interface CreateOrUpdateBlog extends Pick<Blog, 'title' | 'content'> {
  description?: string;
  status?: BlogStatus;
  tags?: string[];
  blogCategoryIds?: number[];
  thumbnail?: File;
}
