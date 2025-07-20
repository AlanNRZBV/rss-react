import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import PokemonsList from './PokemonsList.tsx';
import { mockDefaultResponse } from '../../test-utils/lib.ts';
import '@testing-library/jest-dom';

describe('loading div', () => {
  describe('rendering test', () => {
    test('show show/hide based on loading prop', () => {
      let isLoading = true;

      const { rerender } = render(
        <PokemonsList
          error={undefined}
          isError={false}
          isLoading={isLoading}
          pokemon={undefined}
          defaultSearch={mockDefaultResponse}
        />
      );

      const loadingDiv = screen.getByText('Loading content', {
        selector: 'div',
      });

      expect(loadingDiv).toBeInTheDocument();

      isLoading = !isLoading;

      rerender(
        <PokemonsList
          error={undefined}
          isError={false}
          isLoading={isLoading}
          pokemon={undefined}
          defaultSearch={mockDefaultResponse}
        />
      );
      expect(loadingDiv).not.toBeInTheDocument();
    });
  });
});
