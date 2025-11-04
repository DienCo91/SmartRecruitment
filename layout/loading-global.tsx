'use client';

import LoadingCustom from '@/components/ui/loading-custom';
import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { useEffect, useState } from 'react';

export default function LoadingOverlay() {
  const isLoading = useAppSelector((state: RootState) => state.common.isLoading);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (!isLoading) return null;

  return <LoadingCustom />;
}
