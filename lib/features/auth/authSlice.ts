import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, CurrentUser } from './type';
import { clearUserRoleCookie, setUserRoleToCookie } from '@/utils/roleCookie';

const initialState: AuthState = { currentUser: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<CurrentUser | null>) => {
      if (action.payload !== null) {
        setUserRoleToCookie(action.payload.role);
      } else {
        clearUserRoleCookie();
      }
      state.currentUser = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<CurrentUser>>) => {
      if (state.currentUser !== null) {
        console.log('1', 1);
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
  },
});

export const { setCurrentUser, updateUser } = authSlice.actions;
export default authSlice.reducer;
