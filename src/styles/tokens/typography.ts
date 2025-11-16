/**
 * Typography Design Tokens
 * Font families, sizes, weights, and line heights
 */

export const fontFamily = {
  pixel: "'Press Start 2P', monospace",
  pixelAlt: "'Silkscreen', monospace",
  mono: 'monospace',
} as const;

export const fontSize = {
  xs: '0.625rem',   // 10px - Small UI elements
  sm: '0.75rem',    // 12px - Card content
  base: '0.875rem', // 14px - Body text
  lg: '1rem',       // 16px - Subsections
  xl: '1.5rem',     // 24px - Section headings
  '2xl': '2rem',    // 32px - Page titles
  '3xl': '3rem',    // 48px - Large, impactful (logo)
} as const;

export const fontWeight = {
  normal: '400',
  bold: '700',
} as const;

export const lineHeight = {
  tight: '1.2',
  normal: '1.4',
  relaxed: '1.6',
} as const;

// Semantic font size mappings
export const semanticFontSize = {
  logo: fontSize['3xl'],
  title: fontSize['2xl'],
  heading: fontSize.xl,
  subheading: fontSize.lg,
  body: fontSize.base,
  card: fontSize.sm,
  small: fontSize.xs,
} as const;
