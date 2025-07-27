import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';

describe('Navbar', () => {
  test('renders links correctly', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });
});
