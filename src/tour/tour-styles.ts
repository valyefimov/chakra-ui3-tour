import { SystemStyleObject } from '@chakra-ui/react';

export const TOUR_DIALOG_SLOTS = [
  'spotlight',
  'overlay',
  'dialog',
  'header',
  'body',
  'footer',
  'closeButton',
  'nextButton',
  'prevButton',
  'dismissButton',
  'actions',
  'arrow',
] as const;

export type TourDialogStyles = Record<(typeof TOUR_DIALOG_SLOTS)[number], SystemStyleObject>;

/**
 * Fallback styles for Tour Dialog components when theme is not available
 */
export const FALLBACK_STYLES: TourDialogStyles = {
  spotlight: {
    position: 'fixed',
    inset: 0,
    zIndex: 'overlay',
    border: '2px solid',
    borderRadius: 'lg',
    borderColor: 'gray.400',
    boxShadow: '0 0 0 6px rgba(0, 0, 0, 0.12)',

    _osDark: {
      borderColor: 'gray.600',
      boxShadow: '0 0 0 6px rgba(255, 255, 255, 0.10)',
    },
  },

  overlay: {
    position: 'fixed',
    inset: 0,
    bg: 'blackAlpha.600',
    backdropFilter: 'blur(3px)',
  },

  dialog: {
    position: 'absolute',
    zIndex: 'popover',
    borderRadius: 'lg',
    boxShadow: '0 8px 24px rgba(0,0,0,0.16)',
    bg: 'white',
    width: 'sm',
    border: '1px solid',
    borderColor: 'gray.200',
    _osDark: {
      bg: 'gray.800',
      borderColor: 'gray.700',
    },
  },

  header: {
    px: 4,
    py: 3,
    fontSize: 'lg',
    fontWeight: 'medium',
    color: 'gray.800',
    borderBottom: '1px solid',
    borderColor: 'gray.200',
    _osDark: {
      color: 'gray.100',
      borderColor: 'gray.700',
    },
  },

  body: {
    px: 4,
    py: 3,
    fontSize: 'sm',
    color: 'gray.700',
    _osDark: {
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
    _osDark: {
      borderColor: 'gray.700',
    },
  },

  arrow: {
    bg: 'white',
    border: '1px solid',
    borderColor: 'gray.200',
    _osDark: {
      bg: 'gray.800',
      borderColor: 'gray.700',
    },
  },

  closeButton: {
    position: 'absolute',
    top: 2,
    right: 2,
    bg: 'transparent',
    color: 'gray.500',
    _hover: {
      bg: 'gray.100',
    },
    _osDark: {
      color: 'gray.400',
      _hover: {
        bg: 'gray.700',
      },
    },
  },

  actions: {
    display: 'flex',
    gap: 2,
    alignItems: 'center',
  },

  nextButton: {
    bg: 'gray.900',
    color: 'white',
    fontWeight: 'medium',
    px: 4,
    borderRadius: 'md',
    _hover: {
      bg: 'gray.800',
    },
    _active: {
      bg: 'gray.700',
    },
    _osDark: {
      bg: 'gray.100',
      color: 'gray.900',
      _hover: {
        bg: 'gray.200',
      },
      _active: {
        bg: 'gray.300',
      },
    },
  },

  prevButton: {
    bg: 'transparent',
    color: 'gray.800',
    fontWeight: 'medium',
    _hover: {
      bg: 'gray.100',
    },
    _osDark: {
      color: 'gray.200',
      _hover: {
        bg: 'gray.700',
      },
    },
  },

  dismissButton: {
    bg: 'transparent',
    color: 'gray.600',
    fontWeight: 'medium',
    _hover: {
      bg: 'gray.100',
    },
    _osDark: {
      color: 'gray.300',
      _hover: {
        bg: 'gray.700',
      },
    },
  },
};

/**
 * Merge theme styles with fallback styles and overrides
 */
export function mergeSlotStyles(
  themeStyles: any,
  overrides?: Partial<TourDialogStyles>,
): TourDialogStyles {
  const hasTheme = Object.keys(themeStyles).length > 0;

  const entries = TOUR_DIALOG_SLOTS.map((slot) => [
    slot,
    {
      ...(hasTheme ? themeStyles[slot] : FALLBACK_STYLES[slot]),
      ...(overrides?.[slot] ?? {}),
    },
  ]);

  return Object.fromEntries(entries) as TourDialogStyles;
}
