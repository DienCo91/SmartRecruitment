import { ROLE_USER } from '@/constants';
import { auth } from '@/lib/firebase';

export const isEmployer = (role: string) => role === ROLE_USER.EMPLOYER;

export function isLoginWithPassword(): boolean {
  const user = auth.currentUser;
  if (!user) return false;

  return user.providerData.some(p => p.providerId === 'password');
}

export function isLoginWithOAuth2(): boolean {
  const user = auth.currentUser;
  if (!user) return false;

  return user.providerData.some(p =>
    ['google.com', 'facebook.com', 'github.com', 'apple.com'].includes(p.providerId)
  );
}
