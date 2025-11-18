import { useContext } from 'react'
import { TourContext } from './tour-context'
import { TourContextValue } from './tour.types'

/**
 * Hook to access the tour context
 * Must be used within a Tour component
 */
export function useTour(): TourContextValue {
  const context = useContext(TourContext)

  if (!context) {
    throw new Error('useTour must be used within a Tour component')
  }

  return context
}
