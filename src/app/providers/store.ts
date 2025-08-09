import { combineReducers, configureStore, Tuple } from '@reduxjs/toolkit';
import { pokemonApi } from '../../shared/api/pokemonApi.ts';
import { useDispatch, useSelector } from 'react-redux';
import { searchReducer } from '../../features/SearchBar/searchSlice.ts';
import { appReducer } from '../appSlice.ts';
import { pokemonReducer } from '../../features/PokemonsList/pokemonSlice.ts';

const rootReducer = combineReducers({
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  search: searchReducer,
  app: appReducer,
  pokemons: pokemonReducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      new Tuple(...getDefaultMiddleware().concat(pokemonApi.middleware)),
    preloadedState: preloadedState,
  });
}

export const store = setupStore();
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
