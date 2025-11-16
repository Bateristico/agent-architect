/**
 * Button Style Utilities
 * Reusable button variants and compositions
 */

// Base button styles (Tailwind class names)
export const baseButtonStyles = 'font-pixel text-sm font-bold uppercase border-pixel-thick border-white shadow-pixel transition-all duration-fast px-6 py-3';

// Button hover animation
export const buttonHoverStyles = 'hover:shadow-pixel-hover hover:scale-105 active:scale-95';

// Button variants (background colors)
export const buttonVariants = {
  primary: 'bg-[#ff00ff] text-white',
  success: 'bg-[#00ff88] text-black',
  warning: 'bg-[#ffaa00] text-black',
  error: 'bg-[#ff3366] text-white',
  secondary: 'bg-[#4a2859] text-white',
} as const;

// Disabled button styles
export const disabledButtonStyles = 'opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-pixel';

// Get complete button class name
export const getButtonClassName = (
  variant: keyof typeof buttonVariants = 'primary',
  disabled = false
) => {
  const variantClass = buttonVariants[variant];
  const disabledClass = disabled ? disabledButtonStyles : buttonHoverStyles;
  return `${baseButtonStyles} ${variantClass} ${disabledClass}`;
};

// Menu button styles (larger, more prominent)
export const menuButtonStyles = 'font-pixel text-base font-bold uppercase border-pixel-thick border-white shadow-pixel-large px-8 py-4';

// Small button styles (compact)
export const smallButtonStyles = 'font-pixel text-xs font-bold uppercase border-pixel border-white shadow-pixel-small px-4 py-2';

// Icon button styles (square)
export const iconButtonStyles = 'font-pixel text-sm font-bold uppercase border-pixel border-white shadow-pixel p-3 w-12 h-12 flex items-center justify-center';

// Back button with arrow
export const backButtonStyles = 'flex items-center gap-2 font-pixel text-sm font-bold uppercase border-pixel border-white shadow-pixel px-4 py-2';

// Glow button variants (with glow effect)
export const glowButtonStyles = {
  primary: 'shadow-[0_0_20px_#ff00ff,0_0_40px_#ff00ff]',
  success: 'shadow-[0_0_20px_#00ff88,0_0_40px_#00ff88]',
  warning: 'shadow-[0_0_20px_#ffaa00,0_0_40px_#ffaa00]',
  error: 'shadow-[0_0_20px_#ff3366,0_0_40px_#ff3366]',
} as const;
