import { CustomButton } from '@/components/Buttons/CustomButton';
import { useCommentActions } from '@/hooks/useCommentActions';
import { useAppSelector } from '@/lib/hooks';
import { Comment } from '@/types/comment';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { MessageSquareReplyIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { AvatarUser } from '../Avatar/AvatarUser';
import { LetterICanvas } from '../Canvas/LetterICanvas';
import CommentInput from './CommentInput';

interface Props<T> {
  comment: Comment;
  level?: number;
  of: T;
}

export function CommentCard<T extends { id: number }>({ comment, level = 1, of }: Props<T>) {
  const [mode, setMode] = useState<'none' | 'reply' | 'edit'>('none');

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { useDeleteCommentMutation } = useCommentActions(of.id);
  const currentUser = useAppSelector(state => state.auth.currentUser);

  const isMyComment = currentUser ? comment.createdBy.id === currentUser.id : false;

  useEffect(() => {
    if (mode !== 'none') inputRef.current?.focus();
  }, [mode]);

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
                  onClick={() => setMode(mode === 'reply' ? 'none' : 'reply')}
                >
                  <MessageSquareReplyIcon size={16} />
                  Trả lời
                </CustomButton>
              </div>
            )}

            {isMyComment && (
              <>
                <div className="invisible group-hover/comment-card:visible">
                  <CustomButton
                    className="flex gap-2 items-center text-sm text-gray-300 hover:bg-transparent hover:text-gray-200"
                    onClick={() => setMode(mode === 'edit' ? 'none' : 'edit')}
                  >
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
              </>
            )}
          </div>
        </div>
      </div>

      {mode === 'edit' && (
        <CommentInput
          ref={inputRef}
          entityId={of.id}
          comment={comment}
          onClose={() => setMode('none')}
        />
      )}

      {mode === 'reply' && (
        <CommentInput
          ref={inputRef}
          parent={comment}
          entityId={of.id}
          onClose={() => setMode('none')}
        />
      )}

      {comment.childs.length > 0 &&
        comment.childs.map(child => (
          <div className="flex" key={child.id}>
            <LetterICanvas />
            <CommentCard comment={child} level={level + 1} of={of} />
          </div>
        ))}
    </div>
  );
}
