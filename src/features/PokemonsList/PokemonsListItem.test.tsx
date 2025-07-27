import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PokemonsListItem from './PokemonsListItem.tsx';
import '@testing-library/jest-dom';
import type { Pokemon } from '../../types';
import { PokemonProvider } from '../../app/providers/PokemonProvider.tsx';
import { MemoryRouter } from 'react-router';

describe('PokemonsItemList tests', () => {
  describe('rendering tests', () => {
    test('should display item name and description correctly', () => {
      const { name, url }: Pokemon = {
        name: 'bulbasaur',
        url: 'testString',
      };

      render(
        <MemoryRouter>
          <PokemonProvider>
            <PokemonsListItem name={name} url={url} />
          </PokemonProvider>
        </MemoryRouter>
      );

      const spanElement = screen.getByText(name, { selector: 'a' });
      const anchorElement = screen.getByText(url, {
        selector: 'a',
      });

      expect(spanElement).toBeInTheDocument();
      expect(anchorElement).toBeInTheDocument();
    });
  });
});
