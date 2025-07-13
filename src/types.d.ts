declare type AppState = {
  search: string;
  defaultSearch: defaultResponse;
  pokemon: PokemonExtended;
};

declare type defaultResponse = {
  count: number;
  next: string;
  previous: string | null;
  results: Pokemon[];
};

declare type PokemonExtended = {
  id: number;
  height: number;
  name: string;
  order: number;
  weight: number;
};

declare type Pokemon = {
  name: string;
  url: string;
};
