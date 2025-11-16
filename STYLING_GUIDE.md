# Unified Styling System Guide

**Balatro-Inspired Pixel Art Design System**

This guide documents the unified styling system that combines the best practices from both codebases, with enhanced visual effects and no NES.css dependency.

## Overview

The styling system consists of:
1. **[tailwind.config.js](tailwind.config.js)** - Comprehensive design tokens (colors, spacing, shadows, animations)
2. **[src/index.css](src/index.css)** - Base styles, pixel art rendering, utility classes, and background effects
3. **[src/animations.css](src/animations.css)** - 40+ snappy game animations
4. **No external CSS frameworks** - Pure custom Tailwind + CSS

## Architecture Improvements

### What's New
- ✅ **Removed NES.css** - Full control over every pixel
- ✅ **Enhanced visual effects** - Stronger shadows, glows, and gradients
- ✅ **Comprehensive spacing tokens** - Semantic spacing system (xs, sm, md, lg, xl, 2xl, 3xl, 4xl)
- ✅ **Expanded shadow system** - 6 shadow variants (pixel-small to pixel-large)
- ✅ **Extensive animation library** - 40+ animations in separate file
- ✅ **Better organization** - Modular CSS structure
- ✅ **Improved performance** - Lighter bundle without NES.css

## Quick Start

### Layout & Backgrounds

```tsx
// Main screen layout
<div className="min-h-screen flex flex-col px-4 py-8 relative bg-[#2d1b3d]">
  {/* Pixel grid background pattern (already in body::before) */}

  {/* Content wrapper with z-index to appear above background */}
  <div className="relative z-10 flex flex-col">
    {/* Your content */}
  </div>
</div>
```

### Using Tailwind Classes

```tsx
// Background colors
<div className="bg-background-primary">  // #2d1b3d - Deep purple-black
<div className="bg-background-secondary"> // #1a0f24 - Darker purple
<div className="bg-background-accent">   // #4a2859 - Rich purple highlight

// Card type colors (use for borders, text, glows)
<div className="border-[#00d9ff]">  // Context cyan
<div className="border-[#ff00ff]">  // Model magenta
<div className="border-[#ffaa00]">  // Tool orange
<div className="border-[#ff1493]">  // Framework pink
<div className="border-[#00ff88]">  // Guardrail green

// Text colors
<div className="text-text-primary">    // #ffffff - Pure white
<div className="text-text-secondary">  // #d4a5f5 - Soft lavender

// Pixel fonts
<h1 className="font-pixel text-logo">Logo</h1>
<h1 className="font-pixel text-title">Title</h1>
<h2 className="font-pixel text-heading">Heading</h2>
<p className="font-pixel text-body">Body text</p>
<small className="font-pixel-alt text-small">Small text</small>

// Spacing (semantic tokens)
<div className="p-md">      // padding: 1rem (16px)
<div className="gap-lg">    // gap: 1.5rem (24px)
<div className="mb-xl">     // margin-bottom: 2rem (32px)
<div className="space-y-sm"> // vertical spacing: 0.5rem (8px)

// Pixel borders (enhanced - thicker than before)
<div className="border-pixel border-white">        // 4px solid white
<div className="border-pixel-thick border-white">  // 5px solid white

// Shadows (enhanced - stronger than before)
<div className="shadow-pixel">         // 5px 5px 0px 0px #000
<div className="shadow-pixel-hover">   // 7px 7px 0px 0px #000
<div className="shadow-pixel-large">   // 8px 8px 0px 0px #000
<div className="shadow-pixel-small">   // 2px 2px 0px 0px #000

// Animations (from tailwind.config.js)
<div className="animate-hover-float">     // Hover effect
<div className="animate-card-place">      // Card placement
<div className="animate-score-bounce">    // Score popup
<div className="animate-shake">           // Error shake
```

### Using Custom Utility Classes

