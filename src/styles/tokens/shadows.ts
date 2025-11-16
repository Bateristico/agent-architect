/**
 * Shadow Design Tokens
 * Consolidates 16+ duplicate shadow definitions
 * All shadows use hard edges (no blur) for pixel art aesthetic
 */

import { colors } from './colors';

export const shadows = {
  // Box shadows (hard edges, no blur)
  pixel: `4px 4px 0px 0px ${colors.shadow}`,
  pixelHover: `6px 6px 0px 0px ${colors.shadow}`,
  pixelLarge: `8px 8px 0px 0px ${colors.shadow}`,
  pixelXLarge: `10px 10px 0px 0px ${colors.shadow}`,

  // Small shadows
  pixelSmall: `2px 2px 0px 0px ${colors.shadow}`,
  pixelXSmall: `3px 3px 0px 0px ${colors.shadow}`,

  // Text shadows
  text: `2px 2px 0px ${colors.shadow}`,
  textThick: `4px 4px 0px ${colors.shadow}`,

  // Drop shadows (for SVG/images)
  dropPixel: `2px 2px 0px ${colors.shadow}`,
  dropPixelThick: `4px 4px 0px ${colors.shadow}`,

  // No shadow
  none: 'none',
} as const;

// Glow effects (with blur for luminance)
export const glows = {
  context: `0 0 20px ${colors.card.context.light}, 0 0 40px ${colors.card.context.light}`,
  model: `0 0 20px ${colors.card.model.light}, 0 0 40px ${colors.card.model.light}`,
  tool: `0 0 20px ${colors.card.tool.light}, 0 0 40px ${colors.card.tool.light}`,
  framework: `0 0 20px ${colors.card.framework.light}, 0 0 40px ${colors.card.framework.light}`,
  guardrail: `0 0 20px ${colors.card.guardrail.light}, 0 0 40px ${colors.card.guardrail.light}`,
  generic: `0 0 20px currentColor, 0 0 40px currentColor`,
} as const;

// Combined shadow + glow effects
export const shadowGlow = {
  context: `${shadows.pixel}, 0 0 20px rgba(${colors.rgb.context}, 0.3)`,
  model: `${shadows.pixel}, 0 0 20px rgba(${colors.rgb.model}, 0.3)`,
  tool: `${shadows.pixel}, 0 0 20px rgba(${colors.rgb.tool}, 0.3)`,
  framework: `${shadows.pixel}, 0 0 20px rgba(${colors.rgb.framework}, 0.3)`,
  guardrail: `${shadows.pixel}, 0 0 20px rgba(${colors.rgb.guardrail}, 0.3)`,
} as const;

// Helper function to get shadow
export const getShadow = (size: keyof typeof shadows = 'pixel'): string => {
  return shadows[size];
};

// Helper function to get glow
export const getGlow = (type: keyof typeof glows): string => {
  return glows[type];
};

// Helper function to get combined shadow + glow
export const getShadowGlow = (type: keyof typeof shadowGlow): string => {
  return shadowGlow[type];
};
