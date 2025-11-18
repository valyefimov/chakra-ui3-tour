import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
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
} from '../index';

const TestProvider = ({ children }: { children: React.ReactNode }) => (
  <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
);

describe('Tour', () => {
  it('should render tour when isActive is true', () => {
    render(
      <TestProvider>
        <div data-tour="step-1">Target Element</div>
        <Tour isActive={true}>
          <TourDialog data-target="[data-tour='step-1']">
            <TourDialogHeader>Step 1</TourDialogHeader>
            <TourDialogBody>This is step 1</TourDialogBody>
          </TourDialog>
        </Tour>
      </TestProvider>,
    );

    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('This is step 1')).toBeInTheDocument();
  });

  it('should not render tour when isActive is false', () => {
    render(
      <TestProvider>
        <div data-tour="step-1">Target Element</div>
        <Tour isActive={false}>
          <TourDialog data-target="[data-tour='step-1']">
            <TourDialogHeader>Step 1</TourDialogHeader>
            <TourDialogBody>This is step 1</TourDialogBody>
          </TourDialog>
        </Tour>
      </TestProvider>,
    );

    expect(screen.queryByText('Step 1')).not.toBeInTheDocument();
  });

  it('should show first step by default', () => {
    render(
      <TestProvider>
        <div data-tour="step-1">Target 1</div>
        <div data-tour="step-2">Target 2</div>
        <Tour isActive={true}>
          <TourDialog data-target="[data-tour='step-1']">
            <TourDialogHeader>Step 1</TourDialogHeader>
          </TourDialog>
          <TourDialog data-target="[data-tour='step-2']">
            <TourDialogHeader>Step 2</TourDialogHeader>
          </TourDialog>
        </Tour>
      </TestProvider>,
    );

    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.queryByText('Step 2')).not.toBeInTheDocument();
  });

  it('should navigate to next step when next button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <TestProvider>
        <div data-tour="step-1">Target 1</div>
        <div data-tour="step-2">Target 2</div>
        <Tour isActive={true}>
          <TourDialog data-target="[data-tour='step-1']">
            <TourDialogHeader>Step 1</TourDialogHeader>
            <TourDialogFooter>
              <TourDialogActions>
                <TourNextButton />
              </TourDialogActions>
            </TourDialogFooter>
          </TourDialog>
          <TourDialog data-target="[data-tour='step-2']">
            <TourDialogHeader>Step 2</TourDialogHeader>
          </TourDialog>
        </Tour>
      </TestProvider>,
    );

    expect(screen.getByText('Step 1')).toBeInTheDocument();

    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText('Step 2')).toBeInTheDocument();
    });
    expect(screen.queryByText('Step 1')).not.toBeInTheDocument();
  });

  it('should navigate to previous step when prev button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <TestProvider>
        <div data-tour="step-1">Target 1</div>
        <div data-tour="step-2">Target 2</div>
        <Tour isActive={true} initialStep={1}>
          <TourDialog data-target="[data-tour='step-1']">
            <TourDialogHeader>Step 1</TourDialogHeader>
          </TourDialog>
          <TourDialog data-target="[data-tour='step-2']">
            <TourDialogHeader>Step 2</TourDialogHeader>
            <TourDialogFooter>
              <TourDialogActions>
                <TourPrevButton />
              </TourDialogActions>
            </TourDialogFooter>
          </TourDialog>
        </Tour>
      </TestProvider>,
    );

    expect(screen.getByText('Step 2')).toBeInTheDocument();

    const prevButton = screen.getByRole('button', { name: /previous/i });
    await user.click(prevButton);

    await waitFor(() => {
      expect(screen.getByText('Step 1')).toBeInTheDocument();
    });
    expect(screen.queryByText('Step 2')).not.toBeInTheDocument();
  });

  it('should call onComplete when completing the last step', async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();

    render(
      <TestProvider>
        <div data-tour="step-1">Target 1</div>
        <div data-tour="step-2">Target 2</div>
        <Tour isActive={true} onComplete={onComplete}>
          <TourDialog data-target="[data-tour='step-1']">
            <TourDialogHeader>Step 1</TourDialogHeader>
            <TourDialogFooter>
              <TourDialogActions>
                <TourNextButton />
              </TourDialogActions>
            </TourDialogFooter>
          </TourDialog>
          <TourDialog data-target="[data-tour='step-2']">
            <TourDialogHeader>Step 2</TourDialogHeader>
            <TourDialogFooter>
              <TourDialogActions>
                <TourNextButton />
              </TourDialogActions>
            </TourDialogFooter>
          </TourDialog>
        </Tour>
      </TestProvider>,
    );

    const nextButton1 = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton1);

    await waitFor(() => {
      expect(screen.getByText('Step 2')).toBeInTheDocument();
    });

    const nextButton2 = screen.getByRole('button', { name: /finish/i });
    await user.click(nextButton2);

    await waitFor(() => {
      expect(onComplete).toHaveBeenCalledTimes(1);
    });
  });

  it('should call onDismiss when dismiss button is clicked', async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();

    render(
      <TestProvider>
        <div data-tour="step-1">Target 1</div>
        <Tour isActive={true} onDismiss={onDismiss}>
          <TourDialog data-target="[data-tour='step-1']">
            <TourDialogHeader>Step 1</TourDialogHeader>
            <TourDialogFooter>
              <TourDialogActions>
                <TourDismissButton />
              </TourDialogActions>
            </TourDialogFooter>
          </TourDialog>
        </Tour>
      </TestProvider>,
    );

    const dismissButton = screen.getByRole('button', { name: /skip/i });
    await user.click(dismissButton);

    await waitFor(() => {
      expect(onDismiss).toHaveBeenCalledWith(0);
    });
  });

  it('should close tour when close button is clicked', async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();

    render(
      <TestProvider>
        <div data-tour="step-1">Target 1</div>
        <Tour isActive={true} onDismiss={onDismiss}>
          <TourDialog data-target="[data-tour='step-1']">
            <TourDialogCloseButton />
            <TourDialogHeader>Step 1</TourDialogHeader>
          </TourDialog>
        </Tour>
      </TestProvider>,
    );

    const closeButton = screen.getByRole('button', { name: /close tour/i });
    await user.click(closeButton);

    await waitFor(() => {
      expect(onDismiss).toHaveBeenCalledWith(0);
    });
  });

  it('should render spotlight when TourSpotlight is included', () => {
    render(
      <TestProvider>
        <div data-tour="step-1">Target Element</div>
        <Tour isActive={true}>
          <TourDialog data-target="[data-tour='step-1']">
            <TourDialogHeader>Step 1</TourDialogHeader>
          </TourDialog>
          <TourSpotlight />
        </Tour>
      </TestProvider>,
    );

    // Spotlight renders an SVG
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should start from initialStep', () => {
    render(
      <TestProvider>
        <div data-tour="step-1">Target 1</div>
        <div data-tour="step-2">Target 2</div>
        <Tour isActive={true} initialStep={1}>
          <TourDialog data-target="[data-tour='step-1']">
            <TourDialogHeader>Step 1</TourDialogHeader>
          </TourDialog>
          <TourDialog data-target="[data-tour='step-2']">
            <TourDialogHeader>Step 2</TourDialogHeader>
          </TourDialog>
        </Tour>
      </TestProvider>,
    );

    expect(screen.queryByText('Step 1')).not.toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
  });

  it('should disable previous button on first step', () => {
    render(
      <TestProvider>
        <div data-tour="step-1">Target 1</div>
        <Tour isActive={true}>
          <TourDialog data-target="[data-tour='step-1']">
            <TourDialogHeader>Step 1</TourDialogHeader>
            <TourDialogFooter>
              <TourDialogActions>
                <TourPrevButton />
              </TourDialogActions>
            </TourDialogFooter>
          </TourDialog>
        </Tour>
      </TestProvider>,
    );

    const prevButton = screen.getByRole('button', { name: /previous/i });
    expect(prevButton).toBeDisabled();
  });

  it('should change next button text to "Finish" on last step', () => {
    render(
      <TestProvider>
        <div data-tour="step-1">Target 1</div>
        <Tour isActive={true}>
          <TourDialog data-target="[data-tour='step-1']">
            <TourDialogHeader>Step 1</TourDialogHeader>
            <TourDialogFooter>
              <TourDialogActions>
                <TourNextButton />
              </TourDialogActions>
            </TourDialogFooter>
          </TourDialog>
        </Tour>
      </TestProvider>,
    );

    const finishButton = screen.getByRole('button', { name: /finish/i });
    expect(finishButton).toBeInTheDocument();
  });

  it('should work in uncontrolled mode with defaultIsActive', () => {
    render(
      <TestProvider>
        <div data-tour="step-1">Target 1</div>
        <Tour defaultIsActive={true}>
          <TourDialog data-target="[data-tour='step-1']">
            <TourDialogHeader>Step 1</TourDialogHeader>
          </TourDialog>
        </Tour>
      </TestProvider>,
    );

    expect(screen.getByText('Step 1')).toBeInTheDocument();
  });
});
