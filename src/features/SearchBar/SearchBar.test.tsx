import { expect, test } from 'vitest';
import { renderWithProviders } from '../../test-utils/testStore.tsx';
import SearchBar from './SearchBar.tsx';
import { screen } from '@testing-library/react';

describe('SearchBar', () => {
  describe('render tests', () => {
    test('should render search input', () => {
      renderWithProviders(<SearchBar />);
      const input = screen.getByRole('textbox', { name: /search/i });
      expect(input).toBeInTheDocument();
    });
  });
});
