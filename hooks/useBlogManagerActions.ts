import { AdminBlogColumns } from '@/components/admin/BlogManager/Columns';
import { QueryKey } from '@/constants/queryKey';
import { QueryOptions } from '@/providers/TanstackQueryProvider';
import { AdminService } from '@/services/admin.services';
import { ApiPaginationResponse } from '@/types';
import { BlogStatus, ISpecificationBlogManageParams } from '@/types/blog';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useBlogManagerActions(params: ISpecificationBlogManageParams) {
  const queryClient = useQueryClient();
  const key = QueryKey.blogManage.listWithParams(params);

  const useBlogManageQuery = useQuery<ApiPaginationResponse<AdminBlogColumns[]>>({
    queryKey: key,
    queryFn: async () => await AdminService.getBlogs(params),
    ...QueryOptions,
  });

  const useDeleteBlogManageMutation = useMutation({
    mutationFn: async (id: number) => {
      await AdminService.deleteBlog(id);
      return id;
    },
    onSuccess: (id: number) => {
      queryClient.setQueryData<ApiPaginationResponse<AdminBlogColumns[]>>(key, prev => {
        if (!prev) return prev;
        const data = prev.data.filter(blog => blog.id !== id);

        return { ...prev, data };
      });
      toast.success('Đã xóa bài viết');
    },
    onError: () => {
      toast.error('Xóa bài viết thất bại');
    },
  });

  const usePublishBlogManageMutation = useMutation({
    mutationFn: async (id: number) => {
      await AdminService.publishBlog(id);
      return id;
    },
    onSuccess: (id: number) => {
      queryClient.setQueryData<ApiPaginationResponse<AdminBlogColumns[]>>(key, prev => {
        if (!prev) return prev;

        return {
          ...prev,
          data: prev.data.map(blog =>
            blog.id === id ? { ...blog, status: BlogStatus.PUBLISHED } : blog
          ),
        };
      });

      toast.success('Đăng bài viết thành công');
    },
    onError: () => {
      toast.error('Đăng bài viết thất bại');
    },
  });

  return {
    useBlogManageQuery,
    useDeleteBlogManageMutation,
    usePublishBlogManageMutation,
  };
}
