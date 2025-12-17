import { ConfirmDeleteDialog } from '@/components/client/Dialogs/ConfirmDeleteDialog';
import { Button } from '@/components/ui/button';
import { useBlogManager } from '@/contexts';
import { useBlogManagerActions } from '@/hooks/useBlogManagerActions';
import { TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { AdminBlogColumns } from './Columns';

interface Props {
  blog: AdminBlogColumns;
}

export function DeleteBlogAction({ blog }: Props) {
  const [blogDelete, setBlogDelete] = useState<AdminBlogColumns>();
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const { filter } = useBlogManager();
  const { useDeleteBlogManageMutation } = useBlogManagerActions(filter);

  return (
    <div>
      <Button
        variant="ghost"
        onClick={() => {
          setShowConfirmDialog(true);
          setBlogDelete(blog);
        }}
      >
        <TrashIcon size={18} />
      </Button>

      {showConfirmDialog && (
        <ConfirmDeleteDialog
          title="Bạn có chắc muốn xóa"
          description="Hành động này sẽ xóa blog và không thể khôi phục"
          onClose={() => setShowConfirmDialog(false)}
          onDelete={() => useDeleteBlogManageMutation.mutateAsync(blogDelete!.id)}
        />
      )}
    </div>
  );
}
