import { describe, expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import PokemonsList from './PokemonsList';
import {
  mockApiFailError,
  mockApiNotFoundError,
  mockApiServerError,
  mockDefaultResponse,
} from '../../test-utils/lib.ts';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import { PokemonProvider } from '../../app/providers/PokemonProvider.tsx';
import * as fetchModule from '../../shared/api/fetchDefaultData';

describe('PokemonList', () => {
  describe('rendering tests', () => {
    const valueToPass = 11;

    test('should render correct number of items when data is provided', async () => {
      render(
        <MemoryRouter>
          <PokemonProvider>
            <PokemonsList />
          </PokemonProvider>
        </MemoryRouter>
      );
      await waitFor(() => {
        const items = screen.getAllByRole('row');
        expect(items.length).toBe(valueToPass);
      });
    });
    test('should show loading state while fetching data', () => {
      render(
        <MemoryRouter>
          <PokemonProvider>
            <PokemonsList />
          </PokemonProvider>
        </MemoryRouter>
      );
      const checkString = 'Loading content';
      const loadingElement = screen.getByText(checkString, { selector: 'div' });
      expect(loadingElement).toBeInTheDocument();
    });
  });
  describe('data display tests', () => {
    const nameCheck = mockDefaultResponse.results[0].name;

    test('should correctly display item names and descriptions', async () => {
      render(
        <MemoryRouter>
          <PokemonProvider>
            <PokemonsList />
          </PokemonProvider>
        </MemoryRouter>
      );
      const spanElement = await screen.findByText(nameCheck, { selector: 'a' });

      expect(spanElement).toBeInTheDocument();
    });
  });

  describe('error handling test', () => {
    test('should display error message when API call fails', async () => {
      vi.spyOn(fetchModule, 'fetchDefaultData').mockImplementationOnce(() =>
        Promise.resolve(mockApiFailError)
      );

      const { message, status } = mockApiFailError;

      render(
        <MemoryRouter>
          <PokemonProvider>
            <PokemonsList />
          </PokemonProvider>
        </MemoryRouter>
      );
      const statusElement = await screen.findByText(
        `Error status : ${status}`,
        {
          selector: 'span',
        }
      );
      const messageElement = await screen.findByText(
        `Error message : ${message}`,
        {
          selector: 'span',
        }
      );
      expect(statusElement).toBeInTheDocument();
      expect(messageElement).toBeInTheDocument();
    });
    test('should show appropriate error for HTTP status code 500', async () => {
      vi.spyOn(fetchModule, 'fetchDefaultData').mockImplementationOnce(() =>
        Promise.resolve(mockApiServerError)
      );
      const { message, status } = mockApiServerError;

      render(
        <MemoryRouter>
          <PokemonProvider>
            <PokemonsList />
          </PokemonProvider>
        </MemoryRouter>
      );
      await waitFor(() => {
        const statusElement = screen.getByText(`Error status : ${status}`, {
          selector: 'span',
        });
        const messageElement = screen.getByText(`Error message : ${message}`, {
          selector: 'span',
        });
        expect(statusElement).toBeInTheDocument();
        expect(messageElement).toBeInTheDocument();
      });
    });
    test('should show appropriate error for HTTP status code 404', async () => {
      vi.spyOn(fetchModule, 'fetchDefaultData').mockImplementationOnce(() =>
        Promise.resolve(mockApiNotFoundError)
      );
      render(
        <MemoryRouter>
          <PokemonProvider>
            <PokemonsList />
          </PokemonProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        const divElement = screen.getByText('Wrong pokemon name', {
          selector: 'div',
        });
        expect(divElement).toBeInTheDocument();
      });
    });
  });
});
