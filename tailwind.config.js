/** @type {import('tailwindcss').Config} */
// Unified Design System - Best of Both Worlds
// Combines semantic spacing tokens, comprehensive shadow system, and enhanced visual effects
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Balatro-inspired backgrounds
        background: {
          primary: '#2d1b3d',     // Deep purple-black (Balatro's felt table)
          secondary: '#1a0f24',   // Darker purple for depth
          accent: '#4a2859',      // Rich purple highlight
        },

        // Card type colors (vibrant & saturated)
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

        // UI element colors
        text: {
          primary: '#ffffff',     // Pure white
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

        // Border and shadow colors
        border: '#ffffff',
        shadow: '#000000',
      },

      fontFamily: {
        'pixel': ['"Press Start 2P"', 'monospace'],
        'pixel-alt': ['"Silkscreen"', 'monospace'],
        'mono': ['monospace'],
      },

      fontSize: {
        'xs': '0.625rem',   // 10px
        'sm': '0.75rem',    // 12px
        'base': '0.875rem', // 14px
        'lg': '1rem',       // 16px
        'xl': '1.5rem',     // 24px
        '2xl': '2rem',      // 32px
        '3xl': '3rem',      // 48px
        // Semantic aliases for better readability
        'logo': ['48px', { lineHeight: '1.2' }],
        'title': ['32px', { lineHeight: '1.3' }],
        'heading': ['24px', { lineHeight: '1.4' }],
        'subheading': ['16px', { lineHeight: '1.5' }],
        'body': ['14px', { lineHeight: '1.6' }],
        'card': ['12px', { lineHeight: '1.5' }],
        'small': ['10px', { lineHeight: '1.4' }],
      },

      spacing: {
        // Semantic spacing tokens for consistency
        'xs': '0.25rem',  // 4px
        'sm': '0.5rem',   // 8px
        'md': '1rem',     // 16px
        'lg': '1.5rem',   // 24px
        'xl': '2rem',     // 32px
        '2xl': '3rem',    // 48px
        '3xl': '4rem',    // 64px
        '4xl': '6rem',    // 96px
      },

      borderWidth: {
        // Enhanced pixel borders (stronger than default)
        'pixel': '4px',       // Standard pixel border (upgraded from 3px)
        'pixel-thick': '5px', // Thick pixel border (upgraded from 4px)
      },

      borderRadius: {
        'none': '0px',  // Pixel art uses sharp corners
        'pixel': '2px', // Minimal rounding for pixel style
      },

      boxShadow: {
        // Comprehensive shadow system combining both approaches
        'pixel': '5px 5px 0px 0px #000000',       // Enhanced standard (was 4px)
        'pixel-hover': '7px 7px 0px 0px #000000', // Enhanced hover (was 6px)
        'pixel-large': '8px 8px 0px 0px #000000', // Large shadow for emphasis
        'pixel-small': '2px 2px 0px 0px #000000', // Small shadow for subtle depth
        'pixel-glow': '0 0 20px currentColor',     // Glow effect
        'none': 'none',
      },

      dropShadow: {
        'pixel': '2px 2px 0px #000000',       // Standard drop shadow
        'pixel-thick': '4px 4px 0px #000000', // Thick drop shadow
      },

      animation: {
        // Core animations - kept minimal in config, most are in animations.css
        'hover-float': 'hoverFloat 100ms ease-out forwards',
        'tap-press': 'tapPress 80ms ease-in forwards',
        'card-place': 'cardPlace 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
        'card-reveal': 'cardReveal 200ms ease-out forwards',
        'score-bounce': 'scoreBounce 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'shake': 'shake 400ms ease-in-out',
        'scanline': 'scanline 6s linear infinite',
        'particle-float': 'particleFloat 3s ease-in-out infinite',
      },

      keyframes: {
        hoverFloat: {
          '0%': { transform: 'scale(1) rotate(0deg) translateY(0)' },
          '100%': { transform: 'scale(1.08) rotate(2deg) translateY(-10px)' },
        },
        tapPress: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        cardPlace: {
          '0%': { transform: 'scale(0.8) rotate(-5deg)', opacity: '0' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        cardReveal: {
          '0%': { transform: 'rotateY(90deg)' },
          '100%': { transform: 'rotateY(0deg)' },
        },
        scoreBounce: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.2)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5', filter: 'brightness(1)' },
          '50%': { opacity: '1', filter: 'brightness(1.5)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        particleFloat: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-20px) translateX(10px)' },
        },
      },

      transitionDuration: {
        // Comprehensive duration system with both semantic and base values
        'instant': '0ms',      // Instant changes
        'fast': '100ms',       // Fast interactions
        'normal': '200ms',     // Normal transitions
        'slow': '300ms',       // Slow, deliberate transitions
        'slower': '600ms',     // Very slow transitions
        // Semantic aliases for specific use cases
        'hover': '100ms',      // Hover state transitions
        'tap': '80ms',         // Tap/click feedback
        'placement': '300ms',  // Card placement
        'reveal': '200ms',     // Reveal animations
      },

      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Bouncy easing
        'pop': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',    // Pop effect (same as bounce)
      },
    },
  },
  plugins: [],
}
