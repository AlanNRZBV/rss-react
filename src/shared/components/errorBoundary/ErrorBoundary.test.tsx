import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';
import ErrorBoundary from './ErrorBoundary.tsx';

const ErrorChild = () => {
  throw new Error('They are in the trees');
};

describe('ErrorBoundary', () => {
  const errMsg = 'test message';
  describe('Error Catching Tests', () => {
    const consoleSpy = vi.spyOn(console, 'error');
    consoleSpy.mockImplementation(() => null);

    test('should catch error and log it to console', () => {
      render(
        <ErrorBoundary message={errMsg}>
          <ErrorChild />
        </ErrorBoundary>
      );

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'They are in the trees',
        }),
        expect.anything()
      );

      consoleSpy.mockRestore();
    });
    test('should display fallback div', () => {
      render(
        <ErrorBoundary message={errMsg}>
          <ErrorChild />
        </ErrorBoundary>
      );

      const fallback = screen.getByText(errMsg);
      expect(fallback).toBeInTheDocument();
    });
  });
});
