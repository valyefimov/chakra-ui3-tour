import { describe, it, expect } from 'vitest';

describe('Sanity Test', () => {
  it('should pass basic test', () => {
    expect(true).toBe(true);
  });

  it('should perform basic math', () => {
    expect(1 + 1).toBe(2);
  });
});
