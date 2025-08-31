import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/providers/store.ts';
import { gridColumns } from '@/lib/static/gridColumns.ts';

interface AppState {
  currentCountry: string | null;
  columns: string[];
}

const initialState: AppState = {
  currentCountry: null,
  columns: gridColumns.slice(0, 4),
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeCountry: (state, action: PayloadAction<string>) => {
      state.currentCountry = action.payload;
    },
    addColumn: (state, action: PayloadAction<string>) => {
      if (!state.columns.includes(action.payload)) {
        state.columns.push(action.payload);
      }
    },
    removeColumn: (state, action: PayloadAction<string>) => {
      state.columns = state.columns.filter((col) => col !== action.payload);
    },
  },
});
export const { changeCountry, addColumn, removeColumn } = appSlice.actions;
export const appReducer = appSlice.reducer;
export const selectCurrentCountry = (state: RootState) =>
  state.app.currentCountry;
export const selectColumns = (state: RootState) => state.app.columns;
