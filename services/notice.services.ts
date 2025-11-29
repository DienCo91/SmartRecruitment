import http from '.';

const endpointPrefix = '/api/notifications';

export const NotificationServices = {
  async getMyNotifications({
    page,
    size,
    isRead,
  }: {
    page?: number;
    size?: number;
    isRead?: boolean;
  }) {
    const res = await http.get(`${endpointPrefix}`, {
      params: { page, size, isRead },
    });
    return res.data;
  },

  async getUnreadCount() {
    const res = await http.get(`${endpointPrefix}/unread-count`);
    return res.data;
  },

  async markAsRead(notificationId: number) {
    const res = await http.patch(`${endpointPrefix}/${notificationId}/read`);
    return res.data;
  },

  async markAllAsRead() {
    const res = await http.post(`${endpointPrefix}/read-all`);
    return res.data;
  },
};
