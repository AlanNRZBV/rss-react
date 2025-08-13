import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from '@/lib/api/pokemonApi.ts';
import { searchReducer } from '../features/SearchBar/searchSlice.ts';
import { appReducer } from './features/DetailedView/detailedViewSlice.ts';
import { pokemonReducer } from '../features/PokemonsList/pokemonSlice.ts';

const rootReducer = combineReducers({
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  search: searchReducer,
  app: appReducer,
  pokemons: pokemonReducer,
});

export function setupStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware),
  });
}

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
