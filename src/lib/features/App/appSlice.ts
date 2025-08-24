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
    termsAndConditions: undefined,
    country: '',
    images: undefined,
    lastModified: '',
  },
  uncontrolled: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    age: 0,
    termsAndConditions: undefined,
    country: '',
    images: undefined,
    lastModified: '',
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
    updateControlledState: (state, action: PayloadAction<FormDataDisplay>) => {
      state.controlled = { ...state.controlled, ...action.payload };
    },
  },
});

export const { updateUncontrolledState, updateControlledState } =
  appSlice.actions;
export const appReducer = appSlice.reducer;
export const selectControlledState = (state: RootState) => state.app.controlled;
export const selectUncontrolledState = (state: RootState) =>
  state.app.uncontrolled;
