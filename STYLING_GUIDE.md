# Balatro-Inspired Styling Guide

This document explains how to use the newly configured Balatro-inspired retro pixel art styling system.

## Overview

The styling system consists of:
1. **Tailwind Config** - Custom colors, fonts, animations defined in `tailwind.config.js`
2. **Base Styles** - Pixel art rendering and NES.css integration in `index.css`
3. **Theme Variables** - CSS custom properties in `theme.css`
4. **Animations** - Game-specific animations in `animations.css`

## Quick Start

### Using Tailwind Classes

```tsx
// Background colors
<div className="bg-background-primary">  // Deep purple-black
<div className="bg-background-secondary"> // Darker purple
<div className="bg-background-accent">   // Rich purple highlight

// Card type gradients
<div className="bg-gradient-to-br from-card-context-light to-card-context-dark">
<div className="bg-gradient-to-br from-card-model-light to-card-model-dark">
<div className="bg-gradient-to-br from-card-tool-light to-card-tool-dark">
<div className="bg-gradient-to-br from-card-framework-light to-card-framework-dark">
<div className="bg-gradient-to-br from-card-guardrail-light to-card-guardrail-dark">

// Text colors
<div className="text-text-primary">    // Pure white
<div className="text-text-secondary">  // Soft lavender

// Pixel fonts
<h1 className="font-pixel text-title">Title</h1>
<p className="font-pixel text-body">Body text</p>
<small className="font-pixel-alt text-small">Small text</small>

// Pixel borders and shadows
<div className="border-pixel border-border shadow-pixel">
<div className="border-pixel-thick border-effect-selection shadow-pixel-hover">

// Animations
<div className="animate-hover-float">     // Hover effect
<div className="animate-card-place">      // Card placement
<div className="animate-score-bounce">    // Score popup
<div className="animate-shake">           // Error shake
```

### Using CSS Variables

```css
/* In your CSS files */
.my-card {
  background: linear-gradient(135deg,
    var(--card-model-light),
    var(--card-model-dark)
  );
  border: var(--border-width-pixel) solid var(--border-color);
  box-shadow: var(--shadow-pixel);
  font-family: var(--font-pixel);
  font-size: var(--font-size-card);
}

.my-button:hover {
  box-shadow: 0 0 20px var(--effect-glow);
  transition: all var(--timing-hover) var(--easing-ease-out);
}
```

### Using Custom Utility Classes

```tsx
// Theme utilities (from theme.css)
<div className="bg-balatro-primary">
<div className="card-gradient-model glow-model">
<h1 className="text-logo text-shadow-pixel">

// Glow effects (from index.css)
<div className="glow-cyan">     // Cyan glow
<div className="glow-magenta">  // Magenta glow
<div className="glow-orange">   // Orange glow
<div className="glow-pink">     // Pink glow
<div className="glow-green">    // Green glow

// Animation classes (from animations.css)
<div className="card-hover">           // Hover animation
<div className="card-place">           // Placement animation
<div className="score-bounce delay-200"> // Delayed bounce
<div className="screen-shake">         // Shake effect
<div className="button-press">         // Button press
<div className="wiggle">               // Icon wiggle
```

## NES.css Components

Use NES.css for authentic 8-bit UI elements (automatically styled with Balatro colors):

```tsx
// Buttons
<button className="nes-btn is-primary">Primary</button>
<button className="nes-btn is-success">Success</button>
<button className="nes-btn is-warning">Warning</button>
<button className="nes-btn is-error">Error</button>

// Containers
<div className="nes-container is-rounded is-dark">
  Content here
</div>

// Progress bars
<progress className="nes-progress is-primary" value="50" max="100"></progress>

// Text inputs
<input type="text" className="nes-input" placeholder="Enter text" />

// Speech balloons
<div className="nes-balloon from-left">
  Dialogue text
</div>

// Icons (from NES.icons)
<i className="nes-icon trophy"></i>
<i className="nes-icon star"></i>
<i className="nes-icon heart"></i>
```

## Card Component Example

```tsx
import { motion } from 'framer-motion';

export const Card = ({ type, title, description }) => {
  return (
    <motion.div
      className={`
        card-gradient-${type}
        border-pixel-thick border-border
        shadow-pixel
        glow-${type}
        font-pixel text-card
        p-4 rounded-pixel
      `}
      whileHover={{
        scale: 1.08,
        rotate: 2,
        y: -10,
        transition: { duration: 0.1 }
      }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.08 }
      }}
    >
      <h3 className="text-subheading text-shadow-pixel mb-2">
        {title}
      </h3>
      <p className="text-small">
        {description}
      </p>
    </motion.div>
  );
};
```

