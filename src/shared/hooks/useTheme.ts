import { useContext } from 'react';
import { ThemeContext } from '../../app/context/themeContext.ts';

export const useTheme = () => {
  const pokemonContext = useContext(ThemeContext);
  if (!pokemonContext) throw new Error('Using hook out of provider');
  return pokemonContext;
};
