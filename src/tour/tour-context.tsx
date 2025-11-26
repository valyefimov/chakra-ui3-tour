import { createContext, ReactNode } from 'react';
import { TourContextValue } from './tour.types';

export const TourContext = createContext<TourContextValue | null>(null);
export const TourSizeContext = createContext<'sm' | 'md' | 'lg'>('md');
export const TourVariantContext = createContext<string | undefined>(undefined);

export interface TourProviderProps {
  value: TourContextValue;
  children: ReactNode;
}

export interface TourSizeProviderProps {
  value: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export interface TourVariantProviderProps {
  value?: string;
  children: ReactNode;
}

export function TourProvider({ value, children }: TourProviderProps) {
  return <TourContext.Provider value={value}>{children}</TourContext.Provider>;
}

export function TourSizeProvider({ value, children }: TourSizeProviderProps) {
  return <TourSizeContext.Provider value={value}>{children}</TourSizeContext.Provider>;
}

export function TourVariantProvider({ value, children }: TourVariantProviderProps) {
  return <TourVariantContext.Provider value={value}>{children}</TourVariantContext.Provider>;
}
