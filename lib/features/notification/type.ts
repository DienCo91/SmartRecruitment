import { NotificationMessage } from '@/types';

export interface NotificationState {
  notifications: NotificationMessage[];
  totalUnread: number;
}
