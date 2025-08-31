import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/providers/store.ts';

interface AppState {
  currentCountry: string | null;
}

const initialState: AppState = { currentCountry: null };

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeCountry: (state, action: PayloadAction<string>) => {
      state.currentCountry = action.payload;
    },
  },
});
export const { changeCountry } = appSlice.actions;
export const appReducer = appSlice.reducer;
export const selectCurrentCountry = (state: RootState) =>
  state.app.currentCountry;
