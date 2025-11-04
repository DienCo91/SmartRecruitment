'use client';

import { LoadingDoubleCircle } from '@/components/Loadings/LoadingDoubleCircle';
import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';

export default function LoadingOverlay() {
  const isLoading = useAppSelector((state: RootState) => state.common.isLoading);

  if (!isLoading) return null;

  return <LoadingDoubleCircle />;
}
