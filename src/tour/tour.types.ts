import { ReactNode, RefObject } from 'react';

export interface TourStepAPI {
  /**
   * Whether the tour is currently active
   */
  isActive: boolean;
  /**
   * Whether the tour is completed
   */
  isCompleted: boolean;
  /**
   * The current step index
   */
  currentStep: number;
  /**
   * The total number of steps
   */
  totalSteps: number;
  /**
   * The target element for the current step
   */
  targetElement: HTMLElement | null;
  /**
   * Ref to the target element
   */
  targetRef: RefObject<HTMLElement | null>;
  /**
   * Go to the next step
   */
  nextStep: () => void;
  /**
   * Go to the previous step
   */
  prevStep: () => void;
  /**
   * Go to a specific step
   */
  goToStep: (index: number) => void;
  /**
   * Dismiss the current step
   */
  dismiss: () => void;
  /**
   * Complete the tour
   */
  complete: () => void;
  /**
   * Start the tour
   */
  start: () => void;
}

export interface TourProps {
  /**
   * The tour content (TourDialog components)
   */
  children: ReactNode;
  /**
   * Whether the tour is active (controlled)
   */
  isActive?: boolean;
  /**
   * Whether the tour is active by default (uncontrolled)
   */
  defaultIsActive?: boolean;
  /**
   * The initial step index
   * @default 0
   */
  initialStep?: number;
  /**
   * Called when the tour is completed
   */
  onComplete?: () => void;
  /**
   * Called when a step is dismissed
   */
  onDismiss?: (index: number) => void;
  /**
   * Ref to access tour API methods
   */
  tourRef?: RefObject<TourStepAPI>;
}

export interface TourDialogProps {
  /**
   * The content of the dialog
   */
  children: ReactNode;
  /**
   * CSS selector for the target element
   * @example "[data-tour='step-1']"
   */
  'data-target'?: string;
  /**
   * Whether to show the dialog
   */
  isOpen?: boolean;
  /**
   * Called when the dialog should close
   */
  onClose?: () => void;
  /**
   * Placement of the dialog relative to the target
   * @default "bottom"
   */
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  /**
   * Offset from the target element in pixels
   * @default 8
   */
  offset?: number;
}

export interface TourSpotlightProps {
  /**
   * Whether to hide the overlay
   */
  hideOverlay?: boolean;
  /**
   * Whether clicking the overlay closes the tour
   */
  closeOnClick?: boolean;
  /**
   * Animation preset
   * @default "fade"
   */
  motionPreset?: 'fade' | 'none';
  /**
   * Spacing around the spotlight in pixels
   * @default 8
   */
  spacing?: number;
}

export interface TourContextValue extends TourStepAPI {
  /**
   * Register a step
   */
  registerStep: (index: number, target: string) => void;
  /**
   * Unregister a step
   */
  unregisterStep: (index: number) => void;
}
