'use client';

import { getJobIdsFavoritesThunk } from '@/lib/features/favorites/favotiteSlice';
import { useAppDispatch } from '@/lib/hooks';
import React, { PropsWithChildren, useCallback, useEffect } from 'react';

export function FavoriteProvider({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();

  const getIds = useCallback(async () => {
    await dispatch(getJobIdsFavoritesThunk());
  }, [dispatch]);

  useEffect(() => {
    getIds();
  }, [getIds]);

  return <>{children}</>;
}
