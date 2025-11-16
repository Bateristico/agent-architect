import React from 'react';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

// Base SVG wrapper component for pixel art icons
const PixelIconBase: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ children, className = '', style }) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className}
    style={{
      width: '1em',
      height: '1em',
      display: 'inline-block',
      imageRendering: 'pixelated',
      ...style
    }}
  >
    {children}
  </svg>
);

// Individual icon components
export const ArrowLeft: React.FC<IconProps> = (props) => (
  <PixelIconBase {...props}>
    <path d="M20 11v2H8v2H6v-2H4v-2h2V9h2v2h12zM10 7H8v2h2V7zm0 0h2V5h-2v2zm0 10H8v-2h2v2zm0 0h2v2h-2v-2z" fill="currentColor"/>
  </PixelIconBase>
);

export const ArrowRight: React.FC<IconProps> = (props) => (
  <PixelIconBase {...props}>
    <path d="M4 11v2h12v2h2v-2h2v-2h-2V9h-2v2H4zm10-4h2v2h-2V7zm0 0h-2V5h2v2zm0 10h2v-2h-2v2zm0 0h-2v2h2v-2z" fill="currentColor"/>
  </PixelIconBase>
);

export const MoonStars: React.FC<IconProps> = (props) => (
  <PixelIconBase {...props}>
    <path d="M16 3h2v2h-2V3zM8 4h2v2H8V4zm2 2h2v2h-2V6zm-2 4H6v2h2v-2zm0 0V8h2v2h-2zm0 2v2h2v-2H8zm2 2v2h2v-2h-2zm2 0h2v-2h-2v2zm2 0v2h2v-2h-2zm0-2h2v-2h-2v2zm0-4h2V8h-2v2zm0 0V8h2V6h-2v2zm2 10h-2v2h2v-2zm0 2h2v-2h-2v2zm2 0v-2h2v2h-2zm2-2v-2h2v2h-2z" fill="currentColor"/>
  </PixelIconBase>
);

export const Zap: React.FC<IconProps> = (props) => (
  <PixelIconBase {...props}>
    <path d="M11 2h2v2h-2V2zm2 2h2v2h-2V4zm2 2h2v2h-2V6zm-4 2h2v2h-2V8zm-2 2h2v2H9v-2zm-2 2h2v2H7v-2zm2 2h2v2H9v-2zm2 2h2v2h-2v-2zm2 2h2v2h-2v-2zm0-4h2v-2h-2v2zm2 0h2v-2h-2v2zm2-2h2v-2h-2v2zm2-2h2v-2h-2v2z" fill="currentColor"/>
  </PixelIconBase>
);

export const GitBranch: React.FC<IconProps> = (props) => (
  <PixelIconBase {...props}>
    <path d="M7 3h4v2h2v2h2v2h2v2h-4V9h-2V7H9v8h2v2h4v4h-4v-2H7v-4h4v-2H9V7H7V3z" fill="currentColor"/>
  </PixelIconBase>
);

export const Shield: React.FC<IconProps> = (props) => (
  <PixelIconBase {...props}>
    <path d="M11 2h2v2h-2V2zm2 2h2v2h-2V4zm2 2h2v2h-2V6zM9 4h2v2H9V4zm8 4h2v2h-2V8zm2 2h2v2h-2v-2zM7 6h2v2H7V6zm0 2H5v2h2V8zm12 4v2h2v-2h-2zM5 10v2h2v-2H5zm14 4v2h2v-2h-2zM5 14v2h2v-2H5zm12 4h2v-2h-2v2zm-10 0v-2H5v2h2zm10 0v2h-2v2h-2v-2h-2v2H9v-2H7v-2h2v2h2v-2h2v2h2v-2h2v2z" fill="currentColor"/>
  </PixelIconBase>
);

export const BookOpen: React.FC<IconProps> = (props) => (
  <PixelIconBase {...props}>
    <path d="M4 3h7v2h2V3h7v16h-7v-2h-2v2H4V3zm2 2v12h5V5H6zm7 0v12h5V5h-5z" fill="currentColor"/>
  </PixelIconBase>
);

export const Search: React.FC<IconProps> = (props) => (
  <PixelIconBase {...props}>
    <path d="M10 4H8v2H6v2H4v4h2v2h2v2h2v2h2v-2h2v-2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2v-2h2V8h-2V6h-2V4h-2zm0 2v2H8v2H6v4h2v2h2v2h2v-2h2v-2h2V8h-2V6h-2z" fill="currentColor"/>
  </PixelIconBase>
);

export const Rocket: React.FC<IconProps> = (props) => (
  <PixelIconBase {...props}>
    <path d="M11 2h2v2h2v2h2v2h2v2h2v2h-2v2h-2v-2h-2v2h-2v2H9v2H7v2H5v-2h2v-2h2v-2h2v-2H9v-2H7v-2h2V8h2V6h2V4h-2V2zm0 4H9v2h2V6zm4 4h-2V8h2v2zm-4 2h2v-2h-2v2zm0 0H9v2h2v-2z" fill="currentColor"/>
  </PixelIconBase>
);

export const Check: React.FC<IconProps> = (props) => (
  <PixelIconBase {...props}>
    <path d="M18 6h2v2h-2V6zm-2 2h2v2h-2V8zm-2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm0 0H8v2h2v-2zm0 0v-2H8v2h2zM6 12h2v2H6v-2zm0 0V10h2v2H6z" fill="currentColor"/>
  </PixelIconBase>
);

