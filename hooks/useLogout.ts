'use client';

import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Router } from '@/constants/router';
import { setCurrentUser } from '@/lib/features/auth/authSlice';

export function useLogout() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    console.log('handleLogout');
    await signOut(auth);
    dispatch(setCurrentUser(null));
    router.replace(Router.AUTH.LOGIN);
  };

  return handleLogout;
}
