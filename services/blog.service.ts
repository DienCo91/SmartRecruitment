import { ISpecificationParams } from '@/types/blog';
import http from '.';
import qs from 'qs';

const endpointPrefix = '/api/blogs';

export const BlogService = {
  getListBlogs: async (data?: ISpecificationParams) => {
    const res = await http.get(`${endpointPrefix}`, {
      params: data,
      paramsSerializer: params => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      },
    });
    return res.data;
  },

  getBlogBySlug: async (slug: string) => {
    const res = await http.get(`${endpointPrefix}/slug/${slug}`);
    return res.data;
  },

  getBlogCategories: async () => {
    const res = await http.get(`${endpointPrefix}/categories`);
    return res.data;
  },

  getPopularTags: async () => {
    const res = await http.get(`${endpointPrefix}/popular-tags`);
    return res.data;
  },

  getMyBlogs: async (id: number, data?: ISpecificationParams) => {
    const res = await http.get(`${endpointPrefix}/user/${id}`, {
      params: data,
      paramsSerializer: params => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      },
    });
    return res.data;
  },

  getMyBlogBySlug: async (slug: string) => {
    const res = await http.get(`${endpointPrefix}/my/${slug}`);
    return res.data;
  },

  deleteBlog: async (id: number) => {
    const res = await http.delete(`${endpointPrefix}/${id}`);
    return res.data;
  },

  createBlog: async (data: FormData) => {
    const res = await http.post(`${endpointPrefix}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },

  updateBlog: async (id: number, data: FormData) => {
    const res = await http.patch(`${endpointPrefix}/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },
};
