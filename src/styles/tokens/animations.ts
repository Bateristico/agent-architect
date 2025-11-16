/**
 * Animation Design Tokens
 * Animation timing, easing functions, and durations
 * Snappy & juicy like Balatro
 */

export const duration = {
  instant: '0ms',
  fast: '100ms',       // Hover effects
  normal: '200ms',     // Drag operations, reveals
  slow: '300ms',       // Card placement
  slower: '600ms',     // Score animations
} as const;

export const easing = {
  easeOut: 'ease-out',
  easeIn: 'ease-in',
  easeInOut: 'ease-in-out',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  pop: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  linear: 'linear',
} as const;

// Semantic animation configs
export const animations = {
  hover: {
    duration: duration.fast,
    easing: easing.easeOut,
  },
  tap: {
    duration: '80ms',
    easing: easing.easeIn,
  },
  drag: {
    duration: duration.normal,
    easing: easing.easeOut,
  },
  placement: {
    duration: duration.slow,
    easing: easing.bounce,
  },
  reveal: {
    duration: duration.normal,
    easing: easing.easeOut,
  },
  score: {
    duration: duration.slower,
    easing: easing.bounce,
  },
} as const;

// Transform values for animations
export const transforms = {
  hover: {
    scale: 1.08,
    rotate: '2deg',
    translateY: '-10px',
  },
  tap: {
    scale: 0.95,
  },
  shake: {
    translateX: '5px',
  },
} as const;
