'use client';

import { auth, authReady } from '@/lib/firebase';
import { connectStomp, disconnectStomp } from '@/lib/stompClient';
import { useEffect } from 'react';

export default function NoticeStompProvider({ children }: { children: React.ReactNode }) {
  // useEffect(() => {
  //   const init = async () => {
  //     await authReady;
  //     const token = await auth?.currentUser?.getIdToken();
  //     if (!token) return;

  //     connectStomp(token);
  //   };

  //   init();
  //   return () => disconnectStomp();
  // }, []);

  return <>{children}</>;
}
