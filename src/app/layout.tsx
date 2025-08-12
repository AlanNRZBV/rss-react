import React, { FC, PropsWithChildren } from 'react';
import './globals.css';

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <title>RS School</title>
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
