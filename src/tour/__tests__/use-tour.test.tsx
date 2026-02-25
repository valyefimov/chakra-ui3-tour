import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Tour, useTour } from '../index';

const TestProvider = ({ children }: { children: React.ReactNode }) => (
  <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
);

describe('useTour', () => {
  it('should throw error when used outside Tour component', () => {
    // Suppress expected React/jsdom error noise for this negative test
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const suppressExpectedWindowError = (event: ErrorEvent) => {
      if (event.error?.message === 'useTour must be used within a Tour component') {
        event.preventDefault();
      }
    };
    window.addEventListener('error', suppressExpectedWindowError);

    expect(() => {
      renderHook(() => useTour(), {
        wrapper: TestProvider,
      });
    }).toThrow('useTour must be used within a Tour component');

    window.removeEventListener('error', suppressExpectedWindowError);
    consoleError.mockRestore();
  });

  it('should return tour context when used inside Tour component', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <TestProvider>
        <Tour isActive={true}>{children}</Tour>
      </TestProvider>
    );

    const { result } = renderHook(() => useTour(), { wrapper });

    expect(result.current).toHaveProperty('isActive');
    expect(result.current).toHaveProperty('isCompleted');
    expect(result.current).toHaveProperty('currentStep');
    expect(result.current).toHaveProperty('totalSteps');
    expect(result.current).toHaveProperty('targetElement');
    expect(result.current).toHaveProperty('targetRef');
    expect(result.current).toHaveProperty('nextStep');
    expect(result.current).toHaveProperty('prevStep');
    expect(result.current).toHaveProperty('goToStep');
    expect(result.current).toHaveProperty('dismiss');
    expect(result.current).toHaveProperty('complete');
    expect(result.current).toHaveProperty('start');
    expect(result.current).toHaveProperty('registerStep');
    expect(result.current).toHaveProperty('unregisterStep');
  });

  it('should return correct isActive state', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <TestProvider>
        <Tour isActive={true}>{children}</Tour>
      </TestProvider>
    );

    const { result } = renderHook(() => useTour(), { wrapper });

    expect(result.current.isActive).toBe(true);
  });

  it('should return correct currentStep', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <TestProvider>
        <Tour isActive={true} initialStep={2}>
          {children}
        </Tour>
      </TestProvider>
    );

    const { result } = renderHook(() => useTour(), { wrapper });

    expect(result.current.currentStep).toBe(2);
  });

  it('should return isCompleted as false initially', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <TestProvider>
        <Tour isActive={true}>{children}</Tour>
      </TestProvider>
    );

    const { result } = renderHook(() => useTour(), { wrapper });

    expect(result.current.isCompleted).toBe(false);
  });
});
