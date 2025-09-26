'use client';

import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { LoaderIcon } from 'lucide-react';

export default function LoadingOverlay() {
  const isLoading = useAppSelector((state: RootState) => state.common.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <LoaderIcon className="animate-spin size-[60px] text-white" />
    </div>
  );
}
