import React, { FC, PropsWithChildren } from 'react';
import '../globals.css';
import StoreProvider from '@/lib/providers/StoreProvider.tsx';
import Navbar from '@/shared/components/Navbar/Navbar.tsx';
import { ThemeContextProvider } from '@/lib/context/themeContextProvider.tsx';

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <title>RS School</title>
      </head>
      <body>
        <ThemeContextProvider>
          <StoreProvider>
            <div
              id="root"
              className="flex h-full w-full flex-col px-8 py-4 dark:bg-gray-900"
            >
              <Navbar />
              {children}
            </div>
          </StoreProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
