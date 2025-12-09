import { CustomButton } from '@/components/Buttons/CustomButton';
import { LoadingCircle } from '@/components/Loadings/LoadingCircle';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useCommentActions } from '@/hooks/useCommentActions';
import { Comment } from '@/types/comment';
import { useState } from 'react';
import { LetterICanvas } from '../Canvas/LetterICanvas';
import { CommentCard } from './CommentCard';

interface Props {
  entityId: number;
}

const treeComments = (comments: Comment[], parentId: number | null): Comment[] => {
  return comments
    .filter(comment => comment.parentId === parentId)
    .map(comment => ({
      ...comment,
      childs: treeComments(comments, comment.id),
    }));
};

const CommentTree = (comments: Comment[], entityId: number) => {
  return comments.map(comment => (
    <div className="flex" key={comment.id}>
      <LetterICanvas />
      <CommentCard key={comment.id} comment={comment} of={{ id: entityId }} />
    </div>
  ));
};

export function Comments({ entityId }: Props) {
  const [content, setContent] = useState<string>('');

  const { useCommentQuery, useCreateCommentMutation } = useCommentActions(entityId);
  const {
    data: comments,
    isLoading: isLoadingGetComment,
    isSuccess: isSuccessGetComments,
  } = useCommentQuery;

  const handleCreateComment = async () => {
    useCreateCommentMutation.mutate({ content });
    setContent('');
  };

  return (
    <div className="w-2/3 space-y-2">
      <h3 className="font-semibold text-lg">Bình luận về bài viết</h3>
      <Textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Chia sẻ suy nghĩ của bạn về bài viết."
        className="resize-none focus-visible:ring-0 w-full bg-white/10"
        onKeyDown={e => {
          if (e.ctrlKey && e.key === 'Enter') handleCreateComment();
        }}
      />
      <CustomButton
        className="my-4 bg-white/30 text-white hover:bg-white/20 hover:text-gray-200"
        disabled={useCreateCommentMutation.isPending}
        onClick={handleCreateComment}
      >
        Tạo bình luận
      </CustomButton>
      <Separator className="bg-gray-500 my-2" />
      <h3 className="font-semibold text-lg">Bình luận</h3>
      <div className="w-full">
        {isLoadingGetComment ? (
          <LoadingCircle />
        ) : isSuccessGetComments ? (
          CommentTree(treeComments(comments, null), entityId)
        ) : (
          <p className="text-gray-300 text-sm text-center">Chưa có bình luận nào.</p>
        )}
      </div>
    </div>
  );
}
