import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommonState } from './type';

const initialState: CommonState = { isLoading: false };

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = commonSlice.actions;
export default commonSlice.reducer;
