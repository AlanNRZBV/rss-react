import { http, HttpResponse } from 'msw';
import { mockPokemon, mockPokemonList } from './lib.ts';

export const handlers = [
  http.get('https://pokeapi.co/api/v2/pokemon', () => {
    return HttpResponse.json(mockPokemonList);
  }),

  http.get('https://pokeapi.co/api/v2/pokemon/:name', ({ params }) => {
    const { name } = params;
    return HttpResponse.json({ ...mockPokemon, name: name as string });
  }),
];
