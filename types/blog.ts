/* eslint-disable @typescript-eslint/no-empty-object-type */
import { TagData } from '.';
import { AuthorOfBlog } from './auth';

export interface ISpecificationParams {
  page?: number;
  limit?: number;
  sort?: string;
  keyword?: string;
  categoryIds?: number[];
  tagId?: number;
  location?: string;
  status?: BlogStatus;
}

export interface ISpecificationBlogManageParams extends Pick<
  ISpecificationParams,
  'page' | 'keyword' | 'status' | 'limit'
> {}

export enum BlogStatus {
  DRAFT = 'DRAFT',
  REQUESTED = 'REQUESTED',
  PUBLISHED = 'PUBLISHED',
}

export const blogStatus = {
  [BlogStatus.DRAFT]: 'Nháp',
  [BlogStatus.REQUESTED]: 'Đang chờ',
  [BlogStatus.PUBLISHED]: 'Đã duyệt',
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
  status?: BlogStatus;
  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  author: AuthorOfBlog;
  commentCount?: number;
}

export interface DetailBlog extends Blog {
  tags: TagData[];
  categories: BlogCategory[];
}

export interface BlogCategory {
  id: number;
  name: string;
}

export interface CreateOrUpdateBlog extends Pick<Blog, 'title' | 'content' | 'status'> {
  id?: number;
  description?: string;
  tags?: string[];
  blogCategoryIds?: number[];
  thumbnail?: File | string;
}
