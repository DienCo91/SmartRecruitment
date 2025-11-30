'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { setConservationCurrent } from '@/lib/features/chat/chatSlice';

const ChatLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(setConservationCurrent(null));
    };
  }, []);

  return <>{children}</>;
};

export default ChatLayoutWrapper;
