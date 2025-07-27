import { render, screen } from '@testing-library/react';

import { describe, expect, test } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router';
import App from '../app/App.tsx';
import NotFound from './NotFound.tsx';
import '@testing-library/jest-dom';

describe('Router', () => {
  test('renders NotFound component for unknown routes', async () => {
    render(
      <MemoryRouter initialEntries={['/kek']}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const errorText = await screen.findByText(/Whoops, something went wrong!/i);
    expect(errorText).toBeInTheDocument();
  });
});
