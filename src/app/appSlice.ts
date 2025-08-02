import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './providers/store.ts';

interface AppState {
  detailedView: boolean;
}

const initialState: AppState = {
  detailedView: false,
};

const AppSlice = createSlice({
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

export const { toggleView } = AppSlice.actions;
export const appReducer = AppSlice.reducer;
export const selectDetailedView = (state: RootState) => state.app.detailedView;
