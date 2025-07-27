import { useContext } from 'react';
import { PokemonContext } from '../../app/context/pokemonContext.ts';

export const usePokemon = () => {
  const pokemonContext = useContext(PokemonContext);
  if (!pokemonContext) throw new Error('Using hook out of provider');
  return pokemonContext;
};
