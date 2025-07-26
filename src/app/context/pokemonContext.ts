import { createContext } from 'react';
import type { PokemonContext as PokemonContextType } from '../../types';

export const PokemonContext = createContext<PokemonContextType | null>(null);
