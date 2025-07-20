import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import PokemonsList from './PokemonsList';
import { mockDefaultResponse } from '../../test-utils/lib.ts';
import '@testing-library/jest-dom';

describe('PokemonList', () => {
  describe('rendering tests', () => {
    const valueToPass = 21;

    test('should render correct number of items when data is provided', () => {
      render(
        <PokemonsList
          error={undefined}
          isError={false}
          isLoading={false}
          pokemon={undefined}
          defaultSearch={mockDefaultResponse}
        />
      );
      const items = screen.getAllByRole('row');
      expect(items.length).toBe(valueToPass);
    });
    test('should show loading state while fetching data', () => {
      render(
        <PokemonsList
          error={undefined}
          isError={false}
          isLoading={true}
          pokemon={undefined}
          defaultSearch={mockDefaultResponse}
        />
      );
      const checkString = 'Loading content';
      const loadingElement = screen.getByText(checkString, { selector: 'div' });
      expect(loadingElement).toBeInTheDocument();
    });
  });
});
