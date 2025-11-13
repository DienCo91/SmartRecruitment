'use client';

import { ROLE_USER } from '@/constants';
import { getJobIdsFavoritesThunk } from '@/lib/features/favorites/favotiteSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import React, { PropsWithChildren, useCallback, useEffect } from 'react';

export function FavoriteProvider({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.auth.currentUser);

  const getIds = useCallback(async () => {
    await dispatch(getJobIdsFavoritesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser?.role === ROLE_USER.CANDIDATE) getIds();
  }, [currentUser?.role, getIds]);

  return <>{children}</>;
}
