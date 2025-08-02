import { createSlice } from '@reduxjs/toolkit';
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
    toggleView: (state) => {
      state.detailedView = !state.detailedView;
    },
  },
});

export const { toggleView } = AppSlice.actions;
export const appReducer = AppSlice.reducer;
export const selectDetailedView = (state: RootState) => state.app.detailedView;
