import { CustomButton } from '@/components/Buttons/CustomButton';
import { Textarea } from '@/components/ui/textarea';
import { SendHorizontalIcon } from 'lucide-react';
import { AvatarUser } from '../Avatar/AvatarUser';
import { LetterICanvas } from '../Canvas/LetterICanvas';
import { forwardRef, TextareaHTMLAttributes } from 'react';

const CommentInput = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div className="flex">
        <LetterICanvas />
        <div className="flex items-baseline gap-2 my-2 w-full">
          <div>
            <AvatarUser src="" />
          </div>
          <Textarea
            ref={ref}
            placeholder="Trả lời bình luận của Hoàng Minh Khương"
            className="flex-1 overflow-y-auto resize-none focus-visible:ring-0 w-full max-h-20 bg-white/10"
          />
          <div>
            <CustomButton className="bg-white/30 text-white hover:bg-white/20 hover:text-gray-200">
              <SendHorizontalIcon size={16} />
              Gửi
            </CustomButton>
          </div>
        </div>
      </div>
    );
  }
);

CommentInput.displayName = 'CommentInput';
export default CommentInput;
