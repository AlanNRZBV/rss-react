import { describe, expect, test } from 'vitest';
import { screen } from '@testing-library/react';
import App from './App.tsx';
import { renderWithProviders } from '../test-utils/testStore.tsx';

describe('App', () => {
  describe('render tests', () => {
    test('should render app', () => {
      renderWithProviders(<App />);
      const app = screen.getByTestId('app-wrapper');
      expect(app).toBeInTheDocument();
    });
  });
});
