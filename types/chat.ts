export interface ChatMessage {
  content: string;
  recipientId: number;
}

export interface NotificationMessage {
  id: number;
  content: string;
  createdAt: string;
  read: boolean;
  relatedId: number;
  senderAvatarUrl: string;
  senderId: number;
  senderName: string;
  type: string;
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

export interface Message {
  id: string;
  direction: 'FROM_CANDIDATE' | 'FROM_EMPLOYER';
  isRead: boolean;
  content: string;
  timestampt: string;
  conversationId: number;
}
