const COOKIE_KEY = 'userRole';

export function setUserRoleToCookie(role: string) {
  const encoded = encodeURIComponent(role);
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);

  document.cookie = `${COOKIE_KEY}=${encoded};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
}

export function getUserRoleFromCookie(): string | null {
  const cookies = document.cookie.split(';');

  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === COOKIE_KEY) {
      try {
        return decodeURIComponent(value);
      } catch (error) {
        console.error('Lỗi parse role từ cookie:', error);
        return null;
      }
    }
  }

  return null;
}

export function clearUserRoleCookie() {
  if (typeof document === 'undefined') return;
  document.cookie = `${COOKIE_KEY}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Strict`;
}
