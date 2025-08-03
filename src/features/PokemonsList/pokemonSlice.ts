import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/providers/store.ts';

interface PokemonState {
  pokemons: { name: string }[];
}

const initialState: PokemonState = {
  pokemons: [],
};

const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    addPokemon: (state, action: PayloadAction<{ name: string }>) => {
      const { name } = action.payload;
      const exists = state.pokemons.some((p) => p.name === name);
      if (!exists) {
        state.pokemons.push({ name });
      }
    },
    removePokemon: (state, action: PayloadAction<string>) => {
      const name = action.payload;
      const exists = state.pokemons.some((p) => p.name === name);
      if (exists) {
        state.pokemons = state.pokemons.filter((p) => p.name !== name);
      }
    },
  },
});

export const { addPokemon, removePokemon } = pokemonSlice.actions;
export const pokemonReducer = pokemonSlice.reducer;
export const selectPokemons = (state: RootState) => state.pokemons.pokemons;
