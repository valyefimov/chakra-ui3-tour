import { Box, BoxProps, Portal } from '@chakra-ui/react';
import { forwardRef, useEffect, useState } from 'react';
import { TourSpotlightProps } from './tour.types';
import { useTour } from './use-tour';

/**
 * TourSpotlight - Highlights the target element with an overlay
 */
export const TourSpotlight = forwardRef<
  HTMLDivElement,
  TourSpotlightProps & Omit<BoxProps, 'spacing'>
>((props, ref) => {
  const {
    hideOverlay = false,
    closeOnClick = false,
    motionPreset = 'fade',
    spacing = 8,
    ...rest
  } = props;

  const tour = useTour();
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  // Update target rectangle when step changes
  useEffect(() => {
    if (!tour.isActive || !tour.targetElement) {
      setTargetRect(null);
      return;
    }

    const updateRect = () => {
      if (tour.targetElement) {
        const rect = tour.targetElement.getBoundingClientRect();
        setTargetRect(rect);
      }
    };

    updateRect();

    // Update on scroll and resize
    window.addEventListener('scroll', updateRect, true);
    window.addEventListener('resize', updateRect);

    return () => {
      window.removeEventListener('scroll', updateRect, true);
      window.removeEventListener('resize', updateRect);
    };
  }, [tour.isActive, tour.targetElement, tour.currentStep]);

  if (!tour.isActive || hideOverlay || !targetRect) {
    return null;
  }

  const handleClick = () => {
    if (closeOnClick) {
      tour.dismiss();
    }
  };

  return (
    <Portal>
      {/* Overlay */}
      <Box
        ref={ref}
        position="fixed"
        inset={0}
        zIndex="overlay"
        onClick={handleClick}
        cursor={closeOnClick ? 'pointer' : 'default'}
        pointerEvents={closeOnClick ? 'auto' : 'none'}
        {...rest}
      >
        {/* SVG mask for the spotlight effect */}
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
          <defs>
            <mask id="tour-spotlight-mask">
              {/* White background */}
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              {/* Black cutout for the target */}
              <rect
                x={targetRect.left - spacing}
                y={targetRect.top - spacing}
                width={targetRect.width + spacing * 2}
                height={targetRect.height + spacing * 2}
                rx="8"
                fill="black"
              />
            </mask>
          </defs>
          {/* Apply mask to create overlay with cutout */}
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="rgba(0, 0, 0, 0.6)"
            mask="url(#tour-spotlight-mask)"
            style={{
              transition: motionPreset === 'fade' ? 'all 0.3s ease-in-out' : 'none',
            }}
          />
        </svg>

        {/* Highlight border around target */}
        <Box
          position="absolute"
          left={`${targetRect.left - spacing}px`}
          top={`${targetRect.top - spacing}px`}
          width={`${targetRect.width + spacing * 2}px`}
          height={`${targetRect.height + spacing * 2}px`}
          border="2px solid"
          borderColor="blue.500"
          borderRadius="md"
          pointerEvents="none"
          boxShadow="0 0 0 4px rgba(66, 153, 225, 0.3)"
          style={{
            transition: motionPreset === 'fade' ? 'all 0.3s ease-in-out' : 'none',
          }}
        />
      </Box>
    </Portal>
  );
});

TourSpotlight.displayName = 'TourSpotlight';
