import { QueryKey } from '@/constants/queryKey';
import { BlogService } from '@/services/blog.service';
import { CreateComment } from '@/types/comment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useCommentActions(blogId: number) {
  const queryClient = useQueryClient();

  const getComments = useQuery({
    queryKey: QueryKey.all,
    queryFn: async () => (await BlogService.getComments(blogId)).data,
  });

  const createComment = useMutation({
    mutationFn: async (data: CreateComment) => await BlogService.createComment(blogId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKey.all });
      toast.success('Đã bình luận về bài viết');
    },
    onError: () => {
      toast.error('Bình luận thất bại');
    },
  });

  return { getComments, createComment };
}
