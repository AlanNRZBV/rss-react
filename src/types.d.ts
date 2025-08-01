declare type BasicError = {
  status: number;
  message: string;
};

declare type AppState = {
  search: string;
  defaultSearch: PokemonList | undefined;
  pokemon: PokemonExtended | undefined;
  isLoading: boolean;
  isError: boolean;
  error: BasicError | undefined;
  pokemonDetailed: PokemonDetailed | undefined;
};

declare type ThemeContext = {
  theme: 'light' | 'dark';
};

declare type ActionsContext = {
  toggleTheme: () => void;
};

declare type PokemonList = {
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
