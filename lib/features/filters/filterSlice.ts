import { EducationLevel, ExperienceLevel, JobType } from '@/constants/job';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  keyword?: string;
  location?: string;
  categoryId?: string;
  minSalary?: number;
  maxSalary?: number;
  experienceLevel?: ExperienceLevel;
  educationLevels?: EducationLevel[];
  jobTypes?: JobType[];
  tagId?: number;
}

const initialState: FilterState = {};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<FilterState>) => {
      const { payload } = action;
      return { ...state, ...payload };
    },
  },
});

export const { setFilters } = filterSlice.actions;
export default filterSlice.reducer;