```tsx
// Enhanced glow effects (multi-layered with inset)
<div className="glow-cyan">     // Cyan glow with inset
<div className="glow-magenta">  // Magenta glow with inset
<div className="glow-orange">   // Orange glow with inset
<div className="glow-pink">     // Pink glow with inset
<div className="glow-green">    // Green glow with inset

// Text shadows (multi-directional outline for better readability)
<h1 className="text-shadow-pixel">       // 4-direction outline
<h1 className="text-shadow-pixel-thick"> // Thicker outline

// Pixel-perfect rendering
<img className="pixel-perfect" src="..." />

// CRT screen effect
<div className="crt-effect">
  {/* Content with scanline overlay */}
</div>

// Dithered background pattern
<div className="dither-pattern">
  {/* Content with subtle texture */}
</div>
```

### Using Animation Classes

```tsx
// Card animations
<div className="card-hover">       // Hover animation
<div className="card-tap">         // Tap/click animation
<div className="card-place">       // Placement animation
<div className="card-reveal">      // Flip reveal animation
<div className="card-drag-trail">  // Drag trail effect
<div className="card-glow-pulse">  // Pulsing glow

// Score & UI animations
<div className="score-bounce">     // Score popup bounce
<div className="number-roll">      // Rolling number
<div className="star-particle">    // Star explosion

// Screen effects
<div className="screen-shake">     // Error shake
<div className="white-flash">      // Flash effect
<div className="color-flash">      // Color brightness pulse

// PixiJS board effects
<div className="scanline">         // CRT scanline
<div className="particle-float">   // Floating particles
<div className="slot-glow">        // Slot glow pulse

// Menu & navigation
<div className="slide-in-bottom">  // Slide from bottom
<div className="slide-in-top">     // Slide from top
<div className="modal-scale">      // Modal scale up
<div className="fade-in">          // Fade in
<div className="fade-out">         // Fade out

// Button interactions
<button className="button-press">       // Button press
<button className="button-hover-glow">  // Hover glow pulse
<div className="wiggle">                // Icon wiggle
<div className="bounce">                // Bounce animation

// Animation utilities
<div className="card-place delay-200">         // Delayed animation
<div className="bounce animation-slow">        // Slower animation
<div className="wiggle animation-infinite">    // Infinite loop
```

## Component Examples

### Card Component

```tsx
import { motion } from 'framer-motion';

export const PathCard = ({ path, icon: Icon, borderColor, isHovered }) => {
  return (
    <motion.button
      className="relative bg-[#2d1b3d]/90 backdrop-blur-sm text-left overflow-hidden group"
      style={{
        padding: '1.5rem',
        border: `0.25rem solid ${borderColor}`,
        boxShadow: isHovered
          ? `0.375rem 0.375rem 0 #000000, 0 0 1.25rem ${borderColor}`
          : `0.25rem 0.25rem 0 #000000`,
        outline: isHovered ? `0.125rem solid ${borderColor}` : 'none',
        transition: 'box-shadow 150ms ease-out, outline 150ms ease-out',
        cursor: 'pointer'
      }}
      whileHover={{
        scale: 1.05,
        y: -4,
        rotate: 1,
        transition: { duration: 0.15, ease: "easeOut" }
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.08, ease: "easeIn" }
      }}
    >
      <h3
        className="font-bold uppercase"
        style={{
          color: borderColor,
          textShadow: '0.125rem 0.125rem 0 #000000',
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '1.25rem'
        }}
      >
        {path.name}
      </h3>
      {/* More content */}
    </motion.button>
  );
};
```

### Button Component

```tsx
export const PixelButton = ({ children, variant = 'primary', onClick }) => {
  const colors = {
    primary: '#ff00ff',
    success: '#00ff88',
    warning: '#ffaa00',
    error: '#ff3366',
  };

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05, x: -3 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-3 bg-[#2d1b3d] text-white text-sm font-bold uppercase
                 border-4 border-white font-['Press_Start_2P']"
      style={{
        backgroundColor: colors[variant],
        boxShadow: '4px 4px 0px #000000',
        fontFamily: "'Press Start 2P', monospace",
        padding: '12px 20px',
        transition: 'all 100ms ease-out'
      }}
    >
      {children}
    </motion.button>
  );
};
```

## Color Palette Reference

### Backgrounds
- **Primary**: `#2d1b3d` - Deep purple-black (Balatro's felt table)
- **Secondary**: `#1a0f24` - Darker purple for depth
- **Accent**: `#4a2859` - Rich purple highlight

