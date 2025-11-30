import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';
import { GlassDialog } from './GlassDialog';

interface Props {
  title: ReactNode;
  description?: ReactNode;
  onClose: () => void;
  onDelete: () => void;
}

export function ConfirmDeleteDialog({ title, description, onClose, onDelete }: Props) {
  return (
    <GlassDialog
      open
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => onClose()}>
            Đóng
          </Button>
          <Button
            onClick={() => {
              onClose();
              onDelete();
            }}
          >
            Xóa
          </Button>
        </div>
      }
    >
      {description}
    </GlassDialog>
  );
}
