import { beforeEach, describe, expect, test } from 'vitest';
import SearchBar from './SearchBar';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { mockPokemon, mockPokemonDetailed } from '../../test-utils/lib.ts';
import { MemoryRouter } from 'react-router';
import { PokemonProvider } from '../../app/providers/PokemonProvider.tsx';
import { fetchExtended } from '../../shared/api/fetchExtended.ts';

vi.mock('../../shared/api/fetchDetailed.ts', () => ({
  fetchDetailed: vi.fn().mockResolvedValue(mockPokemonDetailed),
}));
vi.mock('../../shared/api/fetchExtended.ts', () => ({
  fetchExtended: vi.fn().mockResolvedValue(mockPokemon),
}));
vi.mock('../../shared/api/fetchDefaultData.ts', () => ({
  fetchDefaultData: vi.fn().mockResolvedValue({ results: [] }),
}));
vi.mock('../../shared/api/fetchPage.ts', () => ({
  fetchPage: vi.fn().mockResolvedValue({ results: [] }),
}));

describe('SearchBar', () => {
  const key = 'searchValue';
  const value = 'testString';

  describe('render UI elements', () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <PokemonProvider>
            <SearchBar />
          </PokemonProvider>
        </MemoryRouter>
      );
    });

    test('should render input', () => {
      const input = screen.getByLabelText(/search/i);
      expect(input).toBeInTheDocument();
    });
    test('should render btn', () => {
      const btn = screen.getByRole('button', { name: /submit/i });
      expect(btn).toBeInTheDocument();
    });
  });

  describe('input value', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    test('should display data saved in local storage', () => {
      localStorage.setItem(key, value);
      const dataFromLS = localStorage.getItem(key);
      render(
        <MemoryRouter>
          <PokemonProvider>
            <SearchBar />
          </PokemonProvider>
        </MemoryRouter>
      );

      const input = screen.getByLabelText(/search/i);
      expect(input).toHaveValue(dataFromLS);
    });

    test('should display empty input when no data in local storage', () => {
      const dataFromLS = localStorage.getItem(key);
      const value = dataFromLS ? dataFromLS : '';

      render(
        <MemoryRouter>
          <PokemonProvider>
            <SearchBar />
          </PokemonProvider>
        </MemoryRouter>
      );

      const input = screen.getByLabelText(/search/i);
      expect(input).toHaveValue(value);
    });
  });

  describe('user interaction', () => {
    let searchValue = '';
    const user = userEvent.setup();

    beforeEach(() => {
      searchValue = '';
      localStorage.clear();
    });

    test('should update input value on user typing', async () => {
      searchValue = 'Pikachu';

      render(
        <MemoryRouter>
          <PokemonProvider>
            <SearchBar />
          </PokemonProvider>
        </MemoryRouter>
      );
      const input = screen.getByLabelText(/search/i);

      await user.type(input, searchValue);

      expect(input).toHaveValue('pikachu');
    });

    test('should save input value into local storage', async () => {
      localStorage.setItem(key, searchValue);
      const testValue = 'newString';

      render(
        <MemoryRouter>
          <PokemonProvider>
            <SearchBar />
          </PokemonProvider>
        </MemoryRouter>
      );
      const input = screen.getByLabelText(/search/i);
      const btn = screen.getByRole('button', { name: /submit/i });

      await user.type(input, testValue);
      await user.click(btn);

      const newDataFromLs = localStorage.getItem(key);

      expect(newDataFromLs).toBe(testValue.toLowerCase());
    });

    test('trims whitespace from search input before saving', async () => {
      render(
        <MemoryRouter>
          <PokemonProvider>
            <SearchBar />
          </PokemonProvider>
        </MemoryRouter>
      );

      const input = screen.getByLabelText(/search/i);
      const trimmedValue = 'testString';
      const whiteSpaceValue = '   testString   ';
      const btn = screen.getByRole('button', { name: /submit/i });

      await user.type(input, whiteSpaceValue);
      await user.click(btn);

      const saved = localStorage.getItem(key);
      expect(saved).toBe(trimmedValue.toLowerCase());
    });
    test('should trigger search callback with correct parameters', async () => {
      const arg = 'pika';

      render(
        <MemoryRouter>
          <PokemonProvider>
            <SearchBar />
          </PokemonProvider>
        </MemoryRouter>
      );
      const input = screen.getByLabelText(/search/i);
      const btn = screen.getByRole('button', { name: /submit/i });

      await user.type(input, arg);
      await user.click(btn);

      await waitFor(() => {
        expect(vi.mocked(fetchExtended)).toHaveBeenCalledWith(arg);
      });
    });
  });
  describe('localStorage integration', () => {
    const newSearchValue = 'newTestString';

    beforeEach(() => {
      localStorage.clear();

      localStorage.setItem(key, value);
    });

    test('should retrieve saved search term on component mount', () => {
      render(
        <MemoryRouter>
          <PokemonProvider>
            <SearchBar />
          </PokemonProvider>
        </MemoryRouter>
      );

      const input = screen.getByLabelText(/search/i);
      expect(input).toHaveValue(value);
    });

    test('should overwrite existing localStorage value when new search is performed', async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter>
          <PokemonProvider>
            <SearchBar />
          </PokemonProvider>
        </MemoryRouter>
      );

      const input = screen.getByLabelText(/search/i);
      const btn = screen.getByRole('button', { name: /submit/i });
      await user.clear(input);
      await user.type(input, newSearchValue);
      await user.click(btn);

      const newData = localStorage.getItem(key);

      expect(newData).toBe(newSearchValue.toLowerCase());
    });
  });
});