## Button Component Example

```tsx
export const PixelButton = ({ children, variant = 'primary', onClick }) => {
  return (
    <button
      className={`
        nes-btn is-${variant}
        font-pixel text-card
        shadow-pixel
        hover:shadow-pixel-hover
        hover:animate-button-hover-glow
        active:animate-button-press
        transition-all duration-hover
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

## Color Palette Reference

### Backgrounds
- Primary: `#2d1b3d` (Deep purple-black)
- Secondary: `#1a0f24` (Darker purple)
- Accent: `#4a2859` (Rich purple)

### Card Types
- **Context**: `#00d9ff → #0088cc` (Cyan/Teal)
- **Model**: `#ff00ff → #9933ff` (Purple/Magenta)
- **Tool**: `#ffaa00 → #ff6600` (Orange/Gold)
- **Framework**: `#ff1493 → #ff69b4` (Pink/Red)
- **Guardrail**: `#00ff88 → #00cc44` (Green/Lime)

### Effects
- Glow: `#ff00ff` (Bright magenta)
- Success: `#00ff88` (Neon green)
- Error: `#ff3366` (Hot pink-red)
- Hover: `#ffff00` (Yellow)
- Selection: `#ffffff` (White)

## Typography

### Fonts
- Primary: `'Press Start 2P'` (Main pixel font)
- Secondary: `'Silkscreen'` (Alternative pixel font)

### Sizes
- Logo: 48px
- Title: 32px
- Heading: 24px
- Subheading: 16px
- Body: 14px
- Card: 12px
- Small: 10px

## Animation Timing

### Durations
- Hover: 100ms
- Tap/Click: 80ms
- Drag: 200ms
- Placement: 300ms
- Reveal: 200ms
- Score: 600ms

### Easing Functions
- Hover: `ease-out`
- Tap: `ease-in`
- Bounce/Pop: `cubic-bezier(0.68, -0.55, 0.265, 1.55)`

## Best Practices

1. **Always use pixel fonts** - Use `font-pixel` or `font-pixel-alt` class
2. **Hard shadows, no blur** - Use `shadow-pixel` classes
3. **Thick borders (3-4px)** - Use `border-pixel` or `border-pixel-thick`
4. **High contrast text** - White text on dark backgrounds
5. **Pixel-perfect rendering** - Add `pixel-perfect` class to images
6. **Snappy animations** - Keep animations under 300ms for responsiveness
7. **Glow effects** - Use for emphasis and feedback
8. **Combine with Framer Motion** - For smooth, physics-based animations

## PixiJS Integration

For the game board, disable antialiasing for pixel-perfect rendering:

```tsx
import { Stage, Container } from '@pixi/react';

export const Board = () => (
  <Stage
    width={1200}
    height={800}
    options={{
      background: 0x2d1b3d, // Deep purple Balatro background
      antialias: false,     // Pixel-perfect rendering
    }}
  >
    <Container>
      {/* Board content */}
    </Container>
  </Stage>
);
```

## Troubleshooting

### Fonts not loading
- Ensure Google Fonts import is present in `index.css`
- Check font-family spelling: `'Press Start 2P'` (with quotes and exact capitalization)

### NES.css not styled correctly
- Verify `nes.css` and `nes.icons` are installed: `npm install nes.css nes.icons`
- Check imports in `index.css` are correct
- Balatro color overrides are at the bottom of `index.css`

### Animations not working
- Ensure `animations.css` is imported in `main.tsx`
- Check class names match animation definitions
- Verify Framer Motion is installed for React animations

### Tailwind classes not working
- Run `npm run dev` to rebuild
- Check `tailwind.config.js` has correct content paths
- Ensure class names match extended theme configuration

## Resources

- **Balatro Game**: https://www.playbalatro.com/
- **NES.css**: https://nostalgic-css.github.io/NES.css/
- **NES.icons**: https://github.com/nostalgic-css/NES.icons
- **raster-react**: https://github.com/saran13raj/raster-icons
- **Framer Motion**: https://www.framer.com/motion/
- **Tailwind CSS**: https://tailwindcss.com/docs
