/**
 * Card Style Utilities
 * Reusable style compositions for card components
 */

import { tokens, getCardColor, getCardGradient } from '../tokens';
import type { CardColorType } from '../tokens';

// Base card styles (Tailwind class names)
export const baseCardStyles = 'font-pixel text-sm font-bold uppercase border-pixel border-white shadow-pixel transition-all duration-fast';

// Card hover animation classes
export const cardHoverStyles = 'hover:shadow-pixel-hover hover:scale-105 hover:-translate-y-1 hover:rotate-1';

// Card type-specific gradient background (inline style)
export const getCardBackgroundStyle = (type: CardColorType) => ({
  background: getCardGradient(type),
});

// Card type-specific border color (inline style)
export const getCardBorderStyle = (type: CardColorType) => ({
  borderColor: getCardColor(type, 'light'),
});

// Card glow effect for hover state (inline style)
export const getCardGlowStyle = (type: CardColorType) => ({
  boxShadow: `0 0 20px ${getCardColor(type, 'light')}, 0 0 40px ${getCardColor(type, 'light')}`,
});

// Combine card styles for a specific type
export const getCardTypeStyles = (type: CardColorType) => ({
  className: `${baseCardStyles} ${cardHoverStyles}`,
  style: {
    ...getCardBackgroundStyle(type),
    ...getCardBorderStyle(type),
  },
});

// Dragging card styles
export const draggingCardStyles = 'opacity-50 cursor-grabbing scale-110 rotate-3';

// Card in hand styles
export const cardInHandStyles = 'cursor-grab active:cursor-grabbing';

// Disabled card styles
export const disabledCardStyles = 'opacity-50 cursor-not-allowed grayscale';

// Card shake animation (for insufficient energy)
export const shakeCardStyles = 'animate-shake';

// Card placement animation
export const cardPlaceStyles = 'animate-card-place';

// Card slot empty state
export const emptySlotStyles = 'border-dashed border-white/30 bg-transparent';

// Card slot filled state
export const filledSlotStyles = 'border-solid';

// Get slot gradient background
export const getSlotGradientStyle = (type: CardColorType) => ({
  background: getCardGradient(type),
  boxShadow: `0 0 20px rgba(${tokens.colors.rgb[type]}, 0.3), ${tokens.shadows.pixel}`,
});

// Energy cost badge styles
export const energyCostStyles = 'absolute top-2 right-2 w-8 h-8 rounded-full bg-black/80 border-2 border-white flex items-center justify-center text-xs font-bold';

// Card icon glow
export const cardIconGlowStyles = 'filter drop-shadow-[0_0_8px_currentColor]';
