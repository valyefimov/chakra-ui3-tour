import { createContext } from 'react';
import { TourContextValue } from './tour.types';

export const TourContext = createContext<TourContextValue | null>(null);

export const TourProvider = TourContext.Provider;
