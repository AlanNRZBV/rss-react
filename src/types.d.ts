declare type BasicError = {
  status: number;
  message: string;
};

declare type AppState = {
  search: string;
  defaultSearch: DefaultResponse | undefined;
  pokemon: PokemonExtended | undefined;
  isLoading: boolean;
  isError: boolean;
  error: BasicError | undefined;
  pokemonDetailed: PokemonDetailed | undefined;
};

declare type PokemonContext = {
  theme: 'light' | 'dark';
};

declare type ActionsContext = {
  toggleTheme: () => void;
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

declare type PokemonDetailed = PokemonExtended & {
  is_default: boolean;
  base_experience: number;
};

declare type Pokemon = {
  name: string;
  url: string;
};
