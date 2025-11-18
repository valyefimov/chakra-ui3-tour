# Getting Started with Chakra UI 3 Tour

## Quick Setup (5 minutes)

### Step 1: Run the Demo

```bash
cd chakra-ui3-tour
npm install
npm run dev
```

Open http://localhost:5173 in your browser and click "Start Interactive Tour"

### Step 2: See the Code

Check `examples/App.tsx` to see a complete working implementation.

### Step 3: Use in Your Project

The library is already built in `dist/` folder. You can:

**Option A: Use locally (for development)**
```bash
# In your project
npm install /path/to/chakra-ui3-tour
```

**Option B: Copy source files**
Copy the `src/tour/` directory into your project and modify as needed.

## Minimal Example

Create a file `MyTour.tsx`:

```tsx
import { useState } from 'react'
import { Button } from '@chakra-ui/react'
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

export function MyTour() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      {/* Your UI */}
      <Button onClick={() => setIsOpen(true)}>
        Start Tour
      </Button>

      <Button data-tour="my-feature">
        My Cool Feature
      </Button>

      {/* The Tour */}
      <Tour isActive={isOpen} onComplete={() => setIsOpen(false)}>
        <TourDialog data-target="[data-tour='my-feature']">
          <TourDialogHeader>Check this out! ✨</TourDialogHeader>
          <TourDialogBody>
            This is your cool feature. Click it to do awesome things!
          </TourDialogBody>
          <TourDialogFooter>
            <TourDialogActions>
              <TourNextButton>Got it!</TourNextButton>
            </TourDialogActions>
          </TourDialogFooter>
        </TourDialog>
        <TourSpotlight />
      </Tour>
    </div>
  )
}
```

## Key Concepts

### 1. Mark Target Elements

Add `data-tour` attributes to elements you want to highlight:

```tsx
<Button data-tour="step-1">Click Me</Button>
<IconButton data-tour="step-2" aria-label="Settings" />
<Box data-tour="step-3">Important content</Box>
```

### 2. Create Tour Steps

Each `TourDialog` is one step in the tour:

```tsx
<Tour isActive={true}>
  <TourDialog data-target="[data-tour='step-1']">
    {/* Step 1 content */}
  </TourDialog>
  
  <TourDialog data-target="[data-tour='step-2']">
    {/* Step 2 content */}
  </TourDialog>
  
  <TourSpotlight />
</Tour>
```

### 3. Add Navigation

Use the built-in button components:

```tsx
<TourDialogFooter>
  <TourDialogActions>
    <TourPrevButton />      {/* Go back */}
    <TourNextButton />      {/* Go forward */}
    <TourDismissButton />   {/* Close tour */}
  </TourDialogActions>
</TourDialogFooter>
```

### 4. Control the Tour

```tsx
const [isOpen, setIsOpen] = useState(false)

<Tour 
  isActive={isOpen}
  onComplete={() => setIsOpen(false)}
  onDismiss={() => setIsOpen(false)}
>
  {/* steps */}
</Tour>
```

## Common Patterns

### Show on First Visit

```tsx
useEffect(() => {
  const hasSeenTour = localStorage.getItem('hasSeenTour')
  if (!hasSeenTour) {
    setTourActive(true)
  }
}, [])

const handleComplete = () => {
  localStorage.setItem('hasSeenTour', 'true')
  setTourActive(false)
}
```

### Multiple Steps with Progress

```tsx
<TourDialogFooter>
  <Text fontSize="sm">Step {currentStep + 1} of {totalSteps}</Text>
  <TourDialogActions>
    <TourNextButton />
  </TourDialogActions>
</TourDialogFooter>
```

### Skip Option

```tsx
<TourDialogFooter>
  <TourDialogActions>
    <TourDismissButton>Skip Tour</TourDismissButton>
    <TourNextButton>Continue</TourNextButton>
  </TourDialogActions>
</TourDialogFooter>
```

## Troubleshooting

**Tour doesn't appear?**
- Make sure `isActive` prop is `true`
- Check that target elements exist in DOM
- Verify `data-target` selector matches your elements

**Dialog in wrong position?**
- Try different `placement` prop: `top`, `bottom`, `left`, `right`
- Adjust `offset` prop to change distance from target

**Spotlight not showing?**
- Make sure you included `<TourSpotlight />` component
- Check that target element has valid dimensions

## Next Steps

1. ✅ Run the demo: `npm run dev`
2. 📖 Read QUICKSTART.md for more details
3. 💡 Check EXAMPLES.md for copy-paste examples
4. 🎨 Customize with theming (see README.md)
5. 🚀 Build your own tours!

## File Structure Reference

```
chakra-ui3-tour/
├── src/tour/           # Library source code
├── examples/           # Demo application
├── dist/              # Built library files
├── README.md          # Full documentation
├── QUICKSTART.md      # Detailed quick start
├── EXAMPLES.md        # Code examples
└── IMPLEMENTATION.md  # Technical details
```

## Help & Resources

- **Full API**: See README.md
- **Examples**: See EXAMPLES.md  
- **Architecture**: See IMPLEMENTATION.md
- **Demo App**: examples/App.tsx

Happy touring! 🎉
