import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PokemonsList from './PokemonsList.tsx';
import '@testing-library/jest-dom';
import { PokemonProvider } from '../../app/providers/PokemonProvider.tsx';
import { MemoryRouter } from 'react-router';

describe('loading div', () => {
  describe('rendering test', () => {
    test('show show based on loading prop', () => {
      vi.mock('../../shared/api/fetchDefaultData.ts', () => ({
        fetchDefaultData: vi.fn(() => new Promise(() => {})),
      }));

      render(
        <MemoryRouter>
          <PokemonProvider>
            <PokemonsList />
          </PokemonProvider>
        </MemoryRouter>
      );

      const loadingDiv = screen.getByText('Loading content', {
        selector: 'div',
      });

      expect(loadingDiv).toBeInTheDocument();
    });
  });
});
