import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (build) => ({
    getPokemonByName: build.query<Pokemon, string>({
      query: (name) => ({ url: `pokemon/${name}`, method: 'GET' }),
    }),
    getPokemonList: build.query<PokemonList, number | undefined>({
      query: (arg = 0) => ({
        url: `pokemon?offset=${arg}&limit=10`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetPokemonByNameQuery, useGetPokemonListQuery } = pokemonApi;
