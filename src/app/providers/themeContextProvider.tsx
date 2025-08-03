import {
  type FC,
  type PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { ThemeContext } from '../context/themeContext.ts';
import { ThemeActionsContext } from '../context/themeActionsContext.ts';

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<'dark' | 'light' | null>('dark');
  const toggleTheme = useCallback(() => {
    setTheme((prevState) => (prevState === 'light' ? 'dark' : 'light'));
  }, []);

  const value = useMemo(() => theme, [theme]);
  const actions = useMemo(
    () => ({
      toggleTheme,
    }),
    [toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      <ThemeActionsContext.Provider value={actions}>
        {children}
      </ThemeActionsContext.Provider>
    </ThemeContext.Provider>
  );
};
