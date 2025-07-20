import { render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';
import App from './App.tsx';
import { baseApi } from '../shared/api/instance.ts';
import { mockDefaultResponse } from '../test-utils/lib.ts';

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
});
