/**
 * Color Design Tokens
 * Single source of truth for all color values in the application
 * Consolidates colors from tailwind.config.js, theme.css, and inline styles
 */

export const colors = {
  // Background colors - Balatro-inspired deep purples
  background: {
    primary: '#2d1b3d',     // Deep purple-black (Balatro's felt table)
    secondary: '#1a0f24',   // Darker purple for depth
    accent: '#4a2859',      // Rich purple highlight
  },

  // Card type colors - vibrant and saturated
  card: {
    context: {
      light: '#00d9ff',     // Bright neon cyan
      dark: '#0088cc',      // Deep teal
    },
    model: {
      light: '#ff00ff',     // Vibrant magenta
      dark: '#9933ff',      // Deep purple
    },
    tool: {
      light: '#ffaa00',     // Warm arcade orange
      dark: '#ff6600',      // Deep orange
    },
    framework: {
      light: '#ff1493',     // Hot pink
      dark: '#ff69b4',      // Salmon pink
    },
    guardrail: {
      light: '#00ff88',     // Neon green
      dark: '#00cc44',      // Deep green
    },
  },

  // Text colors
  text: {
    primary: '#ffffff',     // Pure white for readability
    secondary: '#d4a5f5',   // Soft lavender
  },

  // Effect colors
  effect: {
    glow: '#ff00ff',        // Bright magenta glow
    success: '#00ff88',     // Neon green
    error: '#ff3366',       // Hot pink-red
    hover: '#ffff00',       // Yellow
    selection: '#ffffff',   // White
  },

  // UI element colors
  border: '#ffffff',        // White borders
  shadow: '#000000',        // Hard black shadows

  // RGB values for glows and rgba usage
  rgb: {
    context: '0, 217, 255',
    model: '255, 0, 255',
    tool: '255, 170, 0',
    framework: '255, 20, 147',
    guardrail: '0, 255, 136',
  },
} as const;

// Type helper for card types
export type CardColorType = keyof typeof colors.card;

// Helper function to get card color
export const getCardColor = (
  type: CardColorType,
  variant: 'light' | 'dark' = 'light'
): string => {
  return colors.card[type][variant];
};

// Helper function to get card gradient
export const getCardGradient = (type: CardColorType): string => {
  const { light, dark } = colors.card[type];
  return `linear-gradient(135deg, ${dark} 0%, ${light} 100%)`;
};

// Helper function to get card glow color
export const getCardGlow = (type: CardColorType): string => {
  return colors.card[type].light;
};

// Helper function to get RGB values for rgba usage
export const getCardRgb = (type: CardColorType): string => {
  return colors.rgb[type];
};
