import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, CurrentUser } from './type';

const initialState: AuthState = { currentUser: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<CurrentUser>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = authSlice.actions;
export default authSlice.reducer;
