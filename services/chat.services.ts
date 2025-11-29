import http from '.';

const endpointPrefix = '/api/chat';

export const ChatServices = {
  async getMyConversation({
    page,
    size,
    isRead,
  }: {
    page?: number;
    size?: number;
    isRead?: boolean;
  }) {
    const res = await http.get(`${endpointPrefix}/conversations`, {
      params: { page, size, isRead },
    });
    return res.data;
  },

  async getMessageForConversation(conversationId: string, page: number, size: number) {
    const res = await http.get(`${endpointPrefix}/conversation/${conversationId}/messages`, {
      params: { page, size },
    });
    return res.data;
  },

  async markAsRead(conversationId: string) {
    const res = await http.post(`${endpointPrefix}/conversation/${conversationId}/read-all`);
    return res.data;
  },

  async sendMessage(recipientId: string | number, content: string) {
    const res = await http.post(`${endpointPrefix}/send`, null, {
      params: { recipientId, content },
    });

    return res.data;
  },
};
