import { cn } from '@/lib/utils';
import { BaseProps } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props extends BaseProps {
  curPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

export function CustomPagination({ curPage, totalPage, onPageChange, className }: Props) {
  const handlePrev = () => {
    if (curPage > 1) onPageChange(curPage - 1);
  };

  const handleNext = () => {
    if (curPage < totalPage) onPageChange(curPage + 1);
  };

  return (
    <div className={cn('flex items-center justify-center gap-3 text-sm select-none', className)}>
      <button
        onClick={handlePrev}
        disabled={curPage === 1}
        className="p-1 disabled:opacity-40 disabled:cursor-not-allowed hover:text-white"
      >
        <ChevronLeft size={18} />
      </button>

      <span>
        {curPage}/{totalPage}
      </span>

      <button
        onClick={handleNext}
        disabled={curPage === totalPage}
        className="p-1 disabled:opacity-40 disabled:cursor-not-allowed hover:text-white disabled:hover:opacity-40"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
