import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';

export function useEmailVerification() {
  const [verified, setVerified] = useState(auth.currentUser?.emailVerified ?? false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      interval = setInterval(async () => {
        await auth.currentUser?.reload();
        if (auth.currentUser?.emailVerified) {
          setVerified(true);
          clearInterval(interval);
        }
      }, 3000);
    }

    return () => clearInterval(interval);
  }, []);

  return verified;
}
