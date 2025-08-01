import {
  type FC,
  type PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { PokemonContext } from '../context/pokemonContext.ts';
import { ActionsContext } from '../context/actionsContext.ts';

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const toggleTheme = useCallback(() => {
    setTheme((prevState) => (prevState === 'light' ? 'dark' : 'light'));
  }, []);
  const value = useMemo(() => ({ theme }), [theme]);
  const actions = useMemo(
    () => ({
      toggleTheme,
    }),
    [toggleTheme]
  );

  return (
    <PokemonContext.Provider value={value}>
      <ActionsContext.Provider value={actions}>
        {children}
      </ActionsContext.Provider>
    </PokemonContext.Provider>
  );
};
