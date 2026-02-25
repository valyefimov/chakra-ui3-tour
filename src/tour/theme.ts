import { defineSlotRecipe, type SystemStyleObject } from '@chakra-ui/react';

const tourParts = [
  'spotlight',
  'overlay',
  'dialog',
  'content',
  'header',
  'body',
  'footer',
  'arrow',
  'closeButton',
] as const;

type TourPart = (typeof tourParts)[number];
type TourStyle = Partial<Record<TourPart, SystemStyleObject>>;

/**
 * Tour component anatomy
 */
export const tourAnatomy = {
  keys: tourParts,
} as const;

/**
 * Helper to define slot styles for tour parts
 */
export const defineTourStyle = <T extends TourStyle>(styles: T) => styles;

/**
 * Base styles for the tour component
 */
const baseStyle = defineTourStyle({
  spotlight: {
    position: 'fixed',
    inset: 0,
    zIndex: 'overlay',
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    bg: 'blackAlpha.600',
  },
  dialog: {
    position: 'absolute',
    zIndex: 'popover',
    borderRadius: 'md',
    boxShadow: 'lg',
    maxW: 'sm',
  },
  content: {
    bg: 'white',
    border: '1px solid',
    borderColor: 'gray.200',
    borderRadius: 'md',
    _dark: {
      bg: 'gray.800',
      borderColor: 'gray.700',
    },
  },
  header: {
    px: 4,
    py: 3,
    fontSize: 'lg',
    fontWeight: 'semibold',
    borderBottom: '1px solid',
    borderColor: 'gray.200',
    _dark: {
      borderColor: 'gray.700',
    },
  },
  body: {
    px: 4,
    py: 3,
    fontSize: 'sm',
    color: 'gray.700',
    _dark: {
      color: 'gray.300',
    },
  },
  footer: {
    px: 4,
    py: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTop: '1px solid',
    borderColor: 'gray.200',
    _dark: {
      borderColor: 'gray.700',
    },
  },
  arrow: {
    bg: 'white',
    _dark: {
      bg: 'gray.800',
    },
  },
  closeButton: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
});

/**
 * Size variants for the tour component
 */
const sizes = {
  sm: defineTourStyle({
    dialog: {
      maxW: 'xs',
    },
    header: {
      px: 3,
      py: 2,
      fontSize: 'md',
    },
    body: {
      px: 3,
      py: 2,
      fontSize: 'xs',
    },
    footer: {
      px: 3,
      py: 2,
    },
  }),
  md: defineTourStyle({
    dialog: {
      maxW: 'sm',
    },
    header: {
      px: 4,
      py: 3,
      fontSize: 'lg',
    },
    body: {
      px: 4,
      py: 3,
      fontSize: 'sm',
    },
    footer: {
      px: 4,
      py: 3,
    },
  }),
  lg: defineTourStyle({
    dialog: {
      maxW: 'md',
    },
    header: {
      px: 5,
      py: 4,
      fontSize: 'xl',
    },
    body: {
      px: 5,
      py: 4,
      fontSize: 'md',
    },
    footer: {
      px: 5,
      py: 4,
    },
  }),
};

/**
 * Default tour theme configuration
 */
export const tourTheme = defineSlotRecipe({
  className: 'chakra-tour',
  slots: tourAnatomy.keys,
  base: baseStyle,
  variants: {
    size: sizes,
  },
  defaultVariants: {
    size: 'md',
  },
});

/**
 * Helper to extend tour theme
 */
type TourRecipeConfig = Omit<Parameters<typeof defineSlotRecipe>[0], 'slots'> & {
  slots?: readonly TourPart[];
};

export const defineTourConfig = (config: TourRecipeConfig) =>
  defineSlotRecipe({
    slots: tourAnatomy.keys,
    ...config,
  });
