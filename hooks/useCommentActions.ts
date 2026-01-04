import { QueryKey } from '@/constants/queryKey';
import { useAppSelector } from '@/lib/hooks';
import { QueryOptions } from '@/providers/TanstackQueryProvider';
import { BlogService } from '@/services/blog.service';
import { CommentService } from '@/services/comment.service';
import { Comment, CreateComment } from '@/types/comment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useCommentActions(blogId: number) {
  const queryClient = useQueryClient();
  const currentUser = useAppSelector(state => state.auth.currentUser);
  const key = QueryKey.comment.blog(blogId);

  const useCommentQuery = useQuery<Comment[]>({
    queryKey: key,
    queryFn: async () => (await BlogService.getComments(blogId)).data,
    ...QueryOptions,
  });

  const useCreateCommentMutation = useMutation({
    mutationFn: async (data: CreateComment) => (await BlogService.createComment(blogId, data)).data,
    onSuccess: (comment: Comment) => {
      comment.createdBy = currentUser!;
      queryClient.setQueryData<Comment[]>(key, prev => {
        if (!prev) return prev;

        return [...prev, comment];
      });
      toast.success('Đã bình luận về bài viết');
    },
    onError: () => {
      toast.error('Bình luận thất bại');
    },
  });

  const useDeleteCommentMutation = useMutation({
    mutationFn: async (id: number) => {
      await CommentService.deleteComment(id);
      return id;
    },
    onSuccess: (id: number) => {
      queryClient.setQueryData<Comment[]>(key, prev => {
        if (!prev) return prev;

        return prev.filter(comment => comment.id !== id);
      });
      toast.success('Đã xóa bình luận');
    },
    onError: () => {
      toast.error('Xóa bình luận thất bại');
    },
  });

  const useUpdateCommentMutation = useMutation({
    mutationFn: async ({ id, content }: { id: number; content: string }) => {
      return (await CommentService.updateComment(id, content)).data;
    },
    onSuccess: (comment: Comment) => {
      queryClient.setQueryData<Comment[]>(key, prev => {
        if (!prev) return prev;

        return prev.map(item =>
          item.id === comment.id ? { ...item, content: comment.content } : item
        );
      });
      toast.success('Đã cập nhật bình luận');
    },
    onError: () => {
      toast.error('Cập nhật bình luận thất bại');
    },
  });

  return {
    useCommentQuery,
    useCreateCommentMutation,
    useDeleteCommentMutation,
    useUpdateCommentMutation,
  };
}
