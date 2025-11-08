import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoriteState } from './type';
import { CandidateService } from '@/services/candidate.services';

const initialState: FavoriteState = { jobIds: [] };

export const getJobIdsFavoritesThunk = createAsyncThunk(
  'favorite_job/getJobIdsFavorites',
  async () => {
    const ids = (await CandidateService.getJobIdsFavorite()).data;
    return ids;
  }
);

export const addFavoriteJobThunk = createAsyncThunk(
  'favorite_job/addFavoriteJobThunk',
  async (id: number) => {
    await CandidateService.followJob(String(id));
  }
);

const favotiteSlice = createSlice({
  name: 'favorite_job',
  initialState,
  reducers: {
    addFavoriteJob: (state, action: PayloadAction<number>) => {
      state.jobIds.push(action.payload);
    },
    removeFavoriteJob: (state, action: PayloadAction<number>) => {
      state.jobIds = state.jobIds.filter(id => id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(
      getJobIdsFavoritesThunk.fulfilled,
      (state: FavoriteState, action: PayloadAction<number[]>) => {
        const { payload } = action;
        state.jobIds = payload;
      }
    );
  },
});

export const { removeFavoriteJob, addFavoriteJob } = favotiteSlice.actions;
export default favotiteSlice.reducer;
