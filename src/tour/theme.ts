import { anatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

/**
 * Tour component anatomy
 */
export const tourAnatomy = anatomy('tour').parts(
  'spotlight',
  'overlay',
  'dialog',
  'content',
  'header',
  'body',
  'footer',
  'arrow',
  'closeButton'
)

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(tourAnatomy.keys)

/**
 * Base styles for the tour component
 */
const baseStyle = definePartsStyle({
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
})

/**
 * Size variants for the tour component
 */
const sizes = {
  sm: definePartsStyle({
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
  md: definePartsStyle({
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
  lg: definePartsStyle({
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
}

/**
 * Default tour theme configuration
 */
export const tourTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps: {
    size: 'md',
  },
})

/**
 * Helper to extend tour theme
 */
export { defineMultiStyleConfig as defineTourConfig, definePartsStyle as defineTourStyle }
