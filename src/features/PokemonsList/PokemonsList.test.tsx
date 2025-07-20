import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import PokemonsList from './PokemonsList';
import {
  mockApiFailError,
  mockApiNotFoundError,
  mockApiServerError,
  mockDefaultResponse,
} from '../../test-utils/lib.ts';
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
  describe('data display tests', () => {
    const nameCheck = mockDefaultResponse.results[0].name;
    const descriptionCheck = mockDefaultResponse.results[0].url;

    test('should correctly display item names and descriptions', () => {
      render(
        <PokemonsList
          error={undefined}
          isError={false}
          isLoading={false}
          pokemon={undefined}
          defaultSearch={mockDefaultResponse}
        />
      );
      const spanElement = screen.getByText(nameCheck, { selector: 'span' });
      const anchorElement = screen.getByText(descriptionCheck, {
        selector: 'a',
      });

      expect(spanElement).toBeInTheDocument();
      expect(anchorElement).toBeInTheDocument();
    });
  });

  describe('error handling test', () => {
    test('should display error message when API call fails', () => {
      const { message, status } = mockApiFailError;

      render(
        <PokemonsList
          error={mockApiFailError}
          isError={true}
          isLoading={false}
          pokemon={undefined}
          defaultSearch={mockDefaultResponse}
        />
      );
      const statusElement = screen.getByText(`Error status : ${status}`, {
        selector: 'span',
      });
      const messageElement = screen.getByText(`Error message : ${message}`, {
        selector: 'span',
      });
      expect(statusElement).toBeInTheDocument();
      expect(messageElement).toBeInTheDocument();
    });
    test('should show appropriate error for HTTP status code 500', () => {
      const { message, status } = mockApiServerError;

      render(
        <PokemonsList
          error={mockApiServerError}
          isError={true}
          isLoading={false}
          pokemon={undefined}
          defaultSearch={mockDefaultResponse}
        />
      );
      const statusElement = screen.getByText(`Error status : ${status}`, {
        selector: 'span',
      });
      const messageElement = screen.getByText(`Error message : ${message}`, {
        selector: 'span',
      });
      expect(statusElement).toBeInTheDocument();
      expect(messageElement).toBeInTheDocument();
    });
    test('should show appropriate error for HTTP status code 404', () => {
      render(
        <PokemonsList
          error={mockApiNotFoundError}
          isError={true}
          isLoading={false}
          pokemon={undefined}
          defaultSearch={mockDefaultResponse}
        />
      );
      const divElement = screen.getByText('Wrong pokemon name', {
        selector: 'div',
      });
      expect(divElement).toBeInTheDocument();
    });
  });
});
