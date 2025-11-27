import { anatomy } from '@chakra-ui/anatomy';
import { defineSlotRecipe } from '@chakra-ui/react';

/**
 * Tour component anatomy
 */
export const tourAnatomy = anatomy('tour').parts(
  'spotlight',
  'overlay',
  'dialog',
  'header',
  'body',
  'footer',
  'arrow',
  'actions',
  'closeButton',
  'nextButton',
  'prevButton',
  'dismissButton',
);

export const tourTheme = defineSlotRecipe({
  slots: tourAnatomy.keys,
  base: {
    spotlight: {
      position: 'fixed',
      inset: 0,
      zIndex: 'overlay',
      border: '2px solid',
      borderRadius: 'xl',
      borderColor: 'gray.300',
      boxShadow: '0 0 0 8px rgba(0, 0, 0, 0.08)',
      _osDark: {
        borderColor: 'gray.600',
        boxShadow: '0 0 0 8px rgba(255, 255, 255, 0.06)',
      },
    },

    overlay: {
      position: 'fixed',
      inset: 0,
      bg: 'rgba(0,0,0,0.45)',
      backdropFilter: 'blur(6px) saturate(1.2)',
    },

    dialog: {
      position: 'absolute',
      zIndex: 'popover',
      borderRadius: '2xl',
      backdropFilter: 'blur(18px)',
      bg: 'rgba(255,255,255,0.75)',
      border: '1px solid',
      borderColor: 'gray.200',
      boxShadow: '0 12px 36px rgba(0,0,0,0.18)',
      _osDark: {
        bg: 'rgba(32,32,32,0.65)',
        borderColor: 'gray.700',
        boxShadow: '0 12px 36px rgba(0,0,0,0.55)',
      },
    },

    header: {
      px: 5,
      py: 4,
      fontSize: 'lg',
      fontWeight: 'medium',
      color: 'gray.900',
      borderBottom: '1px solid',
      borderColor: 'gray.200',
      _osDark: {
        color: 'gray.100',
        borderColor: 'gray.700',
      },
    },

    body: {
      px: 5,
      py: 4,
      fontSize: 'sm',
      lineHeight: '1.55',
      color: 'gray.700',
      _osDark: {
        color: 'gray.300',
      },
    },

    footer: {
      px: 5,
      py: 4,
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
      backdropFilter: 'blur(18px)',
      bg: 'rgba(255,255,255,0.75)',
      border: '1px solid',
      borderColor: 'gray.200',
      _osDark: {
        bg: 'rgba(32,32,32,0.65)',
        borderColor: 'gray.700',
      },
    },

    closeButton: {
      position: 'absolute',
      top: 2,
      right: 3,
      bg: 'transparent',
      border: '1px solid',
      color: 'gray.500',
      borderRadius: 'md',
      transition: 'all 0.15s ease',
      _hover: {
        bg: 'gray.100',
        color: 'gray.700',
      },
      _active: {
        bg: 'gray.200',
      },
      _osDark: {
        color: 'gray.200',
        _hover: {
          bg: 'gray.700',
          color: 'gray.200',
        },
        _active: {
          bg: 'gray.600',
        },
      },
    },

    actions: {
      display: 'flex',
      gap: 3,
      alignItems: 'center',
    },

    nextButton: {
      bg: 'gray.900',
      color: 'white',
      fontWeight: 'medium',
      px: 5,
      py: 2,
      border: '1px solid',
      borderRadius: 'lg',
      transition: 'background 0.15s, color 0.15s',

      _hover: {
        bg: 'gray.800',
        color: 'whiteAlpha.700',
      },
      _active: {
        bg: 'gray.700',
      },

      _osDark: {
        bg: 'gray.200',
        color: 'gray.900',
        _hover: {
          bg: 'gray.300',
          color: 'gray.900',
        },
        _active: {
          bg: 'gray.400',
        },
      },
    },

    prevButton: {
      bg: 'transparent',
      color: 'gray.700',
      px: 4,
      py: 2,
      border: '1px solid',
      borderRadius: 'lg',
      transition: 'background 0.15s, color 0.15s',
      fontWeight: 'medium',

      _hover: {
        bg: 'gray.100',
        color: 'gray.900',
      },

      _active: {
        bg: 'gray.200',
      },

      _osDark: {
        color: 'gray.300',
        _hover: {
          bg: 'gray.700',
          color: 'white',
        },
        _active: {
          bg: 'gray.600',
        },
      },
    },

    dismissButton: {
      bg: 'transparent',
      color: 'gray.600',
      px: 4,
      py: 2,
      border: '1px solid',
      borderRadius: 'lg',
      transition: 'background 0.15s, color 0.15s',
      fontWeight: 'medium',

      _hover: {
        bg: 'gray.100',
        color: 'gray.900',
      },

      _active: {
        bg: 'gray.200',
      },

      _osDark: {
        color: 'gray.400',
        _hover: {
          bg: 'gray.700',
          color: 'white',
        },
        _active: {
          bg: 'gray.600',
        },
      },
    },
  },
  variants: {
    size: {
      sm: {
        dialog: { maxW: 'xs' },
        header: { px: 3, py: 2, fontSize: 'md' },
        body: { px: 3, py: 2, fontSize: 'xs' },
        footer: { px: 3, py: 2 },
        closeButton: { width: '24px', height: '24px' },
      },
      md: {
        dialog: { maxW: 'sm' },
        header: { px: 4, py: 3, fontSize: 'lg' },
        body: { px: 4, py: 3, fontSize: 'sm' },
        footer: { px: 4, py: 3 },
      },
      lg: {
        dialog: { maxW: 'md' },
        header: { px: 5, py: 4, fontSize: 'xl' },
        body: { px: 5, py: 4, fontSize: 'md' },
        footer: { px: 5, py: 4 },
        closeButton: { top: 3 },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
