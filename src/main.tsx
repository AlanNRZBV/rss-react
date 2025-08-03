import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { router } from './app/providers/router.tsx';
import { Provider } from 'react-redux';
import { store } from './app/providers/store.ts';
import { ThemeContextProvider } from './app/providers/themeContextProvider.tsx';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeContextProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeContextProvider>
  </StrictMode>
);
