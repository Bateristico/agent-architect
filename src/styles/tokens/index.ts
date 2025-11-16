/**
 * Design Tokens - Central Export
 * Single source of truth for all design values
 */

export * from './colors';
export * from './spacing';
export * from './typography';
export * from './shadows';
export * from './animations';

// Re-export organized tokens object
import { colors } from './colors';
import { spacing, borderWidth, borderRadius, cardSize, slotSize } from './spacing';
import { fontFamily, fontSize, fontWeight, lineHeight, semanticFontSize } from './typography';
import { shadows, glows, shadowGlow } from './shadows';
import { duration, easing, animations, transforms } from './animations';

export const tokens = {
  colors,
  spacing,
  borderWidth,
  borderRadius,
  cardSize,
  slotSize,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  semanticFontSize,
  shadows,
  glows,
  shadowGlow,
  duration,
  easing,
  animations,
  transforms,
} as const;

export type Tokens = typeof tokens;
