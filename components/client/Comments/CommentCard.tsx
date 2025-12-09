import { CustomButton } from '@/components/Buttons/CustomButton';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { MessageSquareReplyIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { AvatarUser } from '../Avatar/AvatarUser';
import { useEffect, useRef, useState } from 'react';
import CommentInput from './CommentInput';
import { Comment } from '@/types/comment';
import { LetterICanvas } from '../Canvas/LetterICanvas';
import { useCommentActions } from '@/hooks/useCommentActions';

interface Props<T> {
  comment: Comment;
  level?: number;
  of: T;
}

export function CommentCard<T extends { id: number }>({ comment, level = 1, of }: Props<T>) {
  const [showReplyInput, setShowReplyInput] = useState<boolean>(false);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  const { useDeleteCommentMutation } = useCommentActions(of.id);

  useEffect(() => {
    if (showReplyInput) {
      commentInputRef.current?.focus();
    }
  }, [showReplyInput]);

  const handleDeleteComment = () => {
    useDeleteCommentMutation.mutateAsync(comment.id);
  };

  return (
    <div className="flex flex-col w-full mt-2">
      <div className="flex items-baseline relative justify-between w-full p-2 bg-white/5 shadow-sm rounded-sm my-1 group/comment-card">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2">
            <AvatarUser src={comment.createdBy.avatar} />
            <div>
              <h3 className="font-semibold text-sm">
                {comment.createdBy.fullName || comment.createdBy.email}
              </h3>
              <p className="text-gray-400 text-xs">
                {formatDistanceToNow(comment.createdAt, { locale: vi })} trước
              </p>
            </div>
          </div>
          <p className="text-sm">{comment.content}</p>
        </div>

        <div className="absolute right-0">
          <div className="flex">
            {level < 3 && (
              <div className="invisible group-hover/comment-card:visible">
                <CustomButton
                  className="flex gap-2 items-center text-sm text-gray-300 hover:bg-transparent hover:text-gray-200"
                  onClick={() => setShowReplyInput(!showReplyInput)}
                >
                  <MessageSquareReplyIcon size={16} />
                  Trả lời
                </CustomButton>
              </div>
            )}

            <div className="invisible group-hover/comment-card:visible">
              <CustomButton className="flex gap-2 items-center text-sm text-gray-300 hover:bg-transparent hover:text-gray-200">
                <PencilIcon size={16} />
                Sửa
              </CustomButton>
            </div>

            <div className="invisible group-hover/comment-card:visible">
              <CustomButton
                className="flex gap-2 items-center text-sm text-gray-300 hover:bg-transparent hover:text-gray-200"
                onClick={handleDeleteComment}
                disabled={useDeleteCommentMutation.isPending}
              >
                <TrashIcon size={16} />
                Xóa
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
      {showReplyInput && (
        <CommentInput
          ref={commentInputRef}
          parent={comment}
          entityId={of.id}
          onClose={() => setShowReplyInput(false)}
        />
      )}
      {comment.childs.length > 0 &&
        comment.childs.map(comment => (
          <div className="flex" key={comment.id}>
            <LetterICanvas />
            <CommentCard comment={comment} level={level + 1} of={of} />
          </div>
        ))}
    </div>
  );
}
