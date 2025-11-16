/**
 * Layout Style Utilities
 * Common layout patterns and container styles
 */

// Screen container (full height with padding)
export const screenContainerStyles = 'min-h-screen flex flex-col px-4 py-8 relative';

// Centered content container
export const centeredContainerStyles = 'flex flex-col items-center justify-center min-h-screen px-4';

// Card grid layout
export const cardGridStyles = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4';

// Horizontal flex layout with gap
export const flexRowStyles = 'flex flex-row items-center gap-4';

// Vertical flex layout with gap
export const flexColStyles = 'flex flex-col gap-4';

// Space between layout
export const spaceBetweenStyles = 'flex items-center justify-between';

// Pixel panel/container styles
export const pixelPanelStyles = 'border-pixel-thick border-white shadow-pixel-large bg-[rgba(45,27,61,0.9)] p-6';

// Pixel panel with glow
export const pixelPanelGlowStyles = 'border-pixel-thick border-white shadow-pixel-large bg-[rgba(45,27,61,0.9)] p-6 shadow-[0_0_20px_rgba(255,255,255,0.1)]';

// Modal overlay
export const modalOverlayStyles = 'fixed inset-0 bg-black/80 flex items-center justify-center z-[500]';

// Modal content
export const modalContentStyles = 'border-pixel-thick border-white shadow-pixel-large bg-[#2d1b3d] p-8 max-w-2xl w-full mx-4';

// Header bar
export const headerBarStyles = 'flex items-center justify-between px-6 py-4 border-b-pixel-thick border-white bg-[rgba(26,15,36,0.9)]';

// Stat display (chips, energy, stars)
export const statDisplayStyles = 'flex items-center gap-2 px-3 py-2 border-pixel border-white bg-black/60 shadow-pixel';

// Progress bar container
export const progressBarStyles = 'w-full h-6 border-pixel border-white bg-black/60 shadow-pixel overflow-hidden';

// Scrollable area
export const scrollableAreaStyles = 'overflow-y-auto max-h-[70vh] pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent';

// Absolute positioning helpers
export const absoluteTopLeft = 'absolute top-0 left-0';
export const absoluteTopRight = 'absolute top-0 right-0';
export const absoluteBottomLeft = 'absolute bottom-0 left-0';
export const absoluteBottomRight = 'absolute bottom-0 right-0';
export const absoluteCenter = 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';

// Z-index layers
export const zIndex = {
  background: 'z-0',
  content: 'z-10',
  card: 'z-20',
  cardDragging: 'z-50',
  hud: 'z-[100]',
  modal: 'z-[500]',
  scanline: 'z-[1000]',
  tooltip: 'z-[1100]',
} as const;
