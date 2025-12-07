import { CustomButton } from '@/components/Buttons/CustomButton';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { MessageSquareReplyIcon } from 'lucide-react';
import { AvatarUser } from '../Avatar/AvatarUser';
import { useEffect, useRef, useState } from 'react';
import CommentInput from './CommentInput';
import { Comment } from '@/types/comment';
import { LetterICanvas } from '../Canvas/LetterICanvas';

interface Props<T> {
  comment: Comment;
  level?: number;
  of: T;
}

export function CommentCard<T extends { id: number }>({ comment, level = 1, of }: Props<T>) {
  const [showReplyInput, setShowReplyInput] = useState<boolean>(false);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (showReplyInput) {
      commentInputRef.current?.focus();
    }
  }, [showReplyInput]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-baseline justify-between w-full p-2 bg-white/5 shadow-sm rounded-sm my-1 group/comment-card">
        <div className="space-y-2 flex-1 ">
          <div className="flex items-center gap-2">
            <AvatarUser src={comment.createdBy.avatar} />
            <div>
              <h3 className="font-semibold text-sm">Hoàng Minh Khương</h3>
              <p className="text-gray-400 text-xs">
                {formatDistanceToNow(comment.createdAt, { locale: vi })} trước
              </p>
            </div>
          </div>
          <p className="text-sm">{comment.content}</p>
        </div>
        {level < 3 && (
          <div className="hidden group-hover/comment-card:block">
            <CustomButton
              className="flex gap-2 items-center text-sm text-white hover:bg-transparent hover:text-gray-200"
              onClick={() => setShowReplyInput(!showReplyInput)}
            >
              <MessageSquareReplyIcon size={16} />
              Phản hồi
            </CustomButton>
          </div>
        )}
      </div>
      {showReplyInput && (
        <CommentInput ref={commentInputRef} parentId={comment.id} entityId={of.id} />
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
