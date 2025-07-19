import { beforeEach, describe, expect, test } from 'vitest';
import SearchBar from './SearchBar.tsx';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

describe('SearchBar', () => {
  describe('render UI elements', () => {
    beforeEach(() => {
      render(
        <SearchBar
          search={''}
          onChange={vi.fn()}
          onSubmit={vi.fn()}
          isLoading={false}
        />
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

    const key = 'searchData';
    const value = 'testString';
    test('should display data saved in local storage', () => {
      localStorage.setItem(key, value);

      const dataFromLS = localStorage.getItem(key);

      render(
        <SearchBar
          search={dataFromLS ? dataFromLS : ''}
          onChange={vi.fn()}
          onSubmit={vi.fn()}
          isLoading={false}
        />
      );

      const input = screen.getByLabelText(/search/i);
      expect(input).toHaveValue(dataFromLS);
    });
    test('should display empty input when no data in local storage', () => {
      const dataFromLS = localStorage.getItem(key);

      const value = dataFromLS ? dataFromLS : '';

      render(
        <SearchBar
          search={value}
          onChange={vi.fn()}
          onSubmit={vi.fn()}
          isLoading={false}
        />
      );

      const input = screen.getByLabelText(/search/i);
      expect(input).toHaveValue(value);
    });
  });
});