export const Close: React.FC<IconProps> = (props) => (
  <PixelIconBase {...props}>
    <path d="M6 6h2v2H6V6zm2 2h2v2H8V8zm2 2h2v2h-2v-2zm2 0h2V8h-2v2zm2-2h2V6h-2v2zm0 4h-2v2h2v-2zm0 2h2v2h-2v-2zm-2 2h-2v2h2v-2zm-2 0v-2h-2v2h2zm-2 0H8v2h2v-2zm-2-2H6v2h2v-2zm0-2h2v-2H8v2z" fill="currentColor"/>
  </PixelIconBase>
);

export const Clock: React.FC<IconProps> = (props) => (
  <PixelIconBase {...props}>
    <path d="M11 2h2v2h2v2h2v2h2v2h2v2h-2v2h-2v2h-2v2h-2v2h-2v-2H9v-2H7v-2H5v-2H3v-2h2V8h2V6h2V4h2V2zm0 4H9v2H7v2H5v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2v-2h-2V8h-2V6h-2v2h-2v2h2v2h2v2h-2v-2h-2V8h2V6z" fill="currentColor"/>
  </PixelIconBase>
);

export const Github: React.FC<IconProps> = (props) => (
  <PixelIconBase {...props}>
    <path d="M10 2h4v2h2v2h2v4h-2v2h-2v2h2v2h2v2h-2v-2h-2v2h-4v-2H8v2H6v-2h2v-2h2v-2H8v-2H6v-2H4V6h2V4h2V2h2v2h2V2zm0 4H8v2H6v4h2v2h2v2h2v-2h2v-2h2V8h-2V6h-2v2h-2V6zm2 8h-2v-2h2v2z" fill="currentColor"/>
  </PixelIconBase>
);

export const Heart: React.FC<IconProps> = (props) => (
  <PixelIconBase {...props}>
    <path d="M5 5h4v2H7v2H5V5zm10 0h4v4h-2V7h-2V5zm-2 4h2v2h-2V9zM9 9h2v2H9V9zm0 0H7v2h2V9zm4 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm0 0h-2v2h2v-2zm-2 2h2v2H9v-2zm2 2h2v2h-2v-2zm0 0v2h-2v-2h2z" fill="currentColor"/>
  </PixelIconBase>
);

export const Volume2: React.FC<IconProps> = (props) => (
  <PixelIconBase {...props}>
    <path d="M11 4h2v2h2v2h2v8h-2v2h-2v2h-2v-2H9v-2H7v-2H3v-2h4V10h2V8h2V6h2V4zm0 4H9v2H7v4h2v2h2v2h2v-2h2V8h-2v2h-2V8z" fill="currentColor"/>
  </PixelIconBase>
);

export const Music: React.FC<IconProps> = (props) => (
  <PixelIconBase {...props}>
    <path d="M10 2h10v2h-2v10h-2v2h-4v-2H10v-2h4v-2h-4V2zm2 2v6h4V4h-2z" fill="currentColor"/>
  </PixelIconBase>
);

export const BullseyeArrow: React.FC<IconProps> = (props) => (
  <PixelIconBase {...props}>
    <path d="M12 2h2v2h-2V2zm-2 2h2v2h-2V4zm2 2h2v2h-2V6zm2 2h2v2h-2V8zm-6 0h2v2H8V8zm2 2h2v2h-2v-2zm2 0h2v-2h-2v2zm-4 2h2v2H8v-2zm0 2H6v2h2v-2zm2 0h2v2h-2v-2zm2 0h2v-2h-2v2zm2 0h2v2h-2v-2zm0 2h-2v2h2v-2zm-4 0v2h-2v-2h2zm6 2v-2h2v2h-2zm2-4h2v-2h-2v2zm0-4h2V8h-2v2zm-2-2V6h2V4h2V2h-2v2h-2z" fill="currentColor"/>
  </PixelIconBase>
);

export const Loader: React.FC<IconProps> = (props) => (
  <PixelIconBase {...props}>
    <path d="M11 2h2v6h-2V2zm0 14h2v6h-2v-6zM2 11h6v2H2v-2zm14 0h6v2h-6v-2z" fill="currentColor"/>
  </PixelIconBase>
);

export const Coin: React.FC<IconProps> = (props) => (
  <PixelIconBase {...props}>
    <path d="M9 3h6v2h2v2h2v8h-2v2h-2v2H9v-2H7v-2H5V7h2V5h2V3zm0 2H7v2H5v8h2v2h2v2h6v-2h2v-2h2V7h-2V5h-2V3h-2v4h2v2h-2V7h-2V5zm0 4v2h2v2h2V9h-4z" fill="currentColor"/>
  </PixelIconBase>
);

export const Code: React.FC<IconProps> = (props) => (
  <PixelIconBase {...props}>
    <path d="M13 2h2v2h-2V2zm2 2h2v2h-2V4zm2 2h2v2h-2V6zm2 2h2v2h-2V8zM7 6h2v2H7V6zm2 2h2v2H9V8zM5 8h2v2H5V8zm0 6H3v2h2v-2zm2 2H5v2h2v-2zm2 2H7v2h2v-2zm2 0v2h2v-2h-2zm4 2h-2v-2h2v2zm2-2h-2v2h2v-2zm2-2h-2v2h2v-2zm2-2h-2v2h2v-2z" fill="currentColor"/>
  </PixelIconBase>
);
