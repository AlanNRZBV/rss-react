import type { ChangeEvent, FormEvent } from 'react';

declare type BasicError = {
  status: number;
  message: string;
};

declare type AppState = {
  search: string;
  defaultSearch: DefaultResponse | undefined;
  pokemon: PokemonItem | undefined;
  isLoading: boolean;
  isError: boolean;
  error: BasicError | undefined;
};

declare type PokemonContext = {
  app: AppState;
  detailedView: boolean;
};

declare type ActionsContext = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  toggleView: () => void;
};

declare type DefaultResponse = {
  count: number;
  next: string;
  previous: string | null;
  results: Pokemon[];
};

declare type PokemonItem = {
  id: number;
  height: number;
  name: string;
  order: number;
  weight: number;
};

declare type PokemonExtended = PokemonItem & {
  is_default: boolean;
  base_experience: number;
};

declare type Pokemon = {
  name: string;
  url: string;
};
