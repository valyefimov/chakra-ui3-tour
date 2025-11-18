# Chakra UI 3 Tour

A powerful and flexible multi-step tour component library for Chakra UI 3. Guide your users through your application with beautiful, customizable tours.

Inspired by [Saas UI Pro](https://saas-ui.dev/), this library brings similar tour functionality to Chakra UI v3 with full TypeScript support and modern React patterns.

## Features

- 🎯 **Multi-step Tours** - Create guided tours with multiple steps
- 🎨 **Spotlight Highlighting** - Automatically highlight target elements with an overlay
- 📍 **Smart Positioning** - Automatically positions tour dialogs relative to target elements
- 🎭 **Fully Themeable** - Customize appearance using Chakra UI's theming system
- 🔧 **TypeScript Support** - Full TypeScript support with comprehensive types
- ⚡ **Controlled & Uncontrolled** - Use in controlled or uncontrolled mode
- ♿ **Accessible** - Built with accessibility in mind
- 📦 **Lightweight** - Minimal dependencies, tree-shakeable

## Installation

```bash
npm install chakra-ui3-tour
# or
yarn add chakra-ui3-tour
# or
pnpm add chakra-ui3-tour
```

### Peer Dependencies

This package requires the following peer dependencies:

```bash
npm install @chakra-ui/react react react-dom
```

## Quick Start

```tsx
import {
  Tour,
  TourDialog,
  TourDialogHeader,
  TourDialogBody,
  TourDialogFooter,
  TourDialogCloseButton,
  TourDialogActions,
  TourNextButton,
  TourDismissButton,
  TourSpotlight,
} from 'chakra-ui3-tour'
import { Button, Text } from '@chakra-ui/react'
import { useState } from 'react'

function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Start Tour</Button>
      
      <Button data-tour="step-1">Add User</Button>
      <Button data-tour="step-2">Edit Settings</Button>

      <Tour isActive={isOpen} onComplete={() => setIsOpen(false)}>
        <TourDialog data-target="[data-tour='step-1']">
          <TourDialogCloseButton />
          <TourDialogHeader>Welcome! 👋</TourDialogHeader>
          <TourDialogBody>
            This is the Add User button. Click here to add new users.
          </TourDialogBody>
          <TourDialogFooter>
            <Text fontSize="sm">Step 1 of 2</Text>
            <TourDialogActions>
              <TourDismissButton />
              <TourNextButton />
            </TourDialogActions>
          </TourDialogFooter>
        </TourDialog>

        <TourDialog data-target="[data-tour='step-2']">
          <TourDialogCloseButton />
          <TourDialogHeader>Settings ⚙️</TourDialogHeader>
          <TourDialogBody>
            Access your settings here to customize the application.
          </TourDialogBody>
          <TourDialogFooter>
            <Text fontSize="sm">Step 2 of 2</Text>
            <TourDialogActions>
              <TourNextButton>Finish</TourNextButton>
            </TourDialogActions>
          </TourDialogFooter>
        </TourDialog>

        <TourSpotlight />
      </Tour>
    </>
  )
}
```

## Components

### Tour

The main component that wraps all tour steps and manages tour state.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Tour dialog components |
| `isActive` | `boolean` | - | Whether the tour is active (controlled) |
| `defaultIsActive` | `boolean` | `false` | Whether the tour is active by default (uncontrolled) |
| `initialStep` | `number` | `0` | The initial step index |
| `onComplete` | `() => void` | - | Called when the tour is completed |
| `onDismiss` | `(index: number) => void` | - | Called when a step is dismissed |
| `tourRef` | `RefObject<TourStepAPI>` | - | Ref to access tour API methods |

### TourDialog

A dialog component that appears near the target element.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Dialog content |
| `data-target` | `string` | - | CSS selector for the target element |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right' \| 'auto'` | `'bottom'` | Placement relative to target |
| `offset` | `number` | `8` | Offset from target in pixels |

### TourSpotlight

Creates a spotlight effect highlighting the target element.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `hideOverlay` | `boolean` | `false` | Whether to hide the overlay |
| `closeOnClick` | `boolean` | `false` | Whether clicking overlay closes tour |
| `motionPreset` | `'fade' \| 'none'` | `'fade'` | Animation preset |
| `spacing` | `number` | `8` | Spacing around spotlight in pixels |

### Other Components

- **TourDialogHeader** - Header section of the tour dialog
- **TourDialogBody** - Body section of the tour dialog
- **TourDialogFooter** - Footer section of the tour dialog
- **TourDialogCloseButton** - Close button for the tour dialog
- **TourDialogActions** - Container for action buttons
- **TourNextButton** - Button to go to the next step
- **TourPrevButton** - Button to go to the previous step
- **TourDismissButton** - Button to dismiss/close the tour

## Hooks

### useTour

Access the tour context and control the tour programmatically.

```tsx
import { useTour } from 'chakra-ui3-tour'

function CustomTourButton() {
  const tour = useTour()

  return (
    <Button onClick={() => tour.goToStep(2)}>
      Skip to step 3
    </Button>
  )
}
```

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `isActive` | `boolean` | Whether the tour is active |
| `isCompleted` | `boolean` | Whether the tour is completed |
| `currentStep` | `number` | Current step index |
| `totalSteps` | `number` | Total number of steps |
| `targetElement` | `HTMLElement \| null` | Current target element |
| `nextStep` | `() => void` | Go to next step |
| `prevStep` | `() => void` | Go to previous step |
| `goToStep` | `(index: number) => void` | Go to specific step |
| `dismiss` | `() => void` | Dismiss the tour |
| `complete` | `() => void` | Complete the tour |
| `start` | `() => void` | Start the tour |

## Advanced Usage

### Controlled Mode

```tsx
function ControlledTour() {
  const [isActive, setIsActive] = useState(false)

  return (
    <Tour
      isActive={isActive}
      onComplete={() => setIsActive(false)}
      onDismiss={() => setIsActive(false)}
    >
      {/* Tour steps */}
    </Tour>
  )
}
```

### Using Tour Ref

```tsx
function TourWithRef() {
  const tourRef = useRef<TourStepAPI>(null)

  const skipToEnd = () => {
    tourRef.current?.goToStep(tourRef.current.totalSteps - 1)
  }

  return (
    <>
      <Button onClick={skipToEnd}>Skip to End</Button>
      <Tour tourRef={tourRef} defaultIsActive>
        {/* Tour steps */}
      </Tour>
    </>
  )
}
```

### Custom Styling

```tsx
<TourDialog
  data-target="[data-tour='step-1']"
  bg="purple.500"
  color="white"
  borderRadius="xl"
  boxShadow="2xl"
>
  <TourDialogHeader fontSize="2xl" fontWeight="bold">
    Custom Styled Step
  </TourDialogHeader>
  <TourDialogBody>
    You can customize any part of the tour dialog!
  </TourDialogBody>
</TourDialog>
```

### Different Placements

```tsx
<Tour isActive={true}>
  <TourDialog data-target="[data-tour='top']" placement="top">
    <TourDialogBody>This appears above the target</TourDialogBody>
  </TourDialog>

  <TourDialog data-target="[data-tour='left']" placement="left">
    <TourDialogBody>This appears to the left</TourDialogBody>
  </TourDialog>

  <TourDialog data-target="[data-tour='right']" placement="right">
    <TourDialogBody>This appears to the right</TourDialogBody>
  </TourDialog>
</Tour>
```

### Custom Spotlight

```tsx
<TourSpotlight
  spacing={16}
  closeOnClick={true}
  motionPreset="fade"
/>
```

## Theming

The Tour component uses Chakra UI's theming system. You can customize it by extending your theme:

```tsx
import { extendTheme } from '@chakra-ui/react'
import { tourTheme } from 'chakra-ui3-tour'

const theme = extendTheme({
  components: {
    Tour: tourTheme,
  },
})
```

### Anatomy

The tour component has the following parts:

- `spotlight` - The spotlight overlay
- `overlay` - The dark overlay background
- `dialog` - The dialog container
- `content` - The dialog content
- `header` - The dialog header
- `body` - The dialog body
- `footer` - The dialog footer
- `arrow` - The positioning arrow
- `closeButton` - The close button

### Custom Theme

```tsx
import { defineTourStyle } from 'chakra-ui3-tour'

const customTourTheme = defineTourStyle({
  header: {
    bg: 'purple.500',
    color: 'white',
  },
  body: {
    fontSize: 'md',
  },
})
```

## Live Demo

To see the tour component in action:

```bash
# Clone the repository
git clone https://github.com/yourusername/chakra-ui3-tour
cd chakra-ui3-tour

# Install dependencies
npm install

# Run the development server
npm run dev

# Open http://localhost:5173 in your browser
```

The demo includes:
- A complete user management dashboard example
- Multi-step tour with 4 interactive steps
- Spotlight highlighting
- Various button placements and configurations

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build library
npm run build:lib

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Type check
npm run typecheck

# Lint
npm run lint

# Format code
npm run format
```

## Testing

The library includes tests using Vitest and Testing Library. Note: Tests are currently being optimized for performance.

```bash
# Build the library
npm run build:lib

# Run the development server with examples
npm run dev
```

## Browser Support

Works in all modern browsers that support:
- ES6
- CSS Grid
- Flexbox

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Project Structure

```
chakra-ui3-tour/
├── src/
│   └── tour/
│       ├── tour.tsx              # Main Tour component
│       ├── tour-dialog.tsx       # Dialog components
│       ├── tour-spotlight.tsx    # Spotlight overlay
│       ├── tour-context.tsx      # React context
│       ├── use-tour.ts          # Tour hook
│       ├── tour.types.ts        # TypeScript types
│       ├── theme.ts             # Theming utilities
│       └── index.ts             # Public exports
├── examples/
│   ├── App.tsx                  # Demo application
│   └── main.tsx                 # Entry point
└── dist/                        # Built library files
```

## License

MIT

## Acknowledgments

- Inspired by [Saas UI](https://saas-ui.dev/)
- Built with [Chakra UI](https://chakra-ui.com/)

## Support

If you like this project, please consider giving it a ⭐️ on GitHub!

For issues and feature requests, please [open an issue](https://github.com/yourusername/chakra-ui3-tour/issues).