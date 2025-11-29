export interface ChatMessage {
  content: string;
  recipientId: number;
}

export interface NotificationMessage {
  type: string;
  content: string;
}

export interface Conversation {
  conversationId: number;

  partnerId: number;
  partnerName: string;
  partnerAvatarUrl: string;

  lastMessage: string;
  lastMessageAt: string;

  unreadCount: number;
}
