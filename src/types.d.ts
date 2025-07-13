declare type AppState = {
  search: string;
  defaultSearch: DefaultResponse | undefined;
  pokemon: PokemonExtended | undefined;
};

declare type DefaultResponse = {
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
