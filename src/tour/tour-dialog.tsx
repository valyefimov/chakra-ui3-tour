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
import { TourDialogProps } from './tour.types';
import { useTour } from './use-tour';

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
  const { children, 'data-target': dataTarget, placement = 'bottom', offset = 8, ...rest } = props;

  const tour = useTour();
  const contentRef = useRef<HTMLDivElement>(null);
  const stepIndex = (props as any)._tourStepIndex ?? 0;
  const isCurrent = (props as any)._isCurrent ?? false;

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
    <Portal>
      <Box
        ref={mergeRefs(ref, popperRef, contentRef)}
        position="absolute"
        zIndex="popover"
        bg="white"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        boxShadow="lg"
        maxW="sm"
        _dark={{
          bg: 'gray.800',
          borderColor: 'gray.700',
        }}
        {...rest}
      >
        {children}
      </Box>
    </Portal>
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
  return (
    <Box
      ref={ref}
      px={4}
      py={3}
      fontSize="lg"
      fontWeight="semibold"
      borderBottom="1px solid"
      borderColor="gray.200"
      _dark={{
        borderColor: 'gray.700',
      }}
      {...props}
    />
  );
});

TourDialogHeader.displayName = 'TourDialogHeader';

/**
 * TourDialogBody - Body section of the tour dialog
 */
export const TourDialogBody = forwardRef<HTMLDivElement, BoxProps & HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    return (
      <Box
        ref={ref}
        px={4}
        py={3}
        fontSize="sm"
        color="gray.700"
        _dark={{
          color: 'gray.300',
        }}
        {...props}
      />
    );
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
  return (
    <Box
      ref={ref}
      px={4}
      py={3}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      borderTop="1px solid"
      borderColor="gray.200"
      _dark={{
        borderColor: 'gray.700',
      }}
      {...props}
    />
  );
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

  return (
    <IconButton
      ref={ref}
      position="absolute"
      top={2}
      right={2}
      size="sm"
      variant="ghost"
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
  return <Box ref={ref} display="flex" gap={2} alignItems="center" {...props} />;
});

TourDialogActions.displayName = 'TourDialogActions';

/**
 * TourNextButton - Button to go to the next step
 */
export const TourNextButton = forwardRef<
  HTMLButtonElement,
  ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  const tour = useTour();
  const { children = 'Next', ...rest } = props;

  const isLastStep = tour.currentStep === tour.totalSteps - 1;

  return (
    <Button ref={ref} size="sm" colorScheme="blue" onClick={tour.nextStep} {...rest}>
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
  const tour = useTour();
  const { children = 'Previous', ...rest } = props;

  const isFirstStep = tour.currentStep === 0;

  return (
    <Button
      ref={ref}
      size="sm"
      variant="ghost"
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
  const tour = useTour();
  const { children = 'Skip', ...rest } = props;

  return (
    <Button ref={ref} size="sm" variant="ghost" onClick={tour.dismiss} {...rest}>
      {children}
    </Button>
  );
});

TourDismissButton.displayName = 'TourDismissButton';
