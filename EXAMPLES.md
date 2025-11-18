# Tour Component Examples

Complete examples for using the Chakra UI 3 Tour component library.

## Table of Contents

- [Basic Tour](#basic-tour)
- [Multi-Step Tour](#multi-step-tour)
- [Controlled Tour](#controlled-tour)
- [Using Tour Ref](#using-tour-ref)
- [Custom Styling](#custom-styling)
- [Different Placements](#different-placements)
- [With Icons and Rich Content](#with-icons-and-rich-content)
- [Conditional Tours](#conditional-tours)
- [Tour with LocalStorage](#tour-with-localstorage)
- [Onboarding Flow](#onboarding-flow)
- [Feature Announcement](#feature-announcement)
- [Settings Tour](#settings-tour)

## Basic Tour

The simplest possible tour:

```tsx
import { useState } from 'react'
import { Button } from '@chakra-ui/react'
import {
  Tour,
  TourDialog,
  TourDialogHeader,
  TourDialogBody,
  TourNextButton,
  TourSpotlight,
} from 'chakra-ui3-tour'

function BasicTour() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Start Tour</Button>
      <Button data-tour="my-button">My Feature</Button>

      <Tour isActive={isOpen} onComplete={() => setIsOpen(false)}>
        <TourDialog data-target="[data-tour='my-button']">
          <TourDialogHeader>Welcome!</TourDialogHeader>
          <TourDialogBody>This is your first tour step.</TourDialogBody>
          <TourNextButton>Got it!</TourNextButton>
        </TourDialog>
        <TourSpotlight />
      </Tour>
    </>
  )
}
```

## Multi-Step Tour

A complete tour with multiple steps:

```tsx
import { useState } from 'react'
import { Button, Text, HStack } from '@chakra-ui/react'
import {
  Tour,
  TourDialog,
  TourDialogHeader,
  TourDialogBody,
  TourDialogFooter,
  TourDialogActions,
  TourDialogCloseButton,
  TourNextButton,
  TourPrevButton,
  TourDismissButton,
  TourSpotlight,
} from 'chakra-ui3-tour'

function MultiStepTour() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Take the Tour</Button>

      <HStack gap={4}>
        <Button data-tour="create">Create</Button>
        <Button data-tour="edit">Edit</Button>
        <Button data-tour="delete">Delete</Button>
      </HStack>

      <Tour isActive={isOpen} onComplete={() => setIsOpen(false)}>
        <TourDialog data-target="[data-tour='create']">
          <TourDialogCloseButton />
          <TourDialogHeader>Create Items</TourDialogHeader>
          <TourDialogBody>
            Click here to create new items in your workspace.
          </TourDialogBody>
          <TourDialogFooter>
            <Text fontSize="sm" color="gray.500">Step 1 of 3</Text>
            <TourDialogActions>
              <TourDismissButton />
              <TourNextButton />
            </TourDialogActions>
          </TourDialogFooter>
        </TourDialog>

        <TourDialog data-target="[data-tour='edit']">
          <TourDialogCloseButton />
          <TourDialogHeader>Edit Items</TourDialogHeader>
          <TourDialogBody>
            Use the edit button to modify existing items.
          </TourDialogBody>
          <TourDialogFooter>
            <Text fontSize="sm" color="gray.500">Step 2 of 3</Text>
            <TourDialogActions>
              <TourPrevButton />
              <TourNextButton />
            </TourDialogActions>
          </TourDialogFooter>
        </TourDialog>

        <TourDialog data-target="[data-tour='delete']">
          <TourDialogCloseButton />
          <TourDialogHeader>Delete Items</TourDialogHeader>
          <TourDialogBody>
            Remove items you no longer need. Don't worry, you can undo!
          </TourDialogBody>
          <TourDialogFooter>
            <Text fontSize="sm" color="gray.500">Step 3 of 3</Text>
            <TourDialogActions>
              <TourPrevButton />
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

## Controlled Tour

Full control over tour state:

```tsx
import { useState } from 'react'
import { Button, VStack } from '@chakra-ui/react'
import { Tour, TourDialog, TourDialogHeader, TourDialogBody } from 'chakra-ui3-tour'

function ControlledTour() {
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const handleComplete = () => {
    setIsActive(false)
    setCurrentStep(0)
    console.log('Tour completed!')
  }

  const handleDismiss = (stepIndex: number) => {
    setIsActive(false)
    console.log('Tour dismissed at step:', stepIndex)
  }

  return (
    <VStack gap={4}>
      <Button onClick={() => setIsActive(true)}>Start Tour</Button>
      <Button onClick={() => setIsActive(false)}>Stop Tour</Button>

      <Tour
        isActive={isActive}
        initialStep={currentStep}
        onComplete={handleComplete}
        onDismiss={handleDismiss}
      >
        {/* Tour steps */}
      </Tour>
    </VStack>
  )
}
```

## Using Tour Ref

Access tour methods programmatically:

```tsx
import { useRef } from 'react'
import { Button, HStack } from '@chakra-ui/react'
import {
  Tour,
  TourDialog,
  TourDialogHeader,
  TourDialogBody,
  TourStepAPI,
} from 'chakra-ui3-tour'

function TourWithRef() {
  const tourRef = useRef<TourStepAPI>(null)

  return (
    <>
      <HStack gap={2}>
        <Button onClick={() => tourRef.current?.start()}>Start</Button>
        <Button onClick={() => tourRef.current?.goToStep(2)}>Skip to Step 3</Button>
        <Button onClick={() => tourRef.current?.complete()}>Complete</Button>
        <Button onClick={() => tourRef.current?.dismiss()}>Dismiss</Button>
      </HStack>

      <Tour tourRef={tourRef} defaultIsActive={false}>
        <TourDialog data-target="[data-tour='step-1']">
          <TourDialogHeader>Step 1</TourDialogHeader>
          <TourDialogBody>Content here</TourDialogBody>
        </TourDialog>
        {/* More steps */}
      </Tour>
    </>
  )
}
```

## Custom Styling

Fully customized appearance:

```tsx
import {
  Tour,
  TourDialog,
  TourDialogHeader,
  TourDialogBody,
  TourDialogFooter,
  TourNextButton,
  TourSpotlight,
} from 'chakra-ui3-tour'

function CustomStyledTour() {
  return (
    <Tour isActive={true}>
      <TourDialog
        data-target="[data-tour='step-1']"
        bg="purple.500"
        color="white"
        borderRadius="xl"
        boxShadow="2xl"
        borderWidth="2px"
        borderColor="purple.300"
      >
        <TourDialogHeader
          fontSize="2xl"
          fontWeight="bold"
          bg="purple.600"
          borderTopRadius="xl"
        >
          🎉 Welcome!
        </TourDialogHeader>
        
        <TourDialogBody fontSize="md" py={6}>
          This tour has custom styling!
        </TourDialogBody>
        
        <TourDialogFooter bg="purple.600" borderBottomRadius="xl">
          <TourNextButton
            bg="white"
            color="purple.600"
            _hover={{ bg: 'purple.50' }}
          >
            Continue
          </TourNextButton>
        </TourDialogFooter>
      </TourDialog>

      <TourSpotlight spacing={16} />
    </Tour>
  )
}
```

## Different Placements

Showcase all placement options:

```tsx
import { Tour, TourDialog, TourDialogHeader, TourDialogBody } from 'chakra-ui3-tour'

function PlacementExamples() {
  return (
    <Tour isActive={true}>
      <TourDialog data-target="[data-tour='top-element']" placement="top">
        <TourDialogHeader>Top Placement</TourDialogHeader>
        <TourDialogBody>This dialog appears above the target</TourDialogBody>
      </TourDialog>

      <TourDialog data-target="[data-tour='bottom-element']" placement="bottom">
        <TourDialogHeader>Bottom Placement</TourDialogHeader>
        <TourDialogBody>This dialog appears below the target</TourDialogBody>
      </TourDialog>

      <TourDialog data-target="[data-tour='left-element']" placement="left">
        <TourDialogHeader>Left Placement</TourDialogHeader>
        <TourDialogBody>This dialog appears to the left</TourDialogBody>
      </TourDialog>

      <TourDialog data-target="[data-tour='right-element']" placement="right">
        <TourDialogHeader>Right Placement</TourDialogHeader>
        <TourDialogBody>This dialog appears to the right</TourDialogBody>
      </TourDialog>

      <TourDialog data-target="[data-tour='auto-element']" placement="auto">
        <TourDialogHeader>Auto Placement</TourDialogHeader>
        <TourDialogBody>Automatically chooses the best position</TourDialogBody>
      </TourDialog>
    </Tour>
  )
}
```

## With Icons and Rich Content

Tour with enhanced content:

```tsx
import { Box, Text, List, Badge } from '@chakra-ui/react'
import {
  Tour,
  TourDialog,
  TourDialogHeader,
  TourDialogBody,
  TourDialogFooter,
  TourNextButton,
} from 'chakra-ui3-tour'

function RichContentTour() {
  return (
    <Tour isActive={true}>
      <TourDialog data-target="[data-tour='feature']">
        <TourDialogHeader>
          <HStack>
            <Text>✨ New Feature</Text>
            <Badge colorPalette="green">Beta</Badge>
          </HStack>
        </TourDialogHeader>
        
        <TourDialogBody>
          <Box>
            <Text mb={3}>This feature includes:</Text>
            <List.Root gap={2}>
              <List.Item>Fast processing</List.Item>
              <List.Item>Cloud sync</List.Item>
              <List.Item>Real-time updates</List.Item>
            </List.Root>
          </Box>
        </TourDialogBody>
        
        <TourDialogFooter>
          <TourNextButton>Try it now</TourNextButton>
        </TourDialogFooter>
      </TourDialog>
    </Tour>
  )
}
```

## Conditional Tours

Show tours based on conditions:

```tsx
import { useState, useEffect } from 'react'
import { Tour, TourDialog, TourDialogHeader, TourDialogBody } from 'chakra-ui3-tour'

function ConditionalTour() {
  const [showTour, setShowTour] = useState(false)

  useEffect(() => {
    // Show tour only for new users
    const hasSeenTour = localStorage.getItem('hasSeenTour')
    if (!hasSeenTour) {
      setShowTour(true)
    }
  }, [])

  const handleComplete = () => {
    setShowTour(false)
    localStorage.setItem('hasSeenTour', 'true')
  }

  return (
    <Tour isActive={showTour} onComplete={handleComplete}>
      <TourDialog data-target="[data-tour='welcome']">
        <TourDialogHeader>Welcome, new user! 👋</TourDialogHeader>
        <TourDialogBody>Let us show you around...</TourDialogBody>
      </TourDialog>
    </Tour>
  )
}
```

## Tour with LocalStorage

Persist tour progress:

```tsx
import { useState, useEffect } from 'react'
import { Tour, TourDialog, TourDialogHeader, TourDialogBody } from 'chakra-ui3-tour'

function PersistentTour() {
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const savedStep = localStorage.getItem('tourProgress')
    const hasCompleted = localStorage.getItem('tourCompleted')
    
    if (!hasCompleted) {
      setIsActive(true)
      if (savedStep) {
        setCurrentStep(parseInt(savedStep, 10))
      }
    }
  }, [])

  const handleDismiss = (stepIndex: number) => {
    localStorage.setItem('tourProgress', stepIndex.toString())
    setIsActive(false)
  }

  const handleComplete = () => {
    localStorage.setItem('tourCompleted', 'true')
    localStorage.removeItem('tourProgress')
    setIsActive(false)
  }

  return (
    <Tour
      isActive={isActive}
      initialStep={currentStep}
      onComplete={handleComplete}
      onDismiss={handleDismiss}
    >
      {/* Tour steps */}
    </Tour>
  )
}
```

## Onboarding Flow

Complete new user onboarding:

```tsx
import { useState } from 'react'
import { Button, Text } from '@chakra-ui/react'
import {
  Tour,
  TourDialog,
  TourDialogHeader,
  TourDialogBody,
  TourDialogFooter,
  TourDialogActions,
  TourNextButton,
  TourDismissButton,
  TourSpotlight,
} from 'chakra-ui3-tour'

function OnboardingTour() {
  const [isActive, setIsActive] = useState(true)

  return (
    <Tour
      isActive={isActive}
      onComplete={() => {
        setIsActive(false)
        // Track completion in analytics
        console.log('Onboarding completed')
      }}
    >
      <TourDialog data-target="[data-tour='dashboard']">
        <TourDialogHeader>Welcome to Your Dashboard 📊</TourDialogHeader>
        <TourDialogBody>
          This is your central hub. Here you'll find all your important metrics and quick actions.
        </TourDialogBody>
        <TourDialogFooter>
          <Text fontSize="sm">Step 1 of 5</Text>
          <TourDialogActions>
            <TourDismissButton>Skip tour</TourDismissButton>
            <TourNextButton>Show me around</TourNextButton>
          </TourDialogActions>
        </TourDialogFooter>
      </TourDialog>

      <TourDialog data-target="[data-tour='create-project']">
        <TourDialogHeader>Create Your First Project 🚀</TourDialogHeader>
        <TourDialogBody>
          Click here to start a new project. You can create unlimited projects!
        </TourDialogBody>
        <TourDialogFooter>
          <Text fontSize="sm">Step 2 of 5</Text>
          <TourDialogActions>
            <TourNextButton />
          </TourDialogActions>
        </TourDialogFooter>
      </TourDialog>

      {/* More onboarding steps */}

      <TourSpotlight spacing={12} />
    </Tour>
  )
}
```

## Feature Announcement

Announce new features to existing users:

```tsx
import { useState, useEffect } from 'react'
import { Text, Badge } from '@chakra-ui/react'
import {
  Tour,
  TourDialog,
  TourDialogHeader,
  TourDialogBody,
  TourDialogFooter,
  TourNextButton,
} from 'chakra-ui3-tour'

function FeatureAnnouncementTour() {
  const [showTour, setShowTour] = useState(false)

  useEffect(() => {
    const lastVersion = localStorage.getItem('lastSeenVersion')
    const currentVersion = '2.0.0'
    
    if (lastVersion !== currentVersion) {
      setShowTour(true)
    }
  }, [])

  const handleComplete = () => {
    setShowTour(false)
    localStorage.setItem('lastSeenVersion', '2.0.0')
  }

  return (
    <Tour isActive={showTour} onComplete={handleComplete}>
      <TourDialog data-target="[data-tour='new-feature']">
        <TourDialogHeader>
          <HStack>
            <Text>What's New</Text>
            <Badge colorPalette="blue">v2.0</Badge>
          </HStack>
        </TourDialogHeader>
        <TourDialogBody>
          We've added dark mode support! Toggle it from your settings.
        </TourDialogBody>
        <TourDialogFooter>
          <TourNextButton>Cool!</TourNextButton>
        </TourDialogFooter>
      </TourDialog>
    </Tour>
  )
}
```

## Settings Tour

Guide users through settings:

```tsx
import {
  Tour,
  TourDialog,
  TourDialogHeader,
  TourDialogBody,
  TourDialogFooter,
  TourDialogActions,
  TourNextButton,
  TourPrevButton,
} from 'chakra-ui3-tour'

function SettingsTour() {
  return (
    <Tour isActive={true}>
      <TourDialog data-target="[data-tour='profile-settings']" placement="right">
        <TourDialogHeader>Profile Settings ⚙️</TourDialogHeader>
        <TourDialogBody>
          Customize your profile picture, name, and bio here.
        </TourDialogBody>
        <TourDialogFooter>
          <TourDialogActions>
            <TourNextButton />
          </TourDialogActions>
        </TourDialogFooter>
      </TourDialog>

      <TourDialog data-target="[data-tour='notification-settings']" placement="right">
        <TourDialogHeader>Notifications 🔔</TourDialogHeader>
        <TourDialogBody>
          Control what notifications you receive and how often.
        </TourDialogBody>
        <TourDialogFooter>
          <TourDialogActions>
            <TourPrevButton />
            <TourNextButton />
          </TourDialogActions>
        </TourDialogFooter>
      </TourDialog>

      <TourDialog data-target="[data-tour='privacy-settings']" placement="right">
        <TourDialogHeader>Privacy & Security 🔒</TourDialogHeader>
        <TourDialogBody>
          Manage your privacy settings and security preferences.
        </TourDialogBody>
        <TourDialogFooter>
          <TourDialogActions>
            <TourPrevButton />
            <TourNextButton>Got it</TourNextButton>
          </TourDialogActions>
        </TourDialogFooter>
      </TourDialog>
    </Tour>
  )
}
```

## Best Practices

1. **Keep steps focused**: Each step should explain one feature
2. **Use clear language**: Avoid jargon
3. **Add visual hierarchy**: Use headers, icons, and badges
4. **Provide skip options**: Don't force users through tours
5. **Track completion**: Use analytics to improve tours
6. **Test on mobile**: Ensure tours work on all devices
7. **Don't show repeatedly**: Remember completion status
8. **Make it skippable**: Always provide a way out
9. **Use emojis sparingly**: They add personality but don't overdo it
10. **Test with real users**: Get feedback and iterate

## Tips

- Start tours on user action, not page load
- Save progress for multi-session tours
- Use conditional logic for personalized tours
- A/B test different tour flows
- Keep tour steps under 7 for best results
- Use placement that doesn't obscure important UI
- Consider mobile users when designing tours