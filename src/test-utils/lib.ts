export const mockPokemonList: PokemonList = {
  count: 1302,
  next: 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=10',
  previous: null,
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
    {
      name: 'venusaur',
      url: 'https://pokeapi.co/api/v2/pokemon/3/',
    },
    {
      name: 'charmander',
      url: 'https://pokeapi.co/api/v2/pokemon/4/',
    },
    {
      name: 'charmeleon',
      url: 'https://pokeapi.co/api/v2/pokemon/5/',
    },
    {
      name: 'charizard',
      url: 'https://pokeapi.co/api/v2/pokemon/6/',
    },
    {
      name: 'squirtle',
      url: 'https://pokeapi.co/api/v2/pokemon/7/',
    },
    {
      name: 'wartortle',
      url: 'https://pokeapi.co/api/v2/pokemon/8/',
    },
    {
      name: 'blastoise',
      url: 'https://pokeapi.co/api/v2/pokemon/9/',
    },
    {
      name: 'caterpie',
      url: 'https://pokeapi.co/api/v2/pokemon/10/',
    },
  ],
};

export const mockPokemon: PokemonExtended = {
  name: 'bulbasaur',
  weight: 69,
  order: 1,
  height: 7,
  id: 1,
};
export const mockPokemonDetailed: PokemonDetailed = {
  name: 'bulbasaur',
  weight: 69,
  order: 1,
  height: 7,
  id: 1,
  base_experience: 333,
  is_default: false,
};
