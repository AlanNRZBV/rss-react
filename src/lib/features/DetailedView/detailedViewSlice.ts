import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store.ts';

interface AppState {
  detailedView: boolean;
}

const initialState: AppState = {
  detailedView: false,
};

const DetailedViewSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleView: (
      state,
      action: PayloadAction<'refetch' | 'close' | 'open'>
    ) => {
      const { payload } = action;
      if (payload === 'refetch') {
        return;
      }

      if (payload === 'close') {
        state.detailedView = false;
        return;
      }
      state.detailedView = true;
    },
  },
});

export const { toggleView } = DetailedViewSlice.actions;
export const detailedViewReducer = DetailedViewSlice.reducer;
export const selectDetailedView = (state: RootState) =>
  state.detailedView.detailedView;
