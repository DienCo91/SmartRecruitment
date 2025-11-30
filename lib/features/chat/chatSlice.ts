import { Conversation, Message } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatState } from './type';

const initialState: ChatState = { conversationCurrent: null, messages: [], lastMessageStomp: null };

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setConservationCurrent: (state, action: PayloadAction<Conversation | null>) => {
      state.conversationCurrent = action.payload;
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    updateLastMessage: (state, action: PayloadAction<Message>) => {
      state.messages = [action.payload, ...state.messages];
    },
    setLastMessageStomp: (state, action: PayloadAction<Message>) => {
      state.lastMessageStomp = action.payload;
    },
  },
});

export const { setConservationCurrent, setMessages, updateLastMessage, setLastMessageStomp } =
  chatSlice.actions;
export default chatSlice.reducer;
