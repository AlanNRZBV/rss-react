import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/providers/store.ts';

interface AppState {
  controlled: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
    age: number;
    tAndC: boolean;
    images: File | FileList | null;
    country: string;
    lastModified: string | null;
  };
  uncontrolled: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
    age: number;
    tAndC: boolean;
    images: File | FileList | null;
    country: string;
    lastModified: string | null;
  };
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
  reducers: {},
});
export const appReducer = appSlice.reducer;
export const selectControlledState = (state: RootState) => state.app.controlled;
export const selectUncontrolledState = (state: RootState) =>
  state.app.uncontrolled;
