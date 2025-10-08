import { CustomButton } from '@/components/Buttons/CustomButton';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

export function Comments() {
  return (
    <div className="w-2/3 space-y-2">
      <h3 className="font-semibold text-lg">Bình luận về bài viết</h3>
      <Textarea
        placeholder="Chia sẻ suy nghĩ của bạn về bài viết."
        className="resize-none focus-visible:ring-0 w-full"
      />
      <CustomButton className="bg-blue-600 text-white hover:bg-blue-700 hover:text-gray-200">
        Tạo bình luận
      </CustomButton>
      <Separator className="bg-gray-500 my-2" />
    </div>
  );
}
