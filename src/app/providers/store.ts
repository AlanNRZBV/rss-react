import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from '../../shared/api/pokemonApi.ts';
import { useDispatch, useSelector } from 'react-redux';
import { searchReducer } from '../../features/SearchBar/searchSlice.ts';
import { appReducer } from '../appSlice.ts';

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    search: searchReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
