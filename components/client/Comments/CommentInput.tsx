import { CustomButton } from '@/components/Buttons/CustomButton';
import { Textarea } from '@/components/ui/textarea';
import { useCommentActions } from '@/hooks/useCommentActions';
import { Comment } from '@/types/comment';
import { SendHorizontalIcon } from 'lucide-react';
import { forwardRef, TextareaHTMLAttributes, useState } from 'react';
import { LetterICanvas } from '../Canvas/LetterICanvas';

const CommentInput = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    parent: Comment;
    entityId: number;
    onClose: () => void;
  }
>(({ className, parent, entityId, onClose, ...props }, ref) => {
  const [content, setContent] = useState<string>('');

  const { useCreateCommentMutation } = useCommentActions(entityId);

  const handleCreateComment = async () => {
    useCreateCommentMutation.mutateAsync({ parentId: parent.id, content });
    setContent('');
    onClose();
  };

  return (
    <div className="flex">
      <LetterICanvas />
      <div className="flex items-baseline gap-2 my-2 w-full">
        <Textarea
          ref={ref}
          value={content}
          onChange={e => setContent(e.target.value)}
          onKeyDown={e => {
            if (e.ctrlKey && e.key === 'Enter') handleCreateComment();
          }}
          placeholder={`Trả lời bình luận của ${parent.createdBy.fullName || parent.createdBy.email}`}
          className="flex-1 overflow-y-auto resize-none focus-visible:ring-0 w-full max-h-20 bg-white/10 placeholder:text-gray-400"
          {...props}
        />
        <div>
          <CustomButton
            className="bg-white/30 text-white hover:bg-white/20 hover:text-gray-200"
            onClick={handleCreateComment}
            disabled={useCreateCommentMutation.isPending}
          >
            <SendHorizontalIcon size={16} />
            Gửi
          </CustomButton>
        </div>
      </div>
    </div>
  );
});

CommentInput.displayName = 'CommentInput';
export default CommentInput;
