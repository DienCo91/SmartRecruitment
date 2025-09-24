import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { BaseProps } from '@/types';

interface Props extends BaseProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  contentClassName?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function GlassDialog({
  open,
  onClose,
  title,
  description,
  footer,
  children,
  className,
  contentClassName,
  size = 'lg',
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        size={size}
        className={cn(
          'flex flex-col bg-white/10 border p-1 md:p-0 backdrop-blur-2xl transition-all duration-300 shadow-xl',
          className
        )}
        overlayClassName="bg-white/5 backdrop-blur-sm"
      >
        {(title || description) && (
          <DialogHeader className="p-0 md:px-6 pr-8 pl-2 py-3 border-b border-white/10">
            {title && <DialogTitle className="text-neutral-300 line-clamp-1">{title}</DialogTitle>}
            {description && (
              <DialogDescription className="text-neutral-300">{description}</DialogDescription>
            )}
          </DialogHeader>
        )}
        <div
          className={cn(
            'relative flex-1 overflow-y-auto px-6 py-2 text-neutral-300',
            contentClassName
          )}
        >
          {children}
        </div>

        {footer && (
          <DialogFooter className="p-0 md:p-6 border-t border-white/10 gap-2 sm:gap-0">
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
