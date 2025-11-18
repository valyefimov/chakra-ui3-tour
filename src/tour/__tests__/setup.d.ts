import '@testing-library/jest-dom';

declare global {
  namespace Vi {
    interface Assertion<T = any> {
      toBeInTheDocument(): T;
      toBeDisabled(): T;
      toBeEnabled(): T;
      toBeVisible(): T;
      toBeInvalid(): T;
      toBeRequired(): T;
      toBeEmptyDOMElement(): T;
      toHaveAttribute(attr: string, value?: any): T;
      toHaveClass(...classNames: string[]): T;
      toHaveFocus(): T;
      toHaveFormValues(values: Record<string, any>): T;
      toHaveStyle(css: string | Record<string, any>): T;
      toHaveTextContent(text: string | RegExp, options?: { normalizeWhitespace: boolean }): T;
      toHaveValue(value: string | string[] | number): T;
      toHaveDisplayValue(value: string | string[]): T;
      toBeChecked(): T;
      toBePartiallyChecked(): T;
      toHaveErrorMessage(text: string | RegExp): T;
    }

    interface AsymmetricMatchersContaining {
      toBeInTheDocument(): any;
      toBeDisabled(): any;
      toBeEnabled(): any;
      toBeVisible(): any;
      toBeInvalid(): any;
      toBeRequired(): any;
      toBeEmptyDOMElement(): any;
      toHaveAttribute(attr: string, value?: any): any;
      toHaveClass(...classNames: string[]): any;
      toHaveFocus(): any;
      toHaveFormValues(values: Record<string, any>): any;
      toHaveStyle(css: string | Record<string, any>): any;
      toHaveTextContent(text: string | RegExp, options?: { normalizeWhitespace: boolean }): any;
      toHaveValue(value: string | string[] | number): any;
      toHaveDisplayValue(value: string | string[]): any;
      toBeChecked(): any;
      toBePartiallyChecked(): any;
      toHaveErrorMessage(text: string | RegExp): any;
    }
  }
}

export {};
