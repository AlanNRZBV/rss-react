import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../../app/providers/store.ts';

interface PokemonState {
  pokemons: { name: string }[];
}

const initialState: PokemonState = {
  pokemons: [],
};

export const exportToCSV = createAsyncThunk<
  unknown,
  undefined,
  { rejectValue: string; state: RootState }
>('pokemons/exportToCSV', async (_, { getState, rejectWithValue }) => {
  const state = getState();
  const pokemons = state.pokemons.pokemons;

  if (pokemons.length === 0) {
    return rejectWithValue('Нет покемонов для экспорта');
  }

  try {
    const csvContent = pokemons
      .map((p, index) => `${index + 1}. Name: ${p.name}`)
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${pokemons.length}_items.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Caught on try - exportToCSV ', error);
    return rejectWithValue('Ошибка экспорта');
  }
});

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
    clearPokemons: (state) => {
      state.pokemons = [];
    },
  },
});

export const { addPokemon, removePokemon, clearPokemons } =
  pokemonSlice.actions;
export const pokemonReducer = pokemonSlice.reducer;
export const selectPokemons = (state: RootState) => state.pokemons.pokemons;
