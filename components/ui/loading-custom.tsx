import { cn } from '@/lib/utils';
import { LoaderIcon } from 'lucide-react';
import React from 'react';

interface Props {
  className?: string;
}

const LoadingCustom: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn('fixed inset-0 z-99 flex items-center justify-center bg-black/50', className)}
    >
      <LoaderIcon className="animate-spin size-[60px] text-white" />
    </div>
  );
};

export default LoadingCustom;
