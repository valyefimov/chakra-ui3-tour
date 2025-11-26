import { usePopper } from '@chakra-ui/popper';
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  IconButton,
  IconButtonProps,
  Portal,
} from '@chakra-ui/react';
import { ButtonHTMLAttributes, forwardRef, HTMLAttributes, useEffect, useRef } from 'react';
import { TourSizeProvider, TourVariantProvider } from './tour-context';
import { TourDialogProps } from './tour.types';
import { useTour } from './use-tour';
import { useTourSize, useTourStyles, useTourVariant } from './use-tour-styles';

// Helper to merge refs
function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (value: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T>).current = value;
      }
    });
  };
}

// Close icon component
const CloseIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/**
 * TourDialog - Main dialog component that appears near the target element
 */
export const TourDialog = forwardRef<HTMLDivElement, TourDialogProps>((props, ref) => {
  const {
    children,
    size = 'md',
    variant = 'default',
    'data-target': dataTarget,
    placement = 'bottom',
    offset = 8,
    ...rest
  } = props;

  const tour = useTour();
  const contentRef = useRef<HTMLDivElement>(null);
  const stepIndex = (props as any)._tourStepIndex ?? 0;
  const isCurrent = (props as any)._isCurrent ?? false;

  const styles = useTourStyles({ size, variant });

  // Register this step with the tour
  useEffect(() => {
    if (dataTarget) {
      tour.registerStep(stepIndex, dataTarget);
      return () => {
        tour.unregisterStep(stepIndex);
      };
    }
  }, [stepIndex, dataTarget, tour]);

  // Setup popper for positioning
  const { popperRef, referenceRef } = usePopper({
    placement,
    offset: [0, offset],
    gutter: offset,
  });

  // Update reference element when target changes
  useEffect(() => {
    if (isCurrent && dataTarget) {
      const element = document.querySelector<HTMLElement>(dataTarget);
      if (element && referenceRef) {
        referenceRef(element);
      }
    }
  }, [isCurrent, dataTarget, referenceRef]);

  if (!isCurrent || !tour.isActive) {
    return null;
  }

  return (
    <TourVariantProvider value={variant}>
      <TourSizeProvider value={size}>
        <Portal>
          <Box ref={mergeRefs(ref, popperRef, contentRef)} {...styles.dialog} {...rest}>
            {children}
          </Box>
        </Portal>
      </TourSizeProvider>
    </TourVariantProvider>
  );
});

TourDialog.displayName = 'TourDialog';

/**
 * TourDialogHeader - Header section of the tour dialog
 */
export const TourDialogHeader = forwardRef<
  HTMLDivElement,
  BoxProps & HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const size = useTourSize();
  const variant = useTourVariant();
  const styles = useTourStyles({ size, variant });

  return <Box ref={ref} {...styles.header} {...props} />;
});

TourDialogHeader.displayName = 'TourDialogHeader';

/**
 * TourDialogBody - Body section of the tour dialog
 */
export const TourDialogBody = forwardRef<HTMLDivElement, BoxProps & HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const size = useTourSize();
    const variant = useTourVariant();
    const styles = useTourStyles({ size, variant });

    return <Box ref={ref} {...styles.body} {...props} />;
  },
);

TourDialogBody.displayName = 'TourDialogBody';

/**
 * TourDialogFooter - Footer section of the tour dialog
 */
export const TourDialogFooter = forwardRef<
  HTMLDivElement,
  BoxProps & HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const size = useTourSize();
  const variant = useTourVariant();
  const styles = useTourStyles({ size, variant });

  return <Box ref={ref} {...styles.footer} {...props} />;
});

TourDialogFooter.displayName = 'TourDialogFooter';

/**
 * TourDialogCloseButton - Close button for the tour dialog
 */
export const TourDialogCloseButton = forwardRef<
  HTMLButtonElement,
  Omit<IconButtonProps, 'aria-label'> & ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  const tour = useTour();
  const size = useTourSize();
  const variant = useTourVariant();
  const styles = useTourStyles({ size, variant });

  return (
    <IconButton
      ref={ref}
      {...styles.closeButton}
      size="sm"
      aria-label="Close tour"
      onClick={tour.dismiss}
      {...props}
    >
      <CloseIcon />
    </IconButton>
  );
});

TourDialogCloseButton.displayName = 'TourDialogCloseButton';

/**
 * TourDialogActions - Container for action buttons
 */
export const TourDialogActions = forwardRef<
  HTMLDivElement,
  BoxProps & HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const size = useTourSize();
  const variant = useTourVariant();
  const styles = useTourStyles({ size, variant });

  return <Box ref={ref} {...styles.actions} {...props} />;
});

TourDialogActions.displayName = 'TourDialogActions';

/**
 * TourNextButton - Button to go to the next step
 */

export const TourNextButton = forwardRef<
  HTMLButtonElement,
  ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  const { children = 'Next', ...rest } = props;
  const tour = useTour();
  const size = useTourSize();
  const variant = useTourVariant();
  const styles = useTourStyles({ size, variant });

  const isLastStep = tour.currentStep === tour.totalSteps - 1;

  return (
    <Button ref={ref} {...styles.nextButton} size="sm" onClick={tour.nextStep} {...rest}>
      {isLastStep && children === 'Next' ? 'Finish' : children}
    </Button>
  );
});

TourNextButton.displayName = 'TourNextButton';

/**
 * TourPrevButton - Button to go to the previous step
 */

export const TourPrevButton = forwardRef<
  HTMLButtonElement,
  ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  const { children = 'Previous', ...rest } = props;
  const tour = useTour();
  const size = useTourSize();
  const variant = useTourVariant();
  const styles = useTourStyles({ size, variant });

  const isFirstStep = tour.currentStep === 0;

  return (
    <Button
      ref={ref}
      {...styles.prevButton}
      size="sm"
      onClick={tour.prevStep}
      disabled={isFirstStep}
      {...rest}
    >
      {children}
    </Button>
  );
});

TourPrevButton.displayName = 'TourPrevButton';

/**
 * TourDismissButton - Button to dismiss/close the tour
 */

export const TourDismissButton = forwardRef<
  HTMLButtonElement,
  ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  const { children = 'Skip', ...rest } = props;
  const tour = useTour();
  const size = useTourSize();
  const variant = useTourVariant();
  const styles = useTourStyles({ size, variant });

  return (
    <Button ref={ref} {...styles.dismissButton} size="sm" onClick={tour.dismiss} {...rest}>
      {children}
    </Button>
  );
});

TourDismissButton.displayName = 'TourDismissButton';
