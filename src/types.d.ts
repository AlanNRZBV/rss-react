import type { ChangeEvent, FormEvent } from 'react';

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
  app: AppState;
  detailedView: boolean;
};

declare type ActionsContext = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  toggleView: () => void;
  changePage: (arg: string | null | undefined) => void;
  fetchDetailedHandle: (arg: string) => void;
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
