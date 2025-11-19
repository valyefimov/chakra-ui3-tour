import {
  Children,
  ReactElement,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useControllableState } from '@chakra-ui/react-use-controllable-state'
import { TourProvider } from './tour-context'
import { TourContextValue, TourProps, TourStepAPI } from './tour.types'

export function Tour(props: TourProps) {
  const {
    children,
    isActive: isActiveProp,
    defaultIsActive = false,
    initialStep = 0,
    onComplete,
    onDismiss,
    tourRef,
  } = props

  const [isActive, setIsActive] = useControllableState({
    value: isActiveProp,
    defaultValue: defaultIsActive,
  })

  const [currentStep, setCurrentStep] = useState(initialStep)
  const [isCompleted, setIsCompleted] = useState(false)
  const [steps, setSteps] = useState<Map<number, string>>(new Map())
  const targetRef = useRef<HTMLElement | null>(null)

  // Count total steps from children
  const stepChildren = Children.toArray(children).filter(
    (child: any) => child.type?.displayName !== 'TourSpotlight'
  );
  const totalSteps = stepChildren.length;

  // Update target element when step changes
  useEffect(() => {
    if (!isActive) {
      targetRef.current = null
      return
    }

    const targetSelector = steps.get(currentStep)
    if (targetSelector) {
      const element = document.querySelector<HTMLElement>(targetSelector)
      targetRef.current = element
    } else {
      targetRef.current = null
    }
  }, [currentStep, isActive, steps])

  const registerStep = useCallback((index: number, target: string) => {
    setSteps((prev) => {
      const next = new Map(prev)
      next.set(index, target)
      return next
    })
  }, [])

  const unregisterStep = useCallback((index: number) => {
    setSteps((prev) => {
      const next = new Map(prev)
      next.delete(index)
      return next
    })
  }, [])

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      // Last step - complete the tour
      setIsCompleted(true)
      setIsActive(false)
      onComplete?.()
    }
  }, [currentStep, totalSteps, onComplete, setIsActive])

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }, [currentStep])

  const goToStep = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalSteps) {
        setCurrentStep(index)
      }
    },
    [totalSteps]
  )

  const dismiss = useCallback(() => {
    setIsActive(false)
    onDismiss?.(currentStep)
  }, [currentStep, onDismiss, setIsActive])

  const complete = useCallback(() => {
    setIsCompleted(true)
    setIsActive(false)
    onComplete?.()
  }, [onComplete, setIsActive])

  const start = useCallback(() => {
    setCurrentStep(initialStep)
    setIsCompleted(false)
    setIsActive(true)
  }, [initialStep, setIsActive])

  const targetSelector = useMemo(() => steps.get(currentStep) || null, [steps, currentStep])

  // Expose API via ref
  const api: TourStepAPI = useMemo(
    () => {
      return ({
        isActive: isActive ?? false,
        isCompleted,
        currentStep,
        totalSteps,
        targetElement: targetSelector ? document.querySelector<HTMLElement>(targetSelector) : null,
        targetRef,
        nextStep,
        prevStep,
        goToStep,
        dismiss,
        complete,
        start,
      });
    },
    [
      isActive,
      isCompleted,
      currentStep,
      totalSteps,
      nextStep,
      prevStep,
      goToStep,
      dismiss,
      complete,
      start,
      targetSelector,
    ]
  )

  useImperativeHandle(tourRef, () => api, [api])

  const contextValue: TourContextValue = useMemo(
    () => ({
      ...api,
      registerStep,
      unregisterStep,
    }),
    [api, registerStep, unregisterStep]
  )

  // Clone children and pass step index
  const childrenWithProps = Children.map(children, (child, index) => {
    if (!child || typeof child !== 'object') return child

    return (child as ReactElement<any>).type
      ? {
          ...child,
          props: {
            ...((child as ReactElement).props || {}),
            _tourStepIndex: index,
            _isCurrent: index === currentStep && isActive,
          },
        }
      : child
  })

  return <TourProvider value={contextValue}>{childrenWithProps}</TourProvider>
}

Tour.displayName = 'Tour'
