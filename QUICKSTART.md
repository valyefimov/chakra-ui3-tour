# Quick Start Guide

Get started with Chakra UI 3 Tour in minutes!

## Installation

```bash
npm install chakra-ui3-tour @chakra-ui/react react react-dom
```

## Basic Usage

### 1. Import Components

```tsx
import {
  Tour,
  TourDialog,
  TourDialogHeader,
  TourDialogBody,
  TourDialogFooter,
  TourDialogActions,
  TourNextButton,
  TourSpotlight,
} from 'chakra-ui3-tour'
```

### 2. Add data-tour attributes to your elements

```tsx
<Button data-tour="step-1">Click me</Button>
<Button data-tour="step-2">Settings</Button>
```

### 3. Create your tour

```tsx
import { useState } from 'react'
import { Button } from '@chakra-ui/react'

function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Your UI */}
      <Button onClick={() => setIsOpen(true)}>Start Tour</Button>
      <Button data-tour="step-1">Feature 1</Button>
      <Button data-tour="step-2">Feature 2</Button>

      {/* Tour Component */}
      <Tour isActive={isOpen} onComplete={() => setIsOpen(false)}>
        <TourDialog data-target="[data-tour='step-1']">
          <TourDialogHeader>Welcome!</TourDialogHeader>
          <TourDialogBody>This is your first feature.</TourDialogBody>
          <TourDialogFooter>
            <TourDialogActions>
              <TourNextButton />
            </TourDialogActions>
          </TourDialogFooter>
        </TourDialog>

        <TourDialog data-target="[data-tour='step-2']">
          <TourDialogHeader>Step 2</TourDialogHeader>
          <TourDialogBody>Here's another important feature!</TourDialogBody>
          <TourDialogFooter>
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

## Common Patterns

### With Close Button

```tsx
<TourDialog data-target="[data-tour='step-1']">
  <TourDialogCloseButton />
  <TourDialogHeader>Welcome!</TourDialogHeader>
  <TourDialogBody>Content here</TourDialogBody>
</TourDialog>
```

### With Previous/Next Navigation

```tsx
<TourDialogFooter>
  <Text fontSize="sm">Step 2 of 3</Text>
  <TourDialogActions>
    <TourPrevButton />
    <TourNextButton />
  </TourDialogActions>
</TourDialogFooter>
```

### With Skip/Dismiss Option

```tsx
<TourDialogFooter>
  <TourDialogActions>
    <TourDismissButton />
    <TourNextButton />
  </TourDialogActions>
</TourDialogFooter>
```

### Different Placements

```tsx
{/* Above the target */}
<TourDialog data-target="[data-tour='step-1']" placement="top">
  ...
</TourDialog>

{/* To the left */}
<TourDialog data-target="[data-tour='step-2']" placement="left">
  ...
</TourDialog>

{/* To the right */}
<TourDialog data-target="[data-tour='step-3']" placement="right">
  ...
</TourDialog>
```

### Custom Styling

```tsx
<TourDialog 
  data-target="[data-tour='step-1']"
  bg="purple.500"
  color="white"
  borderRadius="xl"
>
  <TourDialogHeader fontSize="2xl">Custom Style</TourDialogHeader>
  <TourDialogBody>Fully customizable!</TourDialogBody>
</TourDialog>
```

### Using the useTour Hook

```tsx
import { useTour } from 'chakra-ui3-tour'

function CustomControl() {
  const tour = useTour()

  return (
    <Button onClick={() => tour.goToStep(2)}>
      Skip to step 3
    </Button>
  )
}

// Use inside a TourDialog or as a child of Tour
<Tour isActive={true}>
  <CustomControl />
  {/* ... tour dialogs ... */}
</Tour>
```

### Uncontrolled Mode

```tsx
// Tour starts automatically
<Tour defaultIsActive={true}>
  {/* tour dialogs */}
</Tour>
```

### Starting from a Specific Step

```tsx
<Tour isActive={true} initialStep={1}>
  {/* Will start from step 2 (index 1) */}
</Tour>
```

### Handling Tour Completion

```tsx
<Tour 
  isActive={isOpen} 
  onComplete={() => {
    setIsOpen(false)
    console.log('Tour completed!')
    // Save to localStorage, analytics, etc.
  }}
  onDismiss={(stepIndex) => {
    setIsOpen(false)
    console.log('Tour dismissed at step:', stepIndex)
  }}
>
  {/* tour dialogs */}
</Tour>
```

## Next Steps

- Check out the [full documentation](./README.md)
- Run the [example app](./examples/App.tsx)
- Explore [theming options](./README.md#theming)
- Review the [API reference](./README.md#components)

## Tips

1. **Always include TourSpotlight** - It creates the overlay effect
2. **Use semantic data-tour attributes** - Makes it easy to identify tour steps
3. **Keep steps focused** - Each step should introduce one feature
4. **Test on mobile** - Tours should work on all screen sizes
5. **Save tour completion** - Don't show the same tour every time

## Troubleshooting

**Tour doesn't appear:**
- Check that `isActive` is `true`
- Verify `data-target` selector matches your elements
- Make sure elements exist in the DOM when tour starts

**Dialog positioned incorrectly:**
- Try different `placement` values
- Adjust `offset` prop
- Ensure target element is visible

**Spotlight not showing:**
- Include `<TourSpotlight />` as a child of `<Tour>`
- Check that target element has valid dimensions

## Support

For issues and questions, please check the [README](./README.md) or open an issue on GitHub.