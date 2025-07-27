import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';

import { PokemonProvider } from './PokemonProvider.tsx';
import { mockDefaultResponse, mockPokemon } from '../../test-utils/lib.ts';
import { baseApi } from '../../shared/api/instance.ts';
import { MemoryRouter } from 'react-router';
import * as api from '../../shared/api/fetchExtended.ts';
import Home from '../../pages/Home.tsx';
describe('PokemonProvider', () => {
  beforeEach(() => {
    localStorage.setItem('searchValue', 'bulbasaur');
    render(
      <MemoryRouter>
        <PokemonProvider />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    localStorage.clear();
    vi.resetAllMocks();
  });
  describe('Integration Tests', () => {
    test('should make initial API call on component mount', async () => {
      localStorage.clear();

      const spy = vi
        .spyOn(baseApi, 'get')
        .mockResolvedValue(mockDefaultResponse);
      render(
        <MemoryRouter>
          <PokemonProvider />
        </MemoryRouter>
      );
      await waitFor(() => {
        expect(spy).toHaveBeenCalled();
      });
    });
  });

  describe('API Integration Tests', () => {
    test('should call API with correct parameters', async () => {
      const dataFromLS = localStorage.getItem('searchValue');
      const apiSpy = vi.spyOn(baseApi, 'get').mockResolvedValue(mockPokemon);

      render(
        <MemoryRouter>
          <PokemonProvider />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(apiSpy).toHaveBeenCalledWith(`/${dataFromLS}`);
      });
    });
    test('should call API with correct parameters', async () => {
      const dataFromLS = localStorage.getItem('searchValue');
      const apiSpy = vi
        .spyOn(api, 'fetchExtended')
        .mockResolvedValue(mockPokemon);

      render(
        <MemoryRouter>
          <PokemonProvider>
            <Home />
          </PokemonProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(apiSpy).toHaveBeenCalledWith(`${dataFromLS}`);

        const descriptionPart = screen.getByText(mockPokemon.height, {
          selector: 'div',
        });

        expect(descriptionPart).toBeInTheDocument();
      });
    });
  });
});
