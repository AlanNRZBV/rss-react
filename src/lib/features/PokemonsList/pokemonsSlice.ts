import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store.ts';

interface PokemonState {
  pokemons: { name: string }[];
}

const initialState: PokemonState = {
  pokemons: [],
};

const pokemonsSlice = createSlice({
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
    clearPokemons: (state) => {
      state.pokemons = [];
    },
  },
});

export const { addPokemon, removePokemon, clearPokemons } =
  pokemonsSlice.actions;
export const pokemonsReducer = pokemonsSlice.reducer;
export const selectPokemons = (state: RootState) => state.pokemons.pokemons;
