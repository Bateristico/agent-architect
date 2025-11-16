/**
 * Spacing Design Tokens
 * Consistent spacing scale, border widths, and sizing values
 */

export const spacing = {
  // Spacing scale (rem-based for scalability)
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
  '4xl': '6rem',    // 96px
} as const;

export const borderWidth = {
  pixel: '3px',       // Standard pixel border
  pixelThick: '4px',  // Thick pixel border
  none: '0px',
} as const;

export const borderRadius = {
  none: '0px',        // Pixel art uses sharp corners
  pixel: '2px',       // Minimal rounding for pixel style
} as const;

// Card dimensions (fixed for pixel art aesthetic)
export const cardSize = {
  width: '120px',
  height: '160px',
  widthLarge: '140px',
  heightLarge: '200px',
} as const;

// Board slot dimensions
export const slotSize = {
  width: '140px',
  height: '200px',
} as const;
