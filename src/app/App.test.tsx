import { render, waitFor, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';
import App from './App.tsx';
import { baseApi } from '../shared/api/instance.ts';
import { mockDefaultResponse, mockPokemon } from '../test-utils/lib.ts';

describe('App', () => {
  beforeEach(() => {
    localStorage.setItem('searchData', 'bulbasaur');
    render(<App />);
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
      render(<App />);
      await waitFor(() => {
        expect(spy).toHaveBeenCalled();
      });
    });
  });

  describe('API Integration Tests', () => {
    test('should call API with correct parameters', async () => {
      const dataFromLS = localStorage.getItem('searchData');
      const apiSpy = vi.spyOn(baseApi, 'get').mockResolvedValue(mockPokemon);

      render(<App />);

      await waitFor(() => {
        expect(apiSpy).toHaveBeenCalledWith(`/${dataFromLS}`);
      });
    });
    test('should call API with correct parameters', async () => {
      const dataFromLS = localStorage.getItem('searchData');
      const apiSpy = vi.spyOn(baseApi, 'get').mockResolvedValue(mockPokemon);

      render(<App />);

      await waitFor(() => {
        expect(apiSpy).toHaveBeenCalledWith(`/${dataFromLS}`);

        const descriptionPart = screen.getByText(mockPokemon.height, {
          selector: 'div',
        });

        expect(descriptionPart).toBeInTheDocument();
      });
    });
  });
});
