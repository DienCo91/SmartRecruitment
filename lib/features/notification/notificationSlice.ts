import { NotificationMessage } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationState } from './type';

const initialState: NotificationState = { notifications: [], totalUnread: 0 };

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<NotificationMessage[]>) => {
      state.notifications = action.payload;
    },
    setTotalUnread: (state, action: PayloadAction<number>) => {
      state.totalUnread = action.payload;
    },
    updateNotificationsRead: (state, action: PayloadAction<number>) => {
      state.notifications = state.notifications.map(item =>
        item.id === action.payload ? { ...item, read: true } : item
      );
    },
  },
});

export const { setNotifications, setTotalUnread, updateNotificationsRead } =
  notificationSlice.actions;
export default notificationSlice.reducer;
