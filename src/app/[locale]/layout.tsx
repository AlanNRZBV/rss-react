import React, { FC, PropsWithChildren, ReactNode } from 'react';
import '../../globals.css';
import StoreProvider from '@/lib/providers/StoreProvider.tsx';
import Navbar from '@/shared/components/Navbar/Navbar.tsx';
import { ThemeContextProvider } from '@/lib/context/themeContextProvider.tsx';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing.ts';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

interface Props extends PropsWithChildren {
  params: Promise<{ locale: string }>;
  details: ReactNode;
  list: ReactNode;
}

const RootLayout: FC<Props> = async ({ children, params, details, list }) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <title>RS School</title>
      </head>
      <body>
        <NextIntlClientProvider>
          <ThemeContextProvider>
            <StoreProvider>
              <div
                id="root"
                className="flex h-full w-full flex-col px-8 py-4 dark:bg-gray-900"
              >
                <Navbar />
                {children}
                <div className="flex border border-amber-600">
                  <div className="grow">{list}</div>
                  <>{details}</>
                </div>
              </div>
            </StoreProvider>
          </ThemeContextProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
