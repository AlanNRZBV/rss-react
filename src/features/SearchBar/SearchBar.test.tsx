import { beforeEach, describe, expect, test } from 'vitest';
import SearchBar from './SearchBar.tsx';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { type ChangeEvent, type FormEvent } from 'react';

describe('SearchBar', () => {
  const key = 'searchData';
  const value = 'testString';

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

  describe('user interaction', () => {
    let searchValue = '';
    const user = userEvent.setup();

    beforeEach(() => {
      searchValue = '';
      localStorage.clear();
    });

    const handleMockChange = vi.fn((e: ChangeEvent<HTMLInputElement>) => {
      searchValue = e.target.value.trim();
      localStorage.setItem(key, searchValue);
    });

    const handleMockSubmit = vi.fn((e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
    });

    test('should update input value on user typing', async () => {
      const { rerender } = render(
        <SearchBar
          search={searchValue}
          onChange={handleMockChange}
          onSubmit={vi.fn()}
          isLoading={false}
        />
      );
      const input = screen.getByLabelText(/search/i);

      for (const char of value) {
        await user.type(input, char);
        rerender(
          <SearchBar
            search={searchValue}
            onChange={handleMockChange}
            onSubmit={vi.fn()}
            isLoading={false}
          />
        );
      }
      expect(input).toHaveValue(value);
    });

    test('should save input value into local storage', async () => {
      const { rerender } = render(
        <SearchBar
          search={searchValue}
          onChange={handleMockChange}
          onSubmit={vi.fn()}
          isLoading={false}
        />
      );
      const input = screen.getByLabelText(/search/i);

      for (const char of value) {
        await user.type(input, char);
        rerender(
          <SearchBar
            search={searchValue}
            onChange={handleMockChange}
            onSubmit={vi.fn()}
            isLoading={false}
          />
        );
      }
      const dataFromLS = localStorage.getItem(key);

      expect(dataFromLS).toBe(searchValue);
    });

    test('trims whitespace from search input before saving', async () => {
      searchValue = '';

      const { rerender } = render(
        <SearchBar
          search={searchValue}
          onChange={handleMockChange}
          onSubmit={vi.fn()}
          isLoading={false}
        />
      );

      const input = screen.getByLabelText(/search/i);
      const whiteSpaceValue = '   testString   ';

      for (const char of whiteSpaceValue) {
        await user.type(input, char);
        rerender(
          <SearchBar
            search={searchValue}
            onChange={handleMockChange}
            onSubmit={vi.fn()}
            isLoading={false}
          />
        );
      }

      const saved = localStorage.getItem(key);
      expect(saved).toBe(value);
    });
    test('should trigger search callback with correct parameters', async () => {
      render(
        <SearchBar
          search={'bulbasaur'}
          onChange={handleMockChange}
          onSubmit={handleMockSubmit}
          isLoading={false}
        />
      );
      const btn = screen.getByRole('button', { name: /submit/i });
      await user.click(btn);
      expect(handleMockSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
