'use client';
import {
  type FC,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ThemeContext } from './themeContext.ts';
import { ThemeActionsContext } from './themeActionsContext.ts';

enum Theme {
  Dark = 'dark',
  Light = 'light',
}

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme | null>(Theme.Dark);
  const toggleTheme = useCallback(() => {
    setTheme((prevState) =>
      prevState === Theme.Light ? Theme.Dark : Theme.Light
    );
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme ?? Theme.Dark);
  }, [theme]);

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
