'use client';
import { LIST_TAB_HEADER_MAIN } from '@/constants/tab';
import { useTabMainActive } from '@/contexts';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useChangeUrl = () => {
  const { setTab } = useTabMainActive();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const matchedTab = LIST_TAB_HEADER_MAIN.find(item => pathname.startsWith(item.link));
    if (matchedTab) {
      setTab(matchedTab);
      router.push(matchedTab.link);
    }
  }, [pathname]);
};
