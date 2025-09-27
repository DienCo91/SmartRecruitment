import { ROLE_USER } from '@/constants';

export const isEmployer = (role: string) => role === ROLE_USER.EMPLOYER;
