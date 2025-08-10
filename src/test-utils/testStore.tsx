import { render, type RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeContextProvider } from '../app/providers/themeContextProvider.tsx';
import { MemoRouterProvider } from './setupTests.tsx';
import { setupStore, type RootState } from '../app/providers/store.ts';
import type { FC, PropsWithChildren, ReactElement } from 'react';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: ReturnType<typeof setupStore>;
}
type Props = PropsWithChildren;

export const renderWithProviders = (
  ui: ReactElement,
  {
    preloadedState,
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper: FC<Props> = ({ children }) => (
    <Provider store={store}>
      <ThemeContextProvider>
        <MemoRouterProvider>{children}</MemoRouterProvider>
      </ThemeContextProvider>
    </Provider>
  );
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
