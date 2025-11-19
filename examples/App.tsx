import {
  Box,
  Button,
  Card,
  Heading,
  HStack,
  IconButton,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import {
  Tour,
  TourDialog,
  TourDialogActions,
  TourDialogBody,
  TourDialogCloseButton,
  TourDialogFooter,
  TourDialogHeader,
  TourDismissButton,
  TourNextButton,
  TourPrevButton,
  TourSpotlight,
} from '../src/tour';

// Simple icons
const UserIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const TagIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

const LockIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const SettingsIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 6v6m6-12h-6m6 6h-6m6 6h-6M1 12h6" />
  </svg>
);

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  console.log(
    {
      isOpen,
    },
    '---------',
  );

  return (
    <Box minH="100vh" bg="gray.50" p={8}>
      <VStack gap={8} maxW="4xl" mx="auto">
        <Box textAlign="center">
          <Heading size="2xl" mb={2}>
            Chakra UI Tour Component
          </Heading>
          <Text color="gray.600" fontSize="lg">
            A multi-step tour library for introducing features to your users
          </Text>
        </Box>

        <Card.Root padding={8} width="full">
          <Stack gap={8} alignItems="center">
            <Heading size="lg">User Management Dashboard</Heading>

            <HStack gap={4}>
              <Button data-tour="add-users" colorPalette="blue">
                <UserIcon />
                Add User
              </Button>
              <IconButton data-tour="tag-users" aria-label="Tag users" colorPalette="purple">
                <TagIcon />
              </IconButton>
              <IconButton data-tour="lock-users" aria-label="Lock users" colorPalette="red">
                <LockIcon />
              </IconButton>
              <IconButton data-tour="settings" aria-label="Settings" variant="outline">
                <SettingsIcon />
              </IconButton>
            </HStack>

            <Button onClick={() => setIsOpen(true)} colorPalette="green" size="lg">
              Start Interactive Tour
            </Button>

            <Box
              padding={4}
              bg="blue.50"
              borderRadius="md"
              borderLeftWidth="4px"
              borderColor="blue.500"
            >
              <Text fontSize="sm" color="blue.900">
                💡 Click "Start Interactive Tour" to see the component in action!
              </Text>
            </Box>
          </Stack>
        </Card.Root>

        <Card.Root padding={6} width="full">
          <Heading size="md" marginBottom={4}>
            Features
          </Heading>
          <Stack gap={3}>
            <HStack>
              <Text fontWeight="bold" color="green.500">
                ✓
              </Text>
              <Text>Multi-step guided tours</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold" color="green.500">
                ✓
              </Text>
              <Text>Spotlight highlighting with overlay</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold" color="green.500">
                ✓
              </Text>
              <Text>Automatic positioning relative to target elements</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold" color="green.500">
                ✓
              </Text>
              <Text>Fully themeable with Chakra UI</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold" color="green.500">
                ✓
              </Text>
              <Text>TypeScript support</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold" color="green.500">
                ✓
              </Text>
              <Text>Controlled and uncontrolled modes</Text>
            </HStack>
          </Stack>
        </Card.Root>
      </VStack>

      <Tour
        isActive={isOpen}
        onComplete={() => setIsOpen(false)}
        onDismiss={() => setIsOpen(false)}
      >
        <TourDialog data-target="[data-tour=add-users]" placement="bottom">
          <TourDialogCloseButton />
          <TourDialogHeader>Welcome to the Tour! 👋</TourDialogHeader>
          <TourDialogBody>
            This is the "Add User" button. Click here to add new users to your system. Let's explore
            the other features!
          </TourDialogBody>
          <TourDialogFooter>
            <Text fontSize="sm" color="gray.500">
              Step 1 of 4
            </Text>
            <TourDialogActions>
              <TourDismissButton />
              <TourNextButton>Next</TourNextButton>
            </TourDialogActions>
          </TourDialogFooter>
        </TourDialog>

        <TourDialog data-target="[data-tour=tag-users]" placement="bottom">
          <TourDialogCloseButton />
          <TourDialogHeader>Tag Users 🏷️</TourDialogHeader>
          <TourDialogBody>
            Use this button to organize users with tags. You can create custom tags and assign them
            to multiple users at once.
          </TourDialogBody>
          <TourDialogFooter>
            <Text fontSize="sm" color="gray.500">
              Step 2 of 4
            </Text>
            <TourDialogActions>
              <TourPrevButton />
              <TourNextButton>Continue</TourNextButton>
            </TourDialogActions>
          </TourDialogFooter>
        </TourDialog>

        <TourDialog data-target="[data-tour=lock-users]" placement="bottom">
          <TourDialogCloseButton />
          <TourDialogHeader>Lock Users 🔒</TourDialogHeader>
          <TourDialogBody>
            Need to temporarily disable user accounts? Use the lock button to prevent users from
            accessing the system without deleting their data.
          </TourDialogBody>
          <TourDialogFooter>
            <Text fontSize="sm" color="gray.500">
              Step 3 of 4
            </Text>
            <TourDialogActions>
              <TourPrevButton />
              <TourNextButton>Almost done</TourNextButton>
            </TourDialogActions>
          </TourDialogFooter>
        </TourDialog>

        <TourDialog data-target="[data-tour=settings]" placement="left">
          <TourDialogCloseButton />
          <TourDialogHeader>Settings ⚙️</TourDialogHeader>
          <TourDialogBody>
            Finally, access advanced settings here. You can customize user permissions, notification
            preferences, and more.
          </TourDialogBody>
          <TourDialogFooter>
            <Text fontSize="sm" color="gray.500">
              Step 4 of 4
            </Text>
            <TourDialogActions>
              <TourPrevButton />
              <TourNextButton>Finish Tour</TourNextButton>
            </TourDialogActions>
          </TourDialogFooter>
        </TourDialog>

        <TourSpotlight spacing={12} />
      </Tour>
    </Box>
  );
}
