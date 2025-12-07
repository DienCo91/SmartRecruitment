import { CustomButton } from '@/components/Buttons/CustomButton';
import { Textarea } from '@/components/ui/textarea';
import { SendHorizontalIcon } from 'lucide-react';
import { forwardRef, TextareaHTMLAttributes, useState } from 'react';
import { LetterICanvas } from '../Canvas/LetterICanvas';
import { toast } from 'sonner';
import { BlogService } from '@/services/blog.service';

const CommentInput = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement> & { parentId: number; entityId: number }
>(({ className, parentId, entityId, ...props }, ref) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateComment = async () => {
    try {
      setLoading(true);
      await BlogService.createComment(entityId, { parentId, content });
      toast.success('Phản hồi bình luận thành công');
    } catch (e) {
      console.error(e);
      toast.error('Phản hồi bình luận thất bại');
    } finally {
      setLoading(false);
    }
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
          placeholder="Trả lời bình luận của Hoàng Minh Khương"
          className="flex-1 overflow-y-auto resize-none focus-visible:ring-0 w-full max-h-20 bg-white/10"
          {...props}
        />
        <div>
          <CustomButton
            className="bg-white/30 text-white hover:bg-white/20 hover:text-gray-200"
            onClick={handleCreateComment}
            disabled={loading}
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