### Card Type Colors (for borders, text, glows)
| Type | Light | Dark | Usage |
|------|-------|------|-------|
| **Context** | `#00d9ff` | `#0088cc` | Cyan/Teal |
| **Model** | `#ff00ff` | `#9933ff` | Purple/Magenta |
| **Tool** | `#ffaa00` | `#ff6600` | Orange/Gold |
| **Framework** | `#ff1493` | `#ff69b4` | Pink/Red |
| **Guardrail** | `#00ff88` | `#00cc44` | Green/Lime |

### Text Colors
- **Primary**: `#ffffff` - Pure white
- **Secondary**: `#d4a5f5` - Soft lavender

### Effect Colors
- **Glow**: `#ff00ff` - Bright magenta
- **Success**: `#00ff88` - Neon green
- **Error**: `#ff3366` - Hot pink-red
- **Hover**: `#ffff00` - Yellow
- **Selection**: `#ffffff` - White

## Typography System

### Fonts
- **Primary**: `'Press Start 2P'` - Main pixel font
- **Secondary**: `'Silkscreen'` - Alternative pixel font
- **Fallback**: `monospace`

### Size Scale
| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-logo` | 48px | 1.2 | Large branding |
| `text-title` | 32px | 1.3 | Page titles |
| `text-heading` | 24px | 1.4 | Section headings |
| `text-subheading` | 16px | 1.5 | Subsections |
| `text-body` | 14px | 1.6 | Body text |
| `text-card` | 12px | 1.5 | Card text |
| `text-small` | 10px | 1.4 | Small labels |

## Spacing System

Semantic spacing tokens for consistent layout:

| Token | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `xs` | 0.25rem | 4px | Micro spacing |
| `sm` | 0.5rem | 8px | Small gaps |
| `md` | 1rem | 16px | Standard spacing |
| `lg` | 1.5rem | 24px | Large spacing |
| `xl` | 2rem | 32px | Extra large |
| `2xl` | 3rem | 48px | Section spacing |
| `3xl` | 4rem | 64px | Major sections |
| `4xl` | 6rem | 96px | Page spacing |

## Shadow System

Comprehensive shadow tokens:

| Class | Value | Usage |
|-------|-------|-------|
| `shadow-pixel` | 5px 5px 0px 0px #000 | Standard shadow (enhanced) |
| `shadow-pixel-hover` | 7px 7px 0px 0px #000 | Hover state (enhanced) |
| `shadow-pixel-large` | 8px 8px 0px 0px #000 | Emphasis |
| `shadow-pixel-small` | 2px 2px 0px 0px #000 | Subtle depth |
| `shadow-pixel-glow` | 0 0 20px currentColor | Glow effect |

## Animation Timing

### Duration Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `duration-instant` | 0ms | Immediate changes |
| `duration-fast` | 100ms | Quick interactions |
| `duration-normal` | 200ms | Standard transitions |
| `duration-slow` | 300ms | Deliberate animations |
| `duration-slower` | 600ms | Very slow transitions |
| `duration-hover` | 100ms | Hover states |
| `duration-tap` | 80ms | Click feedback |
| `duration-placement` | 300ms | Card placement |
| `duration-reveal` | 200ms | Reveal effects |

### Easing Functions

| Function | Value | Usage |
|----------|-------|-------|
| `ease-bounce` | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | Bouncy effects |
| `ease-pop` | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | Pop animations |

## Best Practices

### Layout
1. **Always use semantic spacing tokens** - Use `p-md`, `gap-lg`, etc. instead of arbitrary values
2. **Fixed background effects** - Background patterns are global in `body::before` and `body::after`
3. **Z-index layering** - Background: 0, Content: 1-10, Overlays: 1000
4. **Relative positioning** - Wrap content in `relative z-10` to ensure it appears above backgrounds

### Typography
1. **Always use pixel fonts** - `font-pixel` or `font-pixel-alt`
2. **Use semantic sizes** - `text-title`, `text-body`, etc.
3. **Hard shadows, no blur** - Use `text-shadow-pixel` classes
4. **High contrast** - White text on dark backgrounds

### Visual Effects
1. **Thick borders** - Use `border-pixel` (4px) or `border-pixel-thick` (5px)
2. **Hard shadows** - All shadows are offset, never blurred
3. **Multi-layered glows** - Glow utilities include inset for depth
4. **Pixel-perfect images** - Add `pixel-perfect` class to all images

### Animations
1. **Snappy timing** - Most animations under 300ms
2. **Use Framer Motion** - For smooth, physics-based animations
3. **Combine classes** - Use delay utilities for staggered animations
4. **Responsive feedback** - Always provide visual feedback for interactions

### Performance
1. **Use utility classes** - Prefer Tailwind over inline styles when possible
2. **Avoid excessive animations** - Don't animate everything
3. **Optimize images** - Use appropriate formats for pixel art
4. **Test on low-end devices** - Background effects can be intensive

## PixiJS Integration

For pixel-perfect rendering in the game board:

```tsx
import { Stage, Container } from '@pixi/react';

