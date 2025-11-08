import { ISpecificationParams } from '@/types/blog';
import http from '.';

const endpointPrefix = '/api/blogs';

export const BlogService = {
  getListBlogs: async (data?: ISpecificationParams) => {
    const res = await http.get(`${endpointPrefix}`, {
      params: data,
    });
    return res.data;
  },

  getBlogBySlug: async (slug: string) => {
    const res = await http.get(`${endpointPrefix}/slug/${slug}`);
    return res.data;
  },
};
