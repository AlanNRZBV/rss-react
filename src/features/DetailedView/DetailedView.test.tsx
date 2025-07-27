import { mockPokemonDetailed } from '../../test-utils/lib.ts';
import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import DetailedView from './DetailedView.tsx';
import { PokemonProvider } from '../../app/providers/PokemonProvider.tsx';
import PokemonsList from '../PokemonsList/PokemonsList.tsx';
import userEvent from '@testing-library/user-event';

vi.mock('../../shared/api/fetchDetailed.ts', () => ({
  fetchDetailed: vi.fn().mockResolvedValue(mockPokemonDetailed),
}));

describe('DetailedView', () => {
  beforeEach(() => {});
  describe('render test', () => {
    test('should render properly', async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter>
          <PokemonProvider>
            <PokemonsList />
            <DetailedView />
          </PokemonProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        const pokemon = screen.getByText('bulbasaur', { selector: 'a' });
        user.click(pokemon);
        const exp = screen.getByText('detailed data', { selector: 'p' });
        expect(exp).toBeInTheDocument();
      });
    });
  });
});
