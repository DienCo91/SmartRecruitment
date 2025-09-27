import { ROLE_USER } from '@/constants';

export interface AuthState {
  currentUser: CurrentUser | null;
}

export interface CurrentUser {
  firebaseUid: string;
  fullName: string;
  userName: string;
  email: string;
  role: ROLE_USER;
  firebaseCustomToken: string | null;
}
