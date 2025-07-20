import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';
import ErrorBoundary from './ErrorBoundary.tsx';

const errorChildMsg = 'They are in the trees';

const ErrorChild = () => {
  throw new Error(errorChildMsg);
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
          message: errorChildMsg,
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

      const fallback = screen.getByText(errMsg, { selector: 'div' });
      expect(fallback).toBeInTheDocument();
    });
  });
  describe('Error Button Tests', () => {
    test('should throw error when test button is clicked', async () => {});

    test('should trigger error boundary fallback UI', async () => {});
  });
});
