import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/providers/store.ts';

interface AppState {
  controlled: FormDataDisplay;
  uncontrolled: FormDataDisplay;
}

const initialState: AppState = {
  controlled: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    age: 0,
    tAndC: false,
    country: '',
    images: null,
    lastModified: null,
  },
  uncontrolled: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    age: 0,
    tAndC: false,
    country: '',
    images: null,
    lastModified: null,
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateUncontrolledState: (
      state,
      action: PayloadAction<FormDataDisplay>
    ) => {
      state.uncontrolled = { ...state.uncontrolled, ...action.payload };
    },
  },
});

export const { updateUncontrolledState } = appSlice.actions;
export const appReducer = appSlice.reducer;
export const selectControlledState = (state: RootState) => state.app.controlled;
export const selectUncontrolledState = (state: RootState) =>
  state.app.uncontrolled;
