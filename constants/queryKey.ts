import { ISpecificationBlogManageParams } from '@/types/blog';

export const QueryKey = {
  comment: {
    all: ['comment'] as const,
    blogs: () => [...QueryKey.comment.all, 'blog'] as const,
    blog: (id: number) => [...QueryKey.comment.blogs(), id] as const,
  },

  blogManage: {
    all: ['admin', 'blogs'] as const,
    listWithParams: (params: ISpecificationBlogManageParams) =>
      [...QueryKey.blogManage.all, params] as const,
  },
};
