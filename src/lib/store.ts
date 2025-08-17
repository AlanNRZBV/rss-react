import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from '@/lib/api/pokemonApi.ts';
import { searchReducer } from '@/lib/features/SearchBar/searchBarSlice.ts';
import { pokemonsReducer } from '@/lib/features/PokemonsList/pokemonsSlice.ts';
import { detailedViewReducer } from '@/lib/features/DetailedView/detailedViewSlice.ts';

const rootReducer = combineReducers({
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  search: searchReducer,
  pokemons: pokemonsReducer,
  detailedView: detailedViewReducer,
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
