import { Conversation, Message } from '@/types';

export interface ChatState {
  conversationCurrent: Conversation | null;
  messages: Message[];
  lastMessageStomp: Message | null;
}
