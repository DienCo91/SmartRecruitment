'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

interface CustomPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function CustomPagination({
  totalPages,
  currentPage,
  onPageChange,
  className,
}: CustomPaginationProps) {
  const renderPages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent className={cn('cursor-pointer ', className)}>
        {/* Prev */}
        <PaginationItem className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}>
          <PaginationPrevious
            onClick={e => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
          />
        </PaginationItem>

        {/* Pages */}
        {renderPages().map((p, idx) =>
          p === '...' ? (
            <PaginationItem key={idx}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={idx}>
              <PaginationLink
                isActive={p === currentPage}
                className={
                  p === currentPage
                    ? 'bg-white text-black font-semibold' // Active
                    : ' text-white hover:bg-white/30' // Inactive
                }
                onClick={e => {
                  e.preventDefault();
                  onPageChange(p as number);
                }}
              >
                {String(p).padStart(2, '0')}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {/* Next */}
        <PaginationItem
          className={`${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
        >
          <PaginationNext
            onClick={e => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
