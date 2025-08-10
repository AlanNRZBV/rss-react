import '@testing-library/jest-dom';
import type { FC, PropsWithChildren } from 'react';
import { MemoryRouter } from 'react-router';
type Props = PropsWithChildren;

export const MemoRouterProvider: FC<Props> = ({ children }) => {
  return <MemoryRouter>{children}</MemoryRouter>;
};
