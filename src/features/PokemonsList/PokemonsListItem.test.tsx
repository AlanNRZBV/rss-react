import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PokemonsListItem from './PokemonsListItem.tsx';
import '@testing-library/jest-dom';

describe('PokemonsItemList tests', () => {
  describe('rendering tests', () => {
    test('should display item name and description correctly', () => {
      const { name, url }: Pokemon = {
        name: 'bulbasaur',
        url: 'testString',
      };

      render(<PokemonsListItem name={name} url={url} />);

      const spanElement = screen.getByText(name, { selector: 'span' });
      const anchorElement = screen.getByText(url, {
        selector: 'a',
      });

      expect(spanElement).toBeInTheDocument();
      expect(anchorElement).toBeInTheDocument();
    });
  });
});
