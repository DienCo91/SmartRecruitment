import { ConfirmDeleteDialog } from '@/components/client/Dialogs/ConfirmDeleteDialog';
import { Button } from '@/components/ui/button';
import { useBlogManager } from '@/contexts';
import { useBlogManagerActions } from '@/hooks/useBlogManagerActions';
import { UploadIcon } from 'lucide-react';
import { useState } from 'react';

export function PublishBlogAction({ id }: { id: number }) {
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const { filter } = useBlogManager();
  const { usePublishBlogManageMutation } = useBlogManagerActions(filter);

  return (
    <div>
      <Button variant="ghost" onClick={() => setShowConfirmDialog(true)}>
        <UploadIcon size={18} />
      </Button>

      {showConfirmDialog && (
        <ConfirmDeleteDialog
          title="Bạn có chắc muốn đăng tải bài viết"
          description="Hành động này sẽ đăng tải bài viết này"
          textConfirm="Đăng tải"
          onClose={() => setShowConfirmDialog(false)}
          onDelete={() => usePublishBlogManageMutation.mutateAsync(id)}
        />
      )}
    </div>
  );
}
