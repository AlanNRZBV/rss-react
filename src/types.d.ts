declare type BasicError = {
  status: number;
  message: string;
};

declare type ThemeContext = {
  theme: 'light' | 'dark';
};

declare type ThemeActionsContext = {
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
