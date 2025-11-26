import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { afterEach, expect } from 'vitest';

expect.extend(matchers);

// Suppress jsdom CSS parsing warnings
const shouldSuppress = (text: string) => {
  return (
    text.includes('Could not parse CSS stylesheet') ||
    text.includes('Error: Could not parse') ||
    text.includes('@layer') ||
    text.includes('color-mix') ||
    text.includes('parse5') ||
    // Suppress expected test errors
    (text.includes('useTour must be used within a Tour component') && text.includes('at useTour'))
  );
};

// Override stderr write to suppress CSS parsing errors
const originalStderrWrite = process.stderr.write.bind(process.stderr);
(process.stderr.write as any) = (
  chunk: string | Uint8Array,
  encodingOrCallback?: any,
  callback?: any,
) => {
  const text = typeof chunk === 'string' ? chunk : chunk.toString();

  // If this is a CSS parsing error, suppress it
  if (shouldSuppress(text)) {
    // Still call the callback if provided (to maintain proper async behavior)
    if (typeof encodingOrCallback === 'function') {
      encodingOrCallback();
    } else if (typeof callback === 'function') {
      callback();
    }
    return true;
  }

  // Otherwise, write normally
  return originalStderrWrite(chunk, encodingOrCallback, callback);
};

// Also suppress via console
const originalError = console.error;
console.error = (...args: any[]) => {
  if (!shouldSuppress(String(args[0] || ''))) {
    originalError(...args);
  }
};

afterEach(() => {
  cleanup();
});
