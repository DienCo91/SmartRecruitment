import { Button } from '@/components/ui/button';
import { ReactNode, useState, useCallback } from 'react';
import { GlassDialog } from './GlassDialog';
import { toast } from 'sonner';

interface Props {
  title: ReactNode;
  description?: ReactNode;
  onClose: () => void;
  onDelete: () => void;
  textConfirm?: string;
}

export function ConfirmDeleteDialog({
  title,
  description,
  onClose,
  onDelete,
  textConfirm = 'Xóa',
}: Props) {
  const [processing, setProcessing] = useState(false);

  const handleDelete = useCallback(async () => {
    setProcessing(true);
    try {
      await onDelete();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Xóa thất bại');
    } finally {
      setProcessing(false);
    }
  }, [onDelete, onClose]);

  return (
    <GlassDialog
      open
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>

          <Button disabled={processing} onClick={handleDelete}>
            {textConfirm}
          </Button>
        </div>
      }
    >
      {description}
    </GlassDialog>
  );
}
