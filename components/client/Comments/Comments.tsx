import { CustomButton } from '@/components/Buttons/CustomButton';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import * as _ from 'lodash';
import { LetterLCanvas } from '../Canvas/LetterLCanvas';
import { LetterTCanvas } from '../Canvas/LetterTCanvas';
import { CommentCard } from './CommentCard';
import { Comment } from '@/types/comment';
import { comments } from '@/constants/mockedData';

const treeComments = (comments: Comment[], parentId: number | null): Comment[] => {
  return comments
    .filter(comment => comment.parent_comment_id === parentId)
    .map(comment => ({
      ...comment,
      childs: treeComments(comments, comment.id),
    }));
};

const CommentTree = (comments: Comment[]) => {
  return comments.map(comment => {
    return <CommentCard key={comment.id} comment={comment} />;
  });
};

export function Comments() {
  console.log(treeComments(comments, null));
  return (
    <div className="w-2/3 space-y-2">
      <h3 className="font-semibold text-lg">Bình luận về bài viết</h3>
      <Textarea
        placeholder="Chia sẻ suy nghĩ của bạn về bài viết."
        className="resize-none focus-visible:ring-0 w-full bg-white/10"
      />
      <CustomButton className="my-4 bg-white/30 text-white hover:bg-white/20 hover:text-gray-200">
        Tạo bình luận
      </CustomButton>
      <Separator className="bg-gray-500 my-2" />
      <h3 className="font-semibold text-lg">Bình luận</h3>
      <div className="w-full">{CommentTree(treeComments(comments, null))}</div>
    </div>
  );
}
