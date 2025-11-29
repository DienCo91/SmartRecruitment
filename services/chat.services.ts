import http from '.';

const endpointPrefix = '/api/chat';

export const ChatServices = {
  async getMyConversation({ page, size }: { page?: number; size?: number }) {
    const res = await http.get(`${endpointPrefix}/conversations`, {
      params: { page, size },
    });
    return res.data;
  },

  async getMessageForConversation(conversationId: string) {
    const res = await http.get(`${endpointPrefix}/conversation/${conversationId}/messages`);
    return res.data;
  },

  async markAsRead(conversationId: string) {
    const res = await http.get(`${endpointPrefix}conversation/${conversationId}/read-all`);
    return res.data;
  },
};
