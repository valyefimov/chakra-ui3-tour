import { useSlotRecipe } from '@chakra-ui/react';
import { useContext, useMemo } from 'react';
import { TourSizeContext, TourVariantContext } from './tour-context';
import { mergeSlotStyles } from './tour-styles';

export function useTourStyles(options?: { size?: string; variant?: string }) {
  const recipe = useSlotRecipe({ key: 'Tour' });

  const themeStyles = useMemo(() => {
    if (!recipe || typeof recipe !== 'function') return {};
    try {
      return recipe(options) || {};
    } catch {
      return {};
    }
  }, [recipe, options]);

  const styles = useMemo(() => mergeSlotStyles(themeStyles), [themeStyles]);

  return styles;
}

export function useTourSize(): string | undefined {
  const context = useContext(TourSizeContext);

  if (!context) {
    throw new Error('useTourSize must be used within a TourDialog');
  }

  return context;
}

export function useTourVariant(): string | undefined {
  const context = useContext(TourVariantContext);

  if (!context) {
    throw new Error('useTourVariant must be used within a TourDialog');
  }

  return context;
}
