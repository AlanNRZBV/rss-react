import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from '../../shared/api/pokemonApi.ts';

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});
