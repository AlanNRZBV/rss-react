import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
  }),
  tagTypes: ['POKEMON_LIST'],
  endpoints: (build) => ({
    getPokemonByName: build.query<PokemonExtended, string>({
      query: (name) => ({ url: `pokemon/${name}`, method: 'GET' }),
    }),
    getDetailedPokemonByName: build.query<PokemonDetailed, string>({
      query: (name) => ({ url: `pokemon/${name}`, method: 'GET' }),
    }),
    getPokemonList: build.query<PokemonList, number | undefined>({
      query: (arg = 0) => ({
        url: `pokemon?offset=${arg}&limit=10`,
        method: 'GET',
      }),
      providesTags: ['POKEMON_LIST'],
    }),
  }),
});

export const {
  useGetPokemonByNameQuery,
  useGetPokemonListQuery,
  useLazyGetPokemonByNameQuery,
  useLazyGetPokemonListQuery,
  useLazyGetDetailedPokemonByNameQuery,
  useGetDetailedPokemonByNameQuery,
} = pokemonApi;