export const GameBoard = () => (
  <Stage
    width={1200}
    height={800}
    options={{
      background: 0x2d1b3d,  // Deep purple Balatro background
      antialias: false,      // Pixel-perfect rendering
      resolution: 1,         // Disable high-DPI scaling
    }}
  >
    <Container>
      {/* Board content */}
    </Container>
  </Stage>
);
```

## Migration from NES.css

If you have existing NES.css code, here's how to migrate:

### Buttons
```tsx
// Before (NES.css)
<button className="nes-btn is-primary">Click</button>

// After (Custom)
<motion.button
  className="bg-[#ff00ff] text-white font-pixel text-card uppercase
             border-4 border-white shadow-pixel"
  style={{ padding: '12px 24px' }}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click
</motion.button>
```

### Containers
```tsx
// Before (NES.css)
<div className="nes-container is-dark is-rounded">Content</div>

// After (Custom)
<div className="bg-background-secondary border-4 border-white shadow-pixel p-md">
  Content
</div>
```

### Progress Bars
```tsx
// Before (NES.css)
<progress className="nes-progress is-primary" value="50" max="100"></progress>

// After (Custom)
<div className="w-full bg-black/50 border-2 border-white h-3 overflow-hidden">
  <div
    className="h-full bg-[#ff00ff]"
    style={{ width: `${(value / max) * 100}%`, boxShadow: '0 0 10px #ff00ff' }}
  />
</div>
```

## Troubleshooting

### Fonts not loading
- ✅ Ensure Google Fonts import is present in `src/index.css`
- ✅ Check font-family spelling: `'Press Start 2P'` (with quotes and exact capitalization)
- ✅ Run `npm run dev` to rebuild

### Tailwind classes not working
- ✅ Run `npm run dev` to rebuild
- ✅ Check `tailwind.config.js` has correct content paths
- ✅ Ensure class names match extended theme configuration
- ✅ Verify Tailwind v4.x syntax (no colon prefix for variants)

### Animations not working
- ✅ Ensure `animations.css` is imported in `src/index.css`
- ✅ Check class names match animation definitions
- ✅ Verify Framer Motion is installed: `npm install framer-motion`

### Background effects not showing
- ✅ Background patterns are global (applied to `body`)
- ✅ Ensure content has `relative z-10` to appear above backgrounds
- ✅ Check browser console for CSS errors

### Shadows or borders look wrong
- ✅ Use enhanced tokens: `shadow-pixel` is now 5px (was 4px)
- ✅ Use `border-pixel` for 4px borders (was 3px)
- ✅ Hard reload (Ctrl+Shift+R) to clear cached styles

## File Structure

```
agent-architect/
├── src/
│   ├── index.css          # Base styles, utilities, background effects
│   ├── animations.css     # 40+ game animations
│   ├── components/        # React components
│   ├── screens/           # Screen components
│   └── ...
├── tailwind.config.js     # Design tokens and theme
├── package.json           # Dependencies (no NES.css)
└── STYLING_GUIDE.md       # This file
```

## Resources

- **Balatro Game**: https://www.playbalatro.com/
- **Framer Motion**: https://www.framer.com/motion/
- **Tailwind CSS v4**: https://tailwindcss.com/docs
- **PixiJS**: https://pixijs.com/
- **Press Start 2P Font**: https://fonts.google.com/specimen/Press+Start+2P
- **Silkscreen Font**: https://fonts.google.com/specimen/Silkscreen

---

**Last Updated**: 2025-11-16
**System Version**: Unified v1.0 (NES.css removed)
