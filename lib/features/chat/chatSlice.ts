import { Conversation } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatState } from './type';

const initialState: ChatState = { conversationCurrent: null };

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setConservationCurrent: (state, action: PayloadAction<Conversation | null>) => {
      state.conversationCurrent = action.payload;
    },
  },
});

export const { setConservationCurrent } = chatSlice.actions;
export default chatSlice.reducer;
