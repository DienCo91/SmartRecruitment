'use client';

import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Router } from '@/constants/router';
import { setCurrentUser } from '@/lib/features/auth/authSlice';
import { setLoading } from '@/lib/features/common/commonSlice';

export function useLogout() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(setLoading(true));
    await signOut(auth);
    dispatch(setCurrentUser(null));
    dispatch(setLoading(false));

    router.replace(Router.HOME);
  };

  return handleLogout;
}
