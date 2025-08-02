import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/providers/store.ts';

interface SearchState {
  currentSearchTerm: string | undefined;
}

const initialState: SearchState = {
  currentSearchTerm: undefined,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string | undefined>) => {
      state.currentSearchTerm = action.payload;
    },
  },
});

export const { setSearchTerm } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;

export const selectCurrentSearchTerm = (state: RootState) =>
  state.search.currentSearchTerm;
