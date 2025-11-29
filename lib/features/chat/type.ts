import { Conversation } from '@/types';

export interface ChatState {
  conversationCurrent: Conversation | null;
}
